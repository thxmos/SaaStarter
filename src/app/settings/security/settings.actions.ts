"use server";

import { getUserByIdWithPassword, updateUserById } from "@/data-access/user";
import * as argon2 from "argon2";

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
    const user = await getUserByIdWithPassword(userId);

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

    await updateUserById(userId, { password: hashedPassword });

    return { success: true, message: "Password updated successfully" };
  } catch (error) {
    console.error("Password reset error:", error);
    return {
      success: false,
      message: "An error occurred during password reset",
    };
  }
}
