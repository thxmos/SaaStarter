"use server";

import { getUserByIdWithPassword, updateUserById } from "@/data-access/user";
import { hash, verify } from "@/utils/crypto.utils";

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

    if (!user.password) {
      throw new Error(
        "Authenticated via 3rd party. Cannot change password at this time",
      );
    }

    const isCurrentPasswordValid = await verify(user.password, currentPassword);

    if (!isCurrentPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    const hashedPassword = await hash(newPassword);

    await updateUserById(userId, { password: hashedPassword });

    return { success: true, message: "Password updated successfully" };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
}

export async function setPasswordOAuth(formData: FormData, userId: string) {
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!newPassword || !confirmPassword) {
    throw new Error("All fields are required");
  }
  if (newPassword !== confirmPassword) {
    throw new Error("New password and confirmation do not match");
  }

  try {
    const hashedPassword = await hash(newPassword);

    await updateUserById(userId, { password: hashedPassword });

    return { success: true, message: "Password set successfully" };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
}
