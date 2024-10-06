import { updateUserById } from "@/data-access/user";
import {
  deleteVerificationToken,
  getVerificationTokenByToken,
} from "@/data-access/verification-token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token || typeof token !== "string") {
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });
  }

  const verificationToken = await getVerificationTokenByToken(token);

  if (new Date() > verificationToken.expiresAt) {
    return NextResponse.json(
      { message: "Token is invalid or has expired" },
      { status: 400 },
    );
  }

  // Update the user's email verification status
  const res = await updateUserById(verificationToken.userId, {
    isVerified: true,
  });

  // Delete the token once it's used
  await deleteVerificationToken(verificationToken.id);

  return NextResponse.json(
    { message: "Email successfully verified!" },
    { status: 200 },
  );
}
