"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { signInAfterVerify } from "../auth/auth.action";

export async function verifyEmail(token: string) {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken || new Date() > verificationToken.expiresAt) {
      return { message: "Invalid or expired token", success: false };
    }

    // Ensure user exists and is not already verified
    const user = await prisma.user.findUnique({
      where: { id: verificationToken.userId },
    });

    if (!user) {
      return { message: "User not found", success: false };
    }

    console.log("User found:", user);
    const verified = await signInAfterVerify(user.email);
    console.log(verified);

    // Update user as verified
    const res = await prisma.user.update({
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
