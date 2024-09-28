import { Suspense } from "react";
import { redirect } from "next/navigation";
import VerificationStatus from "./VerificationStatus";

async function verifyToken(token: string) {
  const urlPrefix = `${process.env.NEXT_PUBLIC_URL}`;
  const res = await fetch(`${urlPrefix}/api/verify-email?token=${token}`, {
    method: "POST",
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to verify email");

  return res.json();
}

export default async function VerifyEmail({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token;

  if (!token) {
    // display toast on redirect
    redirect("/auth");
  }

  let message, isVerified;

  try {
    const data = await verifyToken(token);
    message = data.message;
    isVerified = true;
  } catch (error) {
    message =
      "We're sorry, but something went wrong during the email verification process. The verification link may have expired or is invalid.";
    isVerified = false;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Suspense fallback={<p>Verifying...</p>}>
        <VerificationStatus message={message} isVerified={isVerified} />
      </Suspense>
    </div>
  );
}
