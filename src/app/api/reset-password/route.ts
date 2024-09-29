import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Argon2id } from "oslo/password";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, password } = body;

    if (!token || typeof token !== "string") {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    const hashedPassword = await new Argon2id().hash(password);

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    console.log(resetToken);

    if (!resetToken || new Date() > resetToken.expiresAt) {
      return NextResponse.json(
        { message: "Token is invalid or has expired" },
        { status: 400 },
      );
    }

    // Update the user's password
    const res = await prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword },
    });

    console.log(res);

    // Delete the token once it's used
    await prisma.passwordResetToken.delete({
      where: { id: resetToken.id },
    });

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
