"use server";

import { SignUpSchema } from "../app/auth/sign-up-form";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { SignInSchema } from "../app/auth/sign-in-form";
import { redirect } from "next/navigation";
import { generateCodeVerifier, generateState } from "arctic";
import { googleOAuthClient } from "@/lib/googleOauth";
import { sendVerifyEmail } from "@/actions/email.actions";
import { hash, verify } from "@/utils/crypto.utils";
import {
  createUser,
  getUserByEmail,
  getUserByEmailWithPassword,
  updateUserById,
} from "@/data-access/user";
import { createStripeCustomer } from "@/data-access/stripe.customers";
import {
  deletePasswordResetToken,
  getPasswordResetTokenByToken,
} from "@/data-access/password-reset-token";
import { deleteSession } from "@/data-access/session";

export const signUp = async (values: SignUpSchema) => {
  const { email, name, password } = values;
  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await hash(password);

    const user = await createUser({
      email,
      name,
      password: hashedPassword,
    });

    // Create Stripe customer and update user with Stripe customer ID
    const stripeCustomer = await createStripeCustomer(user.email);
    await updateUserById(user.id, { stripeCustomerId: stripeCustomer.id });

    await sendVerifyEmail(user.email);

    return {
      user: { ...user, stripeCustomerId: stripeCustomer.id },
      success: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, success: false };
    }
    return { error: "Something went wrong", success: false };
  }
};

export const signIn = async (values: SignInSchema) => {
  try {
    // If no user password, then the user is not verified
    const user = await getUserByEmailWithPassword(values.email);
    if (!user.password) throw new Error("Please verify your email to login.");

    // Check if the password is correct & the user is verified
    const passwordMatch = await verify(user.password, values.password);
    if (!passwordMatch) throw new Error("Invalid password");
    if (!user.isVerified) throw new Error("Please verify your email to login.");

    // Create session & set cookie
    // todo: abstract this
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, success: false };
    }
    return { error: "An unknown error occurred", success: false };
  }
};

export const logout = async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
  if (!sessionId) return redirect("/auth");
  try {
    await deleteSession(sessionId);
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
    const hashedPassword = await hash(password);
    const resetToken = await getPasswordResetTokenByToken(token);

    if (new Date() > resetToken.expiresAt) {
      return { message: "Token is invalid or has expired", success: false };
    }

    await updateUserById(resetToken.userId, { password: hashedPassword });
    await deletePasswordResetToken(resetToken.id);

    return { message: "Password successfully reset!", success: true };
  } catch (error) {
    console.error(error);
    return { message: "Something went wrong", success: false };
  }
}
