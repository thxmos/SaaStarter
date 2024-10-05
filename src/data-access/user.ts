"use server";

import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

type UserDto = {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  theme: string | null;
  isVerified: boolean;
  stripeCustomerId: string | null;
};

function toDtoMapper(user: User): UserDto {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    theme: user.theme,
    isVerified: user.isVerified,
    stripeCustomerId: user.stripeCustomerId,
  };
}

export async function createUser(data: User): Promise<UserDto> {
  const createdUser = await prisma.user.create({ data });
  return toDtoMapper(createdUser);
}

export async function getUsers(): Promise<UserDto[]> {
  //use cache or no?
  const users = await prisma.user.findMany();
  return users.map(toDtoMapper);
}

export async function getUserById(id: string): Promise<UserDto> {
  const foundUser = await prisma.user.findUnique({
    where: { id },
  });
  if (!foundUser) {
    throw new Error("User not found with id: " + id);
  }
  return toDtoMapper(foundUser);
}

export async function getUserByEmail(email: string): Promise<UserDto> {
  const foundUser = await prisma.user.findUnique({
    where: { email },
  });
  if (!foundUser) {
    throw new Error("User not found with email: " + email);
  }
  return toDtoMapper(foundUser);
}

export async function updateUserById(
  id: string,
  data: Partial<User>,
): Promise<void> {
  await prisma.user.update({ where: { id }, data });
}

export async function updateUserByEmail(
  email: string,
  data: Partial<User>,
): Promise<void> {
  await prisma.user.update({ where: { email }, data });
}

export async function deleteUser(id: string): Promise<void> {
  await prisma.user.delete({ where: { id } });
}
