"use server";

import { SignUpSchema } from "./sign-up-form";
import { prisma } from "@/lib/prisma";
import { Argon2id } from "oslo/password";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { ForgotPasswordSchema, SignInSchema } from "./sign-in-form";
import { redirect } from "next/navigation";
import { generateCodeVerifier, generateState } from "arctic";
import { googleOAuthClient } from "@/lib/googleOauth";
import { createVerificationToken } from "@/utils/createVerificationToken";
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";
import { sendPasswordResetEmail } from "@/app/auth/sendPasswordResetEmail";
import { createPasswordResetToken } from "@/app/auth/createPasswordResetToken";

export const sendResetEmail = async (values: ForgotPasswordSchema) => {
  try {
    const { email } = values;
    if (!email) {
      return { error: "Email is required", status: 400 };
    }

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
  if (!email) {
    return { error: "Email is required", status: 400 };
  }

  const user = await prisma.user.findUnique({ where: { email } });

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
        email: values.email,
      },
    });
    if (existingUser) return { error: "User already exists", success: false };

    const hashedPassword = await new Argon2id().hash(values.password);

    const user = await prisma.user.create({
      data: {
        email: values.email.toLowerCase(),
        name: values.name,
        password: hashedPassword,
      },
    });

    const res = await sendVerifyEmail(user.email);

    if (res.status !== 200) {
      return { error: "Couldn't send email", success: false };
    }

    return { user, success: true };
  } catch (error) {
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
