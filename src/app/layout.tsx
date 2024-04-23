import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";

import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/common/logo";
import { Button } from "@/components/common/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OP RetroFunding Round 4",
  description: "...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <main className="">
          <header className="h-20 px-8 flex justify-between items-center">
            <Link href={"/"}>
              <Logo />
            </Link>
            <div className="flex items-center gap-2 divide-x space-x-2 text-sm">
              <div>
                Time left to vote <span className="pl-2">10d : 5h : 12m</span>
              </div>
              <Button
                icon={ArrowUpRight}
                iconSide="right"
                variant="link"
                className="pl-4"
              >
                View badgeholder manual
              </Button>
            </div>
            <Button variant="outline">todo.eth</Button>
          </header>
          <div className="flex gap-8 max-w-screen-lg mx-auto py-16">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
