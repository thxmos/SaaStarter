"use server";

import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export const createPasswordResetToken = async (userId: string) => {
  try {
    const token = crypto.randomBytes(32).toString("hex");

    // Set token expiration to 24 hours from now
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    console.log({ token, userId, expiresAt });

    const res = await prisma.passwordResetToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });

    console.log("Token created", res, token);

    return token;
  } catch (error) {
    console.error("Couldn't create token", error);
    return null;
  }
};
