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
              <div className="sm:hidden h-screen -mt-16 px-4 flex flex-col gap-4 justify-center items-center">
                <SunnySVG />
                <div className="text-center">
                  The mobile version of this website isn't ready yet. Please use
                  your desktop computer.
                </div>
              </div>
              <div className="hidden sm:block">
                <Callouts />
              </div>
              <div className="hidden sm:flex gap-8 max-w-[1072px] mx-auto px-4 pt-16 pb-32 mb-24">
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

function SunnySVG() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M39.8216 1.60718L47.771 10.3323L59.018 6.75085L61.5399 18.2818L73.0708 20.8036L69.4893 32.0506L78.2144 40L69.4893 47.9495L73.0708 59.1965L61.5399 61.7183L59.018 73.2492L47.771 69.6678L39.8216 78.3929L31.8721 69.6678L20.6251 73.2492L18.1033 61.7183L6.57238 59.1965L10.1538 47.9495L1.42871 40L10.1538 32.0506L6.57238 20.8036L18.1033 18.2818L20.6251 6.75085L31.8721 10.3323L39.8216 1.60718Z"
        fill="#FF0420"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M36.1134 39.0381C36.7719 39.0381 37.3058 39.572 37.3058 40.2305C37.3058 41.5477 38.3736 42.6154 39.6907 42.6154C41.0079 42.6154 42.0756 41.5477 42.0756 40.2305C42.0756 39.572 42.6095 39.0381 43.2681 39.0381C43.9266 39.0381 44.4605 39.572 44.4605 40.2305C44.4605 42.8648 42.325 45.0003 39.6907 45.0003C37.0564 45.0003 34.9209 42.8648 34.9209 40.2305C34.9209 39.572 35.4548 39.0381 36.1134 39.0381Z"
        fill="#FBFCFE"
      />
      <path
        d="M28.362 29.3491L29.0515 31.0972C29.6605 32.6415 30.8806 33.863 32.4209 34.4704L34.1752 35.1623L32.4209 35.8542C30.8806 36.4617 29.6605 37.6832 29.0515 39.2275L28.362 40.9755L27.6726 39.2275C27.0636 37.6832 25.8434 36.4617 24.3031 35.8542L22.5488 35.1623L24.3031 34.4704C25.8434 33.863 27.0636 32.6415 27.6726 31.0972L28.362 29.3491Z"
        fill="#FBFCFE"
      />
      <path
        d="M51.3171 29.3491L52.0065 31.0972C52.6156 32.6415 53.8357 33.863 55.376 34.4704L57.1303 35.1623L55.376 35.8542C53.8357 36.4617 52.6156 37.6832 52.0065 39.2275L51.3171 40.9755L50.6277 39.2275C50.0186 37.6832 48.7985 36.4617 47.2582 35.8542L45.5039 35.1623L47.2582 34.4704C48.7985 33.863 50.0186 32.6415 50.6277 31.0972L51.3171 29.3491Z"
        fill="#FBFCFE"
      />
    </svg>
  );
}
