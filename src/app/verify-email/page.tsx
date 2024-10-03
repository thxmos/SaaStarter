import { Suspense } from "react";
import { redirect } from "next/navigation";
import VerificationStatus from "./verification-status";
import { verifyEmail } from "./verify-email.action";
import { getUser } from "@/lib/lucia";
import { findUniqueUser } from "@/data-access/user";

export default async function VerifyEmail({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  let message =
    "We're sorry, but something went wrong during the email verification process. The verification link may have expired or is invalid.";

  const { user: luciaUser } = await getUser();
  const { user } = await findUniqueUser({
    where: { id: luciaUser?.id },
    select: { isVerified: true },
  });
  let isVerified = user?.isVerified ?? false;

  if (isVerified) {
    redirect("/dashboard");
  }

  const token = searchParams.token;

  if (!token) {
    redirect("/auth");
  }

  const res = await verifyEmail(token);

  if (res.success) {
    isVerified = true;
    message = res.message!;
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center"
      role="main"
      aria-label="Email Verification Page"
    >
      <Suspense
        fallback={
          <p aria-live="polite" aria-busy="true">
            Verifying email...
          </p>
        }
      >
        <VerificationStatus
          message={message}
          isVerified={isVerified}
          aria-live="polite"
          aria-atomic="true"
        />
      </Suspense>
    </main>
  );
}
