import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

const SubscribedCard = () => {
  return (
    <main className="container mx-auto px-4 py-16">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          You already have an active subscription.
        </h1>
      </header>

      <section
        aria-label="Actions"
        className="flex flex-col items-center md:items-start md:justify-center gap-4 md:flex-row"
      >
        <Link href="/settings/billing">
          <Button>Go to Settings</Button>
        </Link>
      </section>
    </main>
  );
};

export default SubscribedCard;
