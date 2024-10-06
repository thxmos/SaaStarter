"use server";

import { SignUpSchema } from "../app/auth/_components/sign-up-form";
import { prisma } from "@/lib/prisma";
import { Argon2id } from "oslo/password";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { SignInSchema } from "../app/auth/_components/sign-in-form";
import { redirect } from "next/navigation";
import { generateCodeVerifier, generateState } from "arctic";
import { googleOAuthClient } from "@/lib/googleOauth";

import { createStripeCustomer } from "@/data-access/stripe.customers";
import { createUser, getUserByEmail, updateUserById } from "@/data-access/user";
import { sendVerifyEmail } from "./email.actions";
import { hash } from "@/utils/crypto.utils";
import { getPasswordResetTokenByToken } from "@/data-access/password-reset-token";
import { deleteSession } from "@/data-access/sessions";
import {
  createSessionCookie,
  deleteSessionCookie,
} from "@/utils/cookies.utils";

export const signUp = async (values: SignUpSchema) => {
  const { email, name, password } = values;
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) return { error: "User already exists", success: false };

    const hashedPassword = await hash(password);

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
    await sendVerifyEmail(user.email);

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
    createSessionCookie(session.id);
    return { success: true };
  } catch (error) {
    return { error: "Something went wrong", success: false };
  }
};

export const logout = async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
  if (!sessionId) redirect("/auth");

  await deleteSession(sessionId);
  deleteSessionCookie();

  redirect("/");
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

    const hashedPassword = await hash(password);

    const resetToken = await getPasswordResetTokenByToken(token);

    if (new Date() > resetToken.expiresAt) {
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
