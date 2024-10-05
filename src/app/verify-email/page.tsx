import { Suspense } from "react";
import { redirect } from "next/navigation";
import VerificationStatus from "./verification-status";
import { verifyEmail } from "./verify-email.action";
import { getUser } from "@/lib/lucia";
import { getUserById } from "@/data-access/user";

export default async function VerifyEmail({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  // If token is not provided, redirect to auth page
  const token = searchParams.token;
  if (!token) {
    redirect("/auth");
  }

  // Check user isnt verified already
  const { user: luciaUser } = await getUser();
  if (luciaUser) {
    // If user is already verified, redirect to dashboard
    const user = await getUserById(luciaUser.id);
    let isVerified = user?.isVerified ?? false;
    if (isVerified) {
      redirect("/dashboard");
    }
  }

  let message =
    "We're sorry, but something went wrong during the email verification process. The verification link may have expired or is invalid.";

  const res = await verifyEmail(token);

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
          isVerified={res.success}
          aria-live="polite"
          aria-atomic="true"
        />
      </Suspense>
    </main>
  );
}
