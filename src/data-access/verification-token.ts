"use server";

import { prisma } from "@/lib/prisma";
import { VerificationToken } from "@prisma/client";

type VerificationTokenDto = {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
};

function toDtoMapper(
  verificationToken: VerificationToken,
): VerificationTokenDto {
  return {
    id: verificationToken.id,
    token: verificationToken.token,
    userId: verificationToken.userId,
    expiresAt: verificationToken.expiresAt,
  };
}

export async function createVerificationToken(
  data: VerificationToken,
): Promise<VerificationTokenDto> {
  const createdToken = await prisma.verificationToken.create({ data });
  return toDtoMapper(createdToken);
}

export async function getVerificationTokenById( //prob dont need this
  id: string,
): Promise<VerificationTokenDto> {
  const foundToken = await prisma.verificationToken.findUnique({
    where: { id },
  });
  if (!foundToken) throw new Error("Verification token not found");
  return toDtoMapper(foundToken);
}

export async function getVerificationTokenByToken(
  token: string,
): Promise<VerificationTokenDto> {
  const foundToken = await prisma.verificationToken.findUnique({
    where: { token },
  });
  if (!foundToken) throw new Error("Verification token not found");
  return toDtoMapper(foundToken);
}

export async function deleteVerificationToken(id: string): Promise<void> {
  await prisma.verificationToken.delete({ where: { id } });
}

export async function deleteExpiredVerificationTokens(): Promise<void> {
  const now = new Date();
  await prisma.verificationToken.deleteMany({
    where: {
      expiresAt: {
        lt: now,
      },
    },
  });
}
