import { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import "./globals.css";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

import { cn } from "@/lib/utils";
import getCurrentUser from "@/lib/session";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "DashMind",
  description: "DashMind",
};

export default async function RootLayout({
  children,
  posts,
  home,
}: {
  children: React.ReactNode;
  posts: React.ReactNode;
  home: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Header />
        {!user && (
          <>
            {home}
            {posts}
          </>
        )}

        {children}
        <Toaster />
      </body>
    </html>
  );
}
