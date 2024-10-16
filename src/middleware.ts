import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, "10 s"),
});

export const config = {
  matcher: "/",
};

export default async function middleware(request: NextRequest) {
  const ip = request.ip ?? "unknown";
  const { success, pending, limit, reset, remaining } =
    await ratelimit.limit(ip);
  return success
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/error", request.url));
}
