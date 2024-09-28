import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export const createVerificationToken = async (userId: string) => {
  const token = crypto.randomBytes(32).toString("hex");

  // Set token expiration to 24 hours from now
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await prisma.verificationToken.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  return token;
};
