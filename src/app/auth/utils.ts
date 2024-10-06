"use server";

import { APP_NAME } from "@/constants";
import PasswordResetEmail from "@/emails/password-reset";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { generateTokenWithExpiration } from "@/utils/crypto.utils";

export const sendPasswordResetEmail = async (
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
    from: fromEmail,
    to: email,
    subject: `Password Reset - ${APP_NAME}`,
    react: PasswordResetEmail({ url: verificationUrl, name: name }),
  });
  if (res.error) return { ...res.error };
  return { message: "Verification email sent.", status: 200 };
};

export const createPasswordResetToken = async (userId: string) => {
  try {
    const { token, expiresAt } = generateTokenWithExpiration(24);

    const res = await prisma.passwordResetToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });

    return token;
  } catch (error) {
    console.error("Couldn't create token", error);
    return null;
  }
};
