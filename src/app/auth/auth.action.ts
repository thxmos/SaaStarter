"use server";

import { SignUpSchema } from "./sign-up-form";
import { prisma } from "@/lib/prisma";
import { Argon2id } from "oslo/password";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { SignInSchema } from "./sign-in-form";
import { redirect } from "next/navigation";
import { generateCodeVerifier, generateState } from "arctic";
import { googleOAuthClient } from "@/lib/googleOauth";
import { createVerificationToken } from "@/utils/createVerificationToken";
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";
import { createPasswordResetToken, sendPasswordResetEmail } from "./utils";
import { createStripeCustomer } from "@/data-access/stripe.customers";
import { createUser, getUserByEmail, updateUserById } from "@/data-access/user";

export const sendResetEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { error: "User not found", status: 404 };
    }

    const token = await createPasswordResetToken(user.id);

    if (!token) {
      return { error: "Couldn't create token", status: 500 };
    }

    const res = await sendPasswordResetEmail(
      user.email,
      token,
      user.name ?? "",
    );

    if (res.status !== 200)
      return { error: "Couldn't send email", status: 500 };

    return { success: true };
  } catch (error) {
    return { error: "Something went wrong", status: 500 };
  }
};

export const sendVerifyEmail = async (email: string) => {
  const user = await getUserByEmail(email);

  if (!user) {
    return { error: "User not found", status: 404 };
  }

  const token = await createVerificationToken(user.id);
  const res = await sendVerificationEmail(user.email, token, user.name ?? "");
  if (res.status !== 200) return { error: "Couldn't send email", status: 500 };

  return res;
};

export const signUp = async (values: SignUpSchema) => {
  const { email, name, password } = values;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) return { error: "User already exists", success: false };

    const hashedPassword = await new Argon2id().hash(password);

    // Create user in the database
    const user = await createUser({
      email: email.toLowerCase(),
      name,
      password: hashedPassword,
    });

    const stripeCustomer = await createStripeCustomer(
      user.email,
      user.name ?? "",
    );

    if (stripeCustomer.id !== undefined) {
      await updateUserById(user.id, { stripeCustomerId: stripeCustomer.id });
    } else {
      console.error("Failed to create Stripe customer for user", user);
    }

    // Send verification email
    const res = await sendVerifyEmail(user.email);

    if (res.status !== 200) {
      return { error: "Couldn't send email", success: false };
    }

    return {
      user: { ...user, stripeCustomerId: stripeCustomer.id },
      success: true,
    };
  } catch (error) {
    console.error("SignUp error:", error);
    return { error: "Something went wrong", success: false };
  }
};

export const signIn = async (values: SignInSchema) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: values.email.toLowerCase(),
      },
    });

    if (!user || !user.password)
      return { error: "Invalid Credentials", success: false };

    const passwordMatch = await new Argon2id().verify(
      user.password,
      values.password,
    );
    if (!passwordMatch) return { error: "Invalid Credentials", success: false };

    if (!user.isVerified) {
      return { error: "Please verify your email to login.", success: false };
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return { success: true };
  } catch (error) {
    return { error: "Something went wrong", success: false };
  }
};

export const logout = async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
  if (!sessionId) return redirect("/auth");
  try {
    await prisma.session.delete({
      where: {
        id: sessionId,
      },
    });
  } catch (error) {
    console.error("error logging out: ", error);
  }

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/auth");
};

export const getGoogleOauthConsentUrl = async () => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    cookies().set("google_oAuth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    cookies().set("google_oAuth_code_verifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    const authUrl = await googleOAuthClient.createAuthorizationURL(
      state,
      codeVerifier,
      {
        scopes: ["email", "profile"],
      },
    );

    return { success: true, url: authUrl.toString() };
  } catch (error) {
    return { error: "Something went wrong", success: false };
  }
};

export async function resetPassword(token: string, password: string) {
  try {
    if (!token || typeof token !== "string") {
      return { message: "Invalid token", success: false };
    }

    if (!password || typeof password !== "string") {
      return { message: "Invalid password", success: false };
    }

    const hashedPassword = await new Argon2id().hash(password);

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken || new Date() > resetToken.expiresAt) {
      return { message: "Token is invalid or has expired", success: false };
    }

    await prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword },
    });

    await prisma.passwordResetToken.delete({
      where: { id: resetToken.id },
    });

    // revalidatePath("/dashboard");

    return { message: "Password successfully reset!", success: true };
  } catch (error) {
    console.error(error);
    return { message: "Something went wrong", success: false };
  }
}
