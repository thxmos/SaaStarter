"use server";

import { getUserById } from "@/data-access/user";
import { lucia, SessionUser } from "@/lib/lucia";
import {
  deleteSessionCookie,
  createSessionCookie,
  getSessionIdFromCookie,
} from "@/utils/cookies.utils";

export const isValidSession = async () => {
  const sessionId = getSessionIdFromCookie();

  if (!sessionId) return false;

  const { user, session } = await lucia.validateSession(sessionId);

  if (!session) return false;

  return true;
};

export const getUser = async () => {
  const sessionId = getSessionIdFromCookie();
  if (!sessionId) return { user: null, session: null };

  const { user, session } = await lucia.validateSession(sessionId);

  if (!session) return { user: null, session: null };

  try {
    if (session && session.fresh) {
      createSessionCookie(sessionId);
    }
    if (!session) {
      deleteSessionCookie();
    }

    const dbUser = await getUserById(user.id);

    return { user: dbUser as SessionUser, session: session };
  } catch (error) {
    console.error(error);
    return { user: null, session: null };
  }
};
