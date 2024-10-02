"use server";

import { prisma } from "@/lib/prisma";
import * as argon2 from "argon2";
import { revalidatePath } from "next/cache";

export async function passwordReset(formData: FormData, userId: string) {
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!currentPassword || !newPassword || !confirmPassword) {
    throw new Error("All fields are required");
  }
  if (newPassword !== confirmPassword) {
    throw new Error("New password and confirmation do not match");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isCurrentPasswordValid = await argon2.verify(
      user.password!,
      currentPassword,
    );
    if (!isCurrentPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    const hashedPassword = await argon2.hash(newPassword);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { success: true, message: "Password updated successfully" };
  } catch (error) {
    console.error("Password reset error:", error);
    return {
      success: false,
      message: "An error occurred during password reset",
    };
  }
}
