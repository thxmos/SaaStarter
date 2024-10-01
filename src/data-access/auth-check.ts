"use server";

import { getUser } from "@/lib/lucia";

export const authCheck = async () => {
  const { user } = await getUser();
  if (!user) throw Error("User not authenticated");
};
