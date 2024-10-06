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

    const hashedPassword = await hash(password);

    const resetToken = await getPasswordResetTokenByToken(token);

    if (new Date() > resetToken.expiresAt) {
      return NextResponse.json(
        { message: "Token is invalid or has expired" },
        { status: 400 },
      );
    }

    // Update the user's password
    await updateUserById(resetToken.userId, {
      password: hashedPassword,
    });

    // Delete the token once it's used
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
