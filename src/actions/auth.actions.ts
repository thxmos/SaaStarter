"use server";

import { SignUpSchema } from "../app/auth/sign-up-form";
import { prisma } from "@/lib/prisma";
import { Argon2id } from "oslo/password";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { SignInSchema } from "../app/auth/sign-in-form";
import { redirect } from "next/navigation";
import { generateCodeVerifier, generateState } from "arctic";
import { googleOAuthClient } from "@/lib/googleOauth";
import { Stripe } from "stripe";
import { sendVerifyEmail } from "@/actions/email.actions";

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
    const user = await prisma.user.create({
      data: {
        email: values.email.toLowerCase(),
        name: values.name,
        password: hashedPassword,
      },
    });

    // Create Stripe customer and update user with Stripe customer ID
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    if (!user.name || !user.email) {
      console.error("Couldn't create Stripe customer: missing user data", user);
    }

    const stripeCustomer = await stripe.customers.create({
      email: email.toLowerCase(),
      name: name,
    });

    if (stripeCustomer.id !== undefined) {
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: stripeCustomer.id },
      });
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

    return { message: "Password successfully reset!", success: true };
  } catch (error) {
    console.error(error);
    return { message: "Something went wrong", success: false };
  }
}
