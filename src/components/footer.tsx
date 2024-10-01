import { APP_NAME } from "@/constants";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t justify-center">
      <p className="text-xs text-muted-foreground">
        © 2023 {APP_NAME} Inc. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
