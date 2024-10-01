"use server";

import { prisma } from "@/lib/prisma";
import { cache } from "react";
import { authCheck } from "./auth-check";

export type UserCreateDto = {
  id: string;
  name?: string;
  email: string;
  password: string;
  avatar?: string;
};

export type UserFindDto = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  theme: string;
};

// do we even need an update dto or just allow user to pass in whatever values
// export type UserUpdateDto = {
//   id: string;
//   name?: string;
//   avatar?: string;
//   theme?: string;
// };

export const createUser = async (data: any) => {
  try {
    authCheck();
    const createdUser = await prisma.user.create({
      data,
    });
    return createdUser;
  } catch (error) {
    console.error("Failed to create user", error);
    return { error: "Failed to create user" };
  }
};

export const findUsers = cache(async () => {
  try {
    authCheck();
    const foundUsers = await prisma.user.findMany();
    return foundUsers as UserFindDto[];
  } catch (error) {
    console.error(`Failed to find users`, error);
    return { error: "Failed to fetch users" };
  }
});

export const findUserById = cache(async (userId: string) => {
  try {
    authCheck();
    const foundUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!foundUser) return { error: "User not found" };
    return foundUser;
  } catch (error) {
    console.error(`Failed to find user with id ${userId}`, error);
    return { error: "Failed to fetch user" };
  }
});

export const updateUser = async (userId: string, data: any) => {
  try {
    authCheck();
    await prisma.user.update({
      where: { id: userId },
      data,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to update user", error);
    return { error: "Failed to update user" };
  }
};

export const deleteUser = async (userId: string) => {
  try {
    authCheck();
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });
    if (!deletedUser) return { error: "User not found" };
    return deletedUser;
  } catch (error) {
    console.error("Failed to delete user", error);
    return { error: "Failed to delete user" };
  }
};
