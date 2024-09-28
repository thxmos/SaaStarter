"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TimedRedirect() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      router.push("/dashboard");
    }
  }, [countdown, router]);

  return (
    <p className="mt-4 text-sm text-gray-600">
      Redirecting to dashboard in {countdown} seconds...
    </p>
  );
}
