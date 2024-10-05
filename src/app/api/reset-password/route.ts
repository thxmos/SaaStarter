import {
  deletePasswordResetToken,
  getPasswordResetTokenByToken,
} from "@/data-access/password-reset-token";
import { updateUserById } from "@/data-access/user";
import { hash } from "@/utils/crypto.utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, password } = body;

    if (!token || typeof token !== "string") {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    // Get reset token via hashed password
    const hashedPassword = await hash(password);
    const resetToken = await getPasswordResetTokenByToken(token);

    if (!resetToken || new Date() > resetToken.expiresAt) {
      return NextResponse.json(
        { message: "Token is invalid or has expired" },
        { status: 400 },
      );
    }

    // Update the user's password & delete the token
    await updateUserById(resetToken.userId, { password: hashedPassword });
    await deletePasswordResetToken(resetToken.id);

    return NextResponse.json(
      { message: "Email successfully verified!" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
