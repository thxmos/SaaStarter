import { googleOAuthClient } from "@/lib/googleOauth";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: Response) {
  const url = req.nextUrl;
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state) {
    console.error("api/auth/google/callback: no code or state");
    return new Response("Invalid request", { status: 400 });
  }

  const codeVerifier = req.cookies.get("google_oAuth_code_verifier")?.value;
  const savedState = req.cookies.get("google_oAuth_state")?.value;

  if (!codeVerifier || !savedState) {
    console.error("api/auth/google/callback: no code verifier or state");
    return new Response("Invalid request", { status: 400 });
  }

  if (state !== savedState) {
    console.error("api/auth/google/callback: state mismatch");
    return new Response("Invalid request", { status: 400 });
  }

  const { accessToken } = await googleOAuthClient.validateAuthorizationCode(
    code,
    codeVerifier,
  );
  const googleResponse = await fetch(
    "https://www.googleapis.com/oauth2/v1/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  const googleData = (await googleResponse.json()) as {
    id: string;
    email: string;
    name: string;
    picture: string;
  };

  let userId = "";

  const existingUser = await prisma.user.findUnique({
    where: {
      email: googleData.email,
    },
  });

  if (existingUser) {
    userId = existingUser.id;
  } else {
    const user = await prisma.user.create({
      data: {
        email: googleData.email.toLowerCase(),
        name: googleData.name,
        avatar: googleData.picture,
        isVerified: false,
      },
    });
    userId = user.id;
  }

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/dashboard");
}
