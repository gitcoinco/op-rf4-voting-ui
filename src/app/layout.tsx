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

const title = "Retro Funding 4: Voting";
const description = "Voting is now live for Retro Funding 4: Onchain Builders";
const url = "https://op-rf4-voting-ui.vercel.app";
export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: "website",
    url,
    title,
    description,
    siteName: title,
    images: [{ url: url + "/og.png" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@site",
    creator: "@creator",
    images: url + "/og.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon-32x32.png" sizes="any" />
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
              <div className="flex gap-8 max-w-[1072px] mx-auto px-4 pt-16 pb-32 mb-24">
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
