import { lucia } from "@/lib/lucia";

import { cookies } from "next/headers";

export const getSessionIdFromCookie = () => {
  return cookies().get(lucia.sessionCookieName)?.value || null;
};

export const createSessionCookie = (sessionId: string) => {
  const sessionCookie = lucia.createSessionCookie(sessionId);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};

export const deleteSessionCookie = () => {
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};
