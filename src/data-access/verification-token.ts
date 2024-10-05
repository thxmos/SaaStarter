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

export async function getVerificationTokens(): Promise<VerificationTokenDto[]> {
  const tokens = await prisma.verificationToken.findMany();
  return tokens.map(toDtoMapper);
}

export async function getVerificationTokenByIdentifier(
  identifier: string,
): Promise<VerificationTokenDto | null> {
  const foundToken = await prisma.verificationToken.findUnique({
    where: { id },
  });
  if (!foundToken) return null;
  return toDtoMapper(foundToken);
}

export async function getVerificationTokenByToken(
  token: string,
): Promise<VerificationTokenDto | null> {
  const foundToken = await prisma.verificationToken.findUnique({
    where: { token },
  });
  return foundToken ? toDtoMapper(foundToken) : null;
}

export async function updateVerificationToken(
  identifier: string,
  data: Partial<VerificationToken>,
): Promise<void> {
  await prisma.verificationToken.update({ where: { identifier }, data });
}

export async function deleteVerificationToken(
  identifier: string,
): Promise<void> {
  await prisma.verificationToken.delete({ where: { identifier } });
}

export async function deleteExpiredVerificationTokens(): Promise<void> {
  const now = new Date();
  await prisma.verificationToken.deleteMany({
    where: {
      expires: {
        lt: now,
      },
    },
  });
}
