"use server";

import { APP_NAME } from "@/constants";
import { resend } from "@/lib/resend";
import WelcomeEmail from "@/emails/welcome";
import PasswordResetEmail from "@/emails/password-reset";
import { getUserByEmail } from "@/data-access/user";
import { createPasswordResetToken } from "@/data-access/password-reset-token";
import { createVerificationToken } from "@/data-access/verification-token";

export const sendResetEmail = async (email: string) => {
  const user = await getUserByEmail(email);
  if (!user) return { error: "User not found", status: 404 };

  const { token } = await createPasswordResetToken(user.id);

  const res = await sendPasswordResetEmail(user.email, token, user.name ?? "");

  if (res.status !== 200) return { error: "Couldn't send email", status: 500 };

  return { success: true };
};

const sendPasswordResetEmail = async (
  email: string,
  token: string,
  name: string,
) => {
  const verificationUrl = `${process.env.NEXT_PUBLIC_URL}/reset-password?token=${token}`;

  const fromEmail =
    process.env.NODE_ENV === "production"
      ? `${APP_NAME} <no-reply@${process.env.NEXT_PUBLIC_URL}>`
      : "onboarding@resend.dev";

  const res = await resend.emails.send({
    to: email,
    from: fromEmail,
    subject: `Password Reset - ${APP_NAME}`,
    react: PasswordResetEmail({ url: verificationUrl, name: name }),
  });

  if (res.error) return { ...res.error };
  return { message: "Verification email sent.", status: 200 };
};

export const sendVerifyEmail = async (email: string) => {
  const user = await getUserByEmail(email);
  if (!user) return { error: "User not found", status: 404 };
  const { token } = await createVerificationToken(user.id);

  //todo: refactor email sending to a shared function
  const res = await sendVerificationEmail(user.email, token, user.name ?? "");

  return res;
};

const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string,
) => {
  const verificationUrl = `${process.env.NEXT_PUBLIC_URL}/verify-email?token=${token}`;

  const fromEmail =
    process.env.NODE_ENV === "production"
      ? `${APP_NAME} <no-reply@${process.env.NEXT_PUBLIC_URL}>`
      : "onboarding@resend.dev";

  const res = await resend.emails.send({
    to: email,
    from: fromEmail,
    subject: `Verify your account - ${APP_NAME}`,
    react: WelcomeEmail({ url: verificationUrl, name }),
  });
};
