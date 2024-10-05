"use server";

import { prisma } from "@/lib/prisma";
import { cache } from "react";
import { Prisma, User } from "@prisma/client";

export const createUser = async (
  options: Prisma.UserCreateArgs,
): Promise<{ success?: boolean; user?: User; error?: string }> => {
  try {
    const createdUser = await prisma.user.create({
      ...options,
    });
    return { success: true, user: createdUser };
  } catch (error) {
    console.error("Failed to create user", error);
    return { error: "Failed to create user" };
  }
};

export const findUsers = cache(
  async (
    options?: Prisma.UserFindManyArgs,
  ): Promise<{ success?: boolean; users?: User[]; error?: string }> => {
    try {
      const foundUsers = await prisma.user.findMany({ ...options });
      return { success: true, users: foundUsers };
    } catch (error) {
      console.error(`Failed to find users`, error);
      return { error: "Failed to fetch users" };
    }
  },
);

export const findUniqueUser = cache(
  async (
    options: Prisma.UserFindUniqueArgs,
  ): Promise<{ success?: boolean; user?: User; error?: string }> => {
    try {
      const foundUser = await prisma.user.findUnique({
        ...options,
      });
      if (!foundUser) return { error: "User not found" };
      return {
        success: true,
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
): Promise<{ success?: boolean; user?: User; error?: string }> => {
  try {
    const updatedUser = await prisma.user.update({
      ...options,
    });
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Failed to update user", error);
    return { error: "Failed to update user" };
  }
};

export const deleteUser = async (
  options: Prisma.UserDeleteArgs,
): Promise<{ success?: boolean; user?: User; error?: string }> => {
  try {
    const deletedUser = await prisma.user.delete({ ...options });
    return { success: true, user: deletedUser };
  } catch (error) {
    console.error("Failed to delete user", error);
    return { error: "Failed to delete user" };
  }
};
