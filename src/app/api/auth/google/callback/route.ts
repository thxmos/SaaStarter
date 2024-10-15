import { createStripeCustomer } from "@/data-access/stripe.customers";
import { getUserByEmail, updateUserById } from "@/data-access/user";
import { googleOAuthClient } from "@/lib/googleOauth";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { createSessionCookie } from "@/utils/cookies.utils";
import { OAuthProvider } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
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

    const existingUser = await getUserByEmail(googleData.email);

    if (existingUser) {
      userId = existingUser.id;
    }

    if (!existingUser) {
      const user = await prisma.user.create({
        data: {
          email: googleData.email.toLowerCase(),
          name: googleData.name,
          avatar: googleData.picture,
          isVerified: true,
          oAuthProvider: OAuthProvider.GOOGLE,
        },
      });
      userId = user.id;

      const stripeCustomer = await createStripeCustomer(
        googleData.email.toLocaleLowerCase(),
        googleData.name,
      );

      if (stripeCustomer.id !== undefined) {
        await updateUserById(user.id, { stripeCustomerId: stripeCustomer.id });
      } else {
        console.error("Failed to create Stripe customer for user", user);
      }
    }

    const session = await lucia.createSession(userId, {});
    createSessionCookie(session.id);
  } catch (error: any) {
    console.error("api/auth/google/callback: error", error.message);
    return new Response("Internal server error", { status: 500 });
  } finally {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
}
