"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function verifyEmail(token: string) {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken || new Date() > verificationToken.expiresAt) {
      return { message: "Invalid or expired token", success: false };
    }

    // Update user as verified
    await prisma.user.update({
      where: { id: verificationToken.userId },
      data: { isVerified: true },
    });

    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    revalidatePath("/dashboard/*");

    return { message: "Email successfully verified!", success: true };
  } catch (error) {
    console.error("Verification error:", error);
    return { message: "Failed to verify email", success: false };
  }
}
