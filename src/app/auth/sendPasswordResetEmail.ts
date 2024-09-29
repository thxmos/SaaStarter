"use server";

import { APP_NAME } from "@/constants";
import PasswordResetEmail from "@/emails/password-reset";
import { resend } from "@/lib/resend";

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  name: string,
) => {
  const verificationUrl = `${process.env.NEXT_PUBLIC_URL}/reset-password?token=${token}`;

  const res = await resend.emails.send({
    // from: `${APP_NAME} <no-reply@${process.env.NEXT_PUBLIC_URL}>`,
    from: "onboarding@resend.dev",
    to: email,
    subject: `Password Reset - ${APP_NAME}`,
    react: PasswordResetEmail({ url: verificationUrl, name: name }),
  });
  if (res.error) return { ...res.error };
  return { message: "Verification email sent.", status: 200 };
};
