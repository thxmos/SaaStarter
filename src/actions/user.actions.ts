"use server";

import { prisma } from "@/lib/prisma";
import { del } from "@vercel/blob";
import { getUserById, updateUserById } from "@/data-access/user";
import { getUser } from "./session.actions";

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
