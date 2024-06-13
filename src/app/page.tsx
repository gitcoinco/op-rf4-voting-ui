"use client";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/headings";
import { Text } from "@/components/ui/text";
import { ConnectButton } from "@/components/auth/connect-button";
import { useAccount } from "wagmi";
import { redirect } from "next/navigation";

export default function Home() {
  const { address } = useAccount();
  if (address) {
    return redirect("/welcome");
  }
  return (
    <div className="max-w-screen-md mx-auto">
      <section className="flex flex-col items-center gap-4">
        <video
          className="max-w-lg w-100"
          width={"100%"}
          height={"auto"}
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="./public/SunnyVote_playOnce_700px_HEVC.mov"
            type="video/quicktime"
          />
          <source src="./SunnyVote_playOnce_700px.webm" type="video/webm" />
        </video>
        <div className="flex flex-col items-center gap-4">
          <div className="uppercase tracking-widest">Vote</div>
          <Heading variant={"h2"}>
            Retro Funding Round 4: Onchain Builders
          </Heading>
          <Text className="text-center">
            In this round of Retro Funding, badgeholders will vote on the
            metrics they think matter most when evaluating impact across the
            Superchain.
          </Text>

          <ConnectButton />
        </div>
      </section>
    </div>
  );
}
