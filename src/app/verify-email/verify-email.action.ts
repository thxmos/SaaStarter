"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";

export async function verifyEmail(token: string) {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken || new Date() > verificationToken.expiresAt) {
      return { message: "Invalid or expired token", success: false };
    }

    // TODO: sign in user on verification
    // Ensure user is not already verified and sign them in
    // const user = await prisma.user.findUnique({
    //   where: { id: verificationToken.userId },
    // });

    // if (!user || user.isVerified) {
    //   return { error: "Already verified", success: false };
    // }

    // const session = await lucia.createSession(user.id, {});
    // const sessionCookie = lucia.createSessionCookie(session.id);
    // cookies().set(
    //   sessionCookie.name,
    //   sessionCookie.value,
    //   sessionCookie.attributes,
    // );

    // Update user as verified
    await prisma.user.update({
      where: { id: verificationToken.userId },
      data: { isVerified: true },
    });

    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    revalidatePath("/*");

    return { message: "Email successfully verified!", success: true };
  } catch (error) {
    console.error("Verification error:", error);
    return { message: "Failed to verify email", success: false };
  }
}
