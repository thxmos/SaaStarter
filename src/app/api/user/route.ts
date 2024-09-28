import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, avatar, name, isSubscribed } = body;

    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 },
      );
    }

    const updateDto = { name, avatar, isSubscribed };

    const res = await prisma.user.update({
      where: { id: id },
      data: { ...updateDto },
    });

    if (!res) {
      console.error("Failed to update user");
      return NextResponse.json(
        { message: "Failed to update user" },
        { status: 400 },
      );
    }

    console.log("User successfully updated");
    return NextResponse.json(
      { message: "User successfully updated!" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
