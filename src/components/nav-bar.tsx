"use client";
import { RiMenuFill } from "@remixicon/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import SignOutButton from "./sign-out-button";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { User } from "@prisma/client";

interface Props {
  user: User | null;
}

const Navbar: React.FC<Props> = ({ user }) => {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getInitials = (name: string): string => {
    const words = name.split(" ");
    const initials = words.map((word) => word.charAt(0).toUpperCase()).join("");
    return initials;
  };

  return (
    <nav className="flex items-center justify-between w-screentext-lg absolute w-screen z-20">
      <RiMenuFill
        className="text-2xl md:hidden ml-auto z-20 transition-all duration-300 cursor-pointer absolute top-0 right-0 mr-4 mt-4"
        style={{
          transform: mobileMenuOpen ? "rotate(90deg)" : "rotate(0deg)",
        }}
        onClick={() => setMobileMenuOpen((prev) => !prev)}
      />

      <div className="hidden w-[100vw] h-full md:flex md:items-center justify-start md:w-auto gap-4 ml-auto px-4 py-4">
        {/* <div className='ml-auto flex gap-4 h-full items-center justify-start'> */}
        {user?.avatar && (
          <Link href="/dashboard">
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-red-500 text-white text-xs">
                {getInitials(user.name!)}
              </AvatarFallback>
            </Avatar>
          </Link>
        )}
        {user && <SignOutButton>Sign Out</SignOutButton>}
        {!user && (
          <Link href="/auth">
            <Button>Sign In</Button>
          </Link>
        )}
        {/* </div> */}
      </div>

      {/* Mobile Menu */}
      <div
        className="w-full bg-background absolute top-0 left-0 right-0 z-10 transition-all duration-300"
        style={{
          minHeight: "100vh",
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? "all" : "none",
        }}
      >
        <div className="flex flex-col gap-4 p-12">
          <Link href="/">
            <p className="py-4 px-4 hover:bg-card transition-all duration-300 rounded-md">
              Home
            </p>
          </Link>
          <Link href="/dashboard">
            <p className="py-4 px-4 hover:bg-card transition-all duration-300 rounded-md">
              Dashboard
            </p>
          </Link>
          {user && (
            <div className="py-4 px-4">
              <SignOutButton>Sign Out</SignOutButton>
            </div>
          )}
          {!user && (
            <Link href="/auth">
              <div className="py-4 px-4">
                <Button>Sign In</Button>
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
