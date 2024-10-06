import Link from "next/link";
import React from "react";
import { APP_NAME } from "@/constants";

const prefix = "/examples/freebies";

export const NAV_LINKS = [
  { href: prefix + "/", label: "Free Packs" },
  { href: prefix + "/books", label: "Free Books" },
  { href: prefix + "/blog", label: "Blog" },
];

export default function NavBar() {
  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-black">
          {APP_NAME}
        </Link>
        <nav>
          <ul className="flex space-x-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-black hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
