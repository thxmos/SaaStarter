"use server";

import { prisma } from "@/lib/prisma";
import { generateTokenWithExpiration } from "@/utils/crypto.utils";
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
  userId: string,
): Promise<VerificationTokenDto> {
  const { token, expiresAt } = generateTokenWithExpiration();

  const createdToken = await prisma.verificationToken.create({
    data: { token, userId, expiresAt },
  });
  return toDtoMapper(createdToken);
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

//todo: run this in a cron job
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
