"use server";

import { getUser, isValidSession } from "@/actions/session.actions";
import { uploadBlob } from "@/actions/blob.actions";
import { updateUserAvatar } from "@/actions/user.actions";
import { updateUserById } from "@/data-access/user";
import { User } from "@prisma/client";

export async function uploadAvatar(formData: FormData) {
  const isSessionValid = await isValidSession();
  if (!isSessionValid) {
    throw new Error("Your session has expired. Please log in again.");
  }

  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("Please select an image to upload.");
  }

  const blob = await uploadBlob(formData);

  if (blob) {
    await updateUserAvatar(blob.url);
    return { success: true, avatarUrl: blob.url };
  } else {
    throw new Error("Failed to upload avatar");
  }
}

export async function updateUser(userId: string, data: Partial<User>) {
  const isSessionValid = await isValidSession();
  if (!isSessionValid) {
    throw new Error("Your session has expired. Please log in again.");
  }

  await updateUserById(userId, data);
}
