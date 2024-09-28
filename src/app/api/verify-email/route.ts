import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token || typeof token !== "string") {
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });
  }

  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!verificationToken || new Date() > verificationToken.expiresAt) {
    return NextResponse.json(
      { message: "Token is invalid or has expired" },
      { status: 400 },
    );
  }

  // Update the user's email verification status
  const res = await prisma.user.update({
    where: { id: verificationToken.userId },
    data: { isVerified: true },
  });

  // Delete the token once it's used
  await prisma.verificationToken.delete({
    where: { id: verificationToken.id },
  });

  return NextResponse.json(
    { message: "Email successfully verified!" },
    { status: 200 },
  );
}
