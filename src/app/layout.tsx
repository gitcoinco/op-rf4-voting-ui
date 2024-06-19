import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Provider } from "./providers";
import { Header } from "@/components/common/header";
import { Toaster } from "@/components/ui/toaster";
import { BallotProvider } from "@/components/ballot/provider";
import { Callouts } from "@/components/common/callouts";

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
        <Provider>
          <BallotProvider>
            <main className="">
              <Header />
              <Callouts />
              <div className="flex gap-8 max-w-screen-lg mx-auto px-4 pt-16 pb-32 mb-24">
                {children}
              </div>
            </main>
          </BallotProvider>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
