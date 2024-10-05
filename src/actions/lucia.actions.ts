"use server";

import { getUser } from "@/lib/lucia";

export const getUserAction = async () => {
  return await getUser(); //todo: why?
};
