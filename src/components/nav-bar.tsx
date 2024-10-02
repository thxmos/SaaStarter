"use client";

import Link from "next/link";
import { Cpu } from "lucide-react";
import { APP_NAME } from "@/constants";
import LoginButton from "./login-button";
import DropdownMenu from "./dropdown-menu";
import { Suspense, useEffect, useState } from "react";
import { SessionUser } from "@/lib/lucia";
import { getUserAction } from "@/actions/lucia.actions";

const Navbar = () => {
  // const { user } = useSession();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { user, session } = await getUserAction();
      setUser(user);
      setLoading(false);
    };
    fetch();
  }, []);

  const navLinks = [
    {
      name: "Features",
      url: "/#features",
    },
    {
      name: "Pricing",
      url: "/#pricing",
    },
    {
      name: "Contact",
      url: "/#contact",
    },
  ];

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link className="flex items-center justify-center" href="/">
        <Cpu className="h-6 w-6 text-primary" />
        <span className="sr-only">{APP_NAME}</span>
      </Link>
      {!loading && (
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          {/* Unauthenticated Links*/}
          {!user &&
            navLinks.map((link) => (
              <Link
                key={link.url}
                className="text-sm font-medium hover:underline underline-offset-4"
                href={link.url}
              >
                {link.name}
              </Link>
            ))}
          <DropdownMenu user={user} />
          <LoginButton user={user} />
        </nav>
      )}
    </header>
  );
};

export default Navbar;
