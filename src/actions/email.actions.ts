import {
  createPasswordResetToken,
  sendPasswordResetEmail,
} from "@/app/auth/forgot-password.actions";
import { prisma } from "@/lib/prisma";
import { createVerificationToken } from "@/utils/createVerificationToken";
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";

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
