import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/nav-bar";
import { getUser } from "@/lib/lucia";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "@/providers/session-provider";
import { APP_DESCRIPTION, APP_NAME } from "@/constants";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, session } = await getUser();
  //TODO: apply user layout

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session} sessionUser={user}>
          <ThemeProvider
            attribute="class"
            defaultTheme={user?.theme || "bean"}
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <Toaster richColors />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
