import { APP_NAME } from "@/constants";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t justify-center">
      <p className="text-xs text-muted-foreground">
        © 2023 {APP_NAME} Inc. All rights reserved.
      </p>
      {/* <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-xs hover:underline underline-offset-4"
          href="/error"
        >
          Terms of Service
        </Link>
        <Link
          className="text-xs hover:underline underline-offset-4"
          href="/error"
        >
          Privacy
        </Link>
      </nav> */}
    </footer>
  );
};

export default Footer;
