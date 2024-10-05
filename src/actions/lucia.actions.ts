"use server";

import { getUser, lucia } from "@/lib/lucia";
import { cookies } from "next/headers";

export const getUserAction = async () => {
  return await getUser(); //todo: why?
};

export const isValidSession = async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;

  if (!sessionId) return false;

  const { session } = await lucia.validateSession(sessionId);

  if (!session) return false;

  return true;
};
