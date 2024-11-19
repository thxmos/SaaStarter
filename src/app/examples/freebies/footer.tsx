import { APP_NAME } from "@/constants";
import Link from "next/link";
import { prefix } from "./contants";

const FOOTER_LINKS = [
  {
    title: "About",
    links: [
      { href: prefix + "/about", label: "About Us" },
      { href: prefix + "/contact", label: "Contact" },
      { href: prefix + "/terms", label: "Terms of Use" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: prefix + "/", label: "Free Sample Packs" },
      { href: prefix + "/books", label: "Free Books" },
      { href: prefix + "/blog", label: "Blog" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {FOOTER_LINKS.map((section) => (
            <div>
              <h3 className="font-semibold mb-4 text-black">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold mb-4 text-black">{APP_NAME}</h3>
            <p className="text-gray-600">
              Providing high-quality, royalty-free sound samples and resources
              for music producers worldwide.
            </p>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500">
          © 2024 {APP_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
