"use server";

import { getUser, lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { del } from "@vercel/blob";

export const updateUserAvatar = async (url: string) => {
  const { user } = await getUser();
  if (!user) return;

  try {
    const blobUrl = await prisma.user.findUnique({
      where: { id: user.id },
      select: { avatar: true },
    });

    if (blobUrl?.avatar?.includes("public.blob.vercel-storage.com")) {
      await del(blobUrl.avatar);
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { avatar: url },
    });
    return {
      success: true,
    };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
    };
  }
};

export const isValidSession = async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;

  if (!sessionId) return false;

  const { user, session } = await lucia.validateSession(sessionId);

  if (!session) return false;

  return true;
};
