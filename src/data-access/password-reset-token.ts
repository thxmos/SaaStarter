"use server";

import { prisma } from "@/lib/prisma";
import { PasswordResetToken } from "@prisma/client";

type PasswordResetTokenDto = {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
};

function toDtoMapper(
  passwordResetToken: PasswordResetToken,
): PasswordResetTokenDto {
  return {
    id: passwordResetToken.id,
    token: passwordResetToken.token,
    userId: passwordResetToken.userId,
    expiresAt: passwordResetToken.expiresAt,
  };
}

export async function createPasswordResetToken(
  data: PasswordResetToken,
): Promise<PasswordResetTokenDto> {
  const createdToken = await prisma.passwordResetToken.create({ data });
  return toDtoMapper(createdToken);
}

export async function getPasswordResetTokenById(
  id: string,
): Promise<PasswordResetTokenDto> {
  const foundToken = await prisma.passwordResetToken.findUnique({
    where: { id },
  });
  if (!foundToken) throw new Error("Password reset token not found");
  return toDtoMapper(foundToken);
}

export async function getPasswordResetTokenByToken(
  token: string,
): Promise<PasswordResetTokenDto> {
  const foundToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  });
  if (!foundToken) throw new Error("Password reset token not found");
  return toDtoMapper(foundToken);
}

export async function deletePasswordResetToken(id: string): Promise<void> {
  await prisma.passwordResetToken.delete({ where: { id } });
}

export async function deleteExpiredPasswordResetTokens(): Promise<void> {
  const now = new Date();
  await prisma.passwordResetToken.deleteMany({
    where: {
      expiresAt: {
        lt: now,
      },
    },
  });
}
