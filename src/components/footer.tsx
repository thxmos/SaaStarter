import { APP_NAME } from "@/constants";

const Footer = () => {
  return (
    <footer
      className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 justify-center"
      role="contentinfo"
      aria-label="Site footer"
    >
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} {APP_NAME} Inc. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
