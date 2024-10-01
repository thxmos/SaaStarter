"use server";

import { prisma } from "@/lib/prisma";
import { cache } from "react";
import { authCheck } from "./auth-check";
import { Prisma, User } from "@prisma/client";

export const createUser = async (
  options: Prisma.UserCreateArgs,
): Promise<{ success: boolean; error?: string }> => {
  try {
    authCheck();
    const createdUser = await prisma.user.create({
      ...options,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to create user", error);
    return { success: true, error: "Failed to create user" };
  }
};

export const findUsers = cache(
  async (
    options: Prisma.UserFindManyArgs,
  ): Promise<{ users?: User[]; error?: string }> => {
    try {
      authCheck();
      const foundUsers = await prisma.user.findMany({ ...options });
      return { users: foundUsers };
    } catch (error) {
      console.error(`Failed to find users`, error);
      return { error: "Failed to fetch users" };
    }
  },
);

export const findUniqueUser = cache(
  async (
    options: Prisma.UserFindUniqueArgs,
  ): Promise<{ user?: User; error?: string }> => {
    try {
      authCheck();
      const foundUser = await prisma.user.findUnique({
        ...options,
      });
      if (!foundUser) return { error: "User not found" };
      return {
        user: foundUser,
      };
    } catch (error) {
      console.error("Failed to find user with options", options, error);
      return { error: "Failed to fetch user" };
    }
  },
);

export const updateUser = async (
  options: Prisma.UserUpdateArgs,
): Promise<{ success: boolean; error?: string }> => {
  try {
    authCheck();
    await prisma.user.update({
      ...options,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to update user", error);
    return { success: false, error: "Failed to update user" };
  }
};

export const deleteUser = async (options: Prisma.UserDeleteArgs) => {
  try {
    authCheck();
    const deletedUser = await prisma.user.delete({ ...options });
    if (!deletedUser) return { error: "User not found" };
    return deletedUser;
  } catch (error) {
    console.error("Failed to delete user", error);
    return { error: "Failed to delete user" };
  }
};
