"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import * as argon2 from "argon2";

export async function getUser(id: string) {
  if (!id) {
    throw new Error("Invalid user ID");
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user");
  }
}

export async function updateUser(formData: FormData) {
  try {
    const id = formData.get("id");
    const avatar = formData.get("avatar");
    const name = formData.get("name");
    const is2faEnabled = formData.get("2faEnabled") === "true";
    const isSubscribed = formData.get("isSubscribed") === "true";

    if (!id || typeof id !== "string") {
      throw new Error("User ID is required");
    }

    const updateDto = {
      name: typeof name === "string" ? name : undefined,
      avatar: typeof avatar === "string" ? avatar : undefined,
      // is2faEnabled:
      //   typeof is2faEnabled === "boolean" ? is2faEnabled : undefined,
      isSubscribed:
        typeof isSubscribed === "boolean" ? isSubscribed : undefined,
    };

    const res = await prisma.user.update({
      where: { id: id },
      data: updateDto,
    });

    if (!res) {
      console.error("Failed to update user");
      throw new Error("Failed to update user");
    }

    console.log("User successfully updated");
    // revalidatePath("/dashboard"); // Adjust this path as needed
    return { message: "User successfully updated!", success: true };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

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
      user.password,
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

    revalidatePath(`/dashboard/*`);

    return { success: true, message: "Password updated successfully" };
  } catch (error) {
    console.error("Password reset error:", error);
    return {
      success: false,
      message: "An error occurred during password reset",
    };
  }
}
