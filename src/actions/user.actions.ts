"use server";

import { getUserById, updateUserById } from "@/data-access/user";
import { getUser, lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { del } from "@vercel/blob";
import { cookies } from "next/headers";

export const updateUserAvatar = async (url: string) => {
  const { user } = await getUser();
  if (!user) return;

  try {
    const blobUrl = await getUserById(user.id);

    if (blobUrl?.avatar?.includes("public.blob.vercel-storage.com")) {
      await del(blobUrl.avatar);
    }

    await updateUserById(user.id, { avatar: url });

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

export const getUserSubscriptions = async () => {
  const { user } = await getUser();
  if (!user) return null;

  const data = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      subscriptions: true,
    },
  });

  if (!data || data.subscriptions.length === 0) return null;

  return data.subscriptions;
};
