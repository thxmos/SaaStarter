"use server";
import { prisma } from "@/lib/prisma";
import { PasswordResetToken } from "@prisma/client";
import { generateTokenWithExpiration } from "@/utils/crypto.utils";

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
  userId: string,
): Promise<PasswordResetTokenDto> {
  const { token, expiresAt } = generateTokenWithExpiration(0.5); // 30 minutes

  const createdToken = await prisma.passwordResetToken.create({
    data: { token, userId, expiresAt },
  });
  return toDtoMapper(createdToken);
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

export async function getPasswordResetTokenByUserId(
  userId: string,
): Promise<PasswordResetTokenDto | null> {
  const foundToken = await prisma.passwordResetToken.findFirst({
    where: { userId },
  });
  if (!foundToken) return null;
  return toDtoMapper(foundToken);
}

export async function refreshPasswordResetToken(id: string): Promise<void> {
  await prisma.passwordResetToken.update({
    where: { id },
    data: { expiresAt: generateTokenWithExpiration(0.5).expiresAt }, // 30 minutes
  });
}

export async function deletePasswordResetToken(id: string): Promise<void> {
  await prisma.passwordResetToken.delete({ where: { id } });
}

//todo: run this in a cron job
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
