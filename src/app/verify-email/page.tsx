"use server";

import { Suspense } from "react";
import { redirect } from "next/navigation";
import VerificationStatus from "./verification-status";
import { verifyEmail } from "./verify-email.action";
import { getUser } from "@/lib/lucia";

export default async function VerifyEmail({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const { user } = await getUser();
  let isVerified = user?.isVerified ?? false;

  if (isVerified) {
    redirect("/dashboard");
  }

  const token = searchParams.token;

  if (!token) {
    redirect("/auth");
  }

  let message;

  const res = await verifyEmail(token);

  if (res.success) {
    isVerified = true;
    message = res.message;
  } else {
    message =
      "We're sorry, but something went wrong during the email verification process. The verification link may have expired or is invalid.";
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Suspense fallback={<p>Verifying...</p>}>
        <VerificationStatus message={message} isVerified={isVerified} />
      </Suspense>
    </div>
  );
}
