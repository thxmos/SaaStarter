import Link from "next/link";
import { Cpu } from "lucide-react";
import { APP_NAME } from "@/constants";
import DropdownMenu from "./dropdown-menu";
import { getUser } from "@/lib/lucia";

const Navbar = async () => {
  const { user } = await getUser();

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
    <header
      className="px-4 lg:px-6 h-16 flex items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <Link
        className="flex items-center justify-center"
        href="/"
        aria-label={"Home Page"}
      >
        <Cpu className="h-6 w-6 text-primary" aria-hidden="true" />
        <span className="sr-only">{APP_NAME}</span>
      </Link>
      {
        <nav
          className="ml-auto flex gap-4 sm:gap-6 items-center"
          aria-label="Main navigation"
        >
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

          {/* Login Button / User Menu */}
          {user ? (
            <DropdownMenu user={user} />
          ) : (
            <Link
              href="/auth"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Log In
            </Link>
          )}
        </nav>
      }
    </header>
  );
};

export default Navbar;
