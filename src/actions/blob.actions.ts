"use server";

import { put } from "@vercel/blob";
import { getUser } from "./session.actions";

export const uploadBlob = async (data: FormData) => {
  const { user } = await getUser();
  const file: File | null = data.get("file") as File;
  const path: string = data.get("path") as string;

  if (!file || !path) {
    return null;
  }

  if (file.size / 1024 / 1024 > 50) {
    return null;
  }

  try {
    const blob = await put(`${path}user_${user?.id}`, file, {
      contentType: file.type,
      access: "public",
    });

    return blob;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};
