"use client";

import Link from "next/link";
import { Cpu } from "lucide-react";
import { useSession } from "@/providers/session-provider";
import { COMPANY_NAME } from "@/constants";
import LoginButton from "./login-button";
import DropdownMenu from "./dropdown-menu";

const Navbar = async () => {
  const { user } = useSession();

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
        <span className="sr-only">{COMPANY_NAME}</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        {navLinks.map((link) => (
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href={link.url}
          >
            {link.name}
          </Link>
        ))}
        <DropdownMenu user={user} />
        <LoginButton user={user} />
      </nav>
    </header>
  );
};

export default Navbar;
