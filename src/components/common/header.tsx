"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";

import { ConnectButton } from "../auth/connect-button";
import { SignMessage } from "../auth/sign-message";
import { VotingEndsIn } from "../voting-ends-in";
import { votingEndDate, badgeholderManualUrl } from "@/config";
import mixpanel from "mixpanel-browser";

export function Header() {
  return (
    <header className="h-20 px-4 flex justify-between items-center">
      <Link href={"/"}>
        <Logo />
      </Link>
      <div className="hidden sm:flex items-center gap-2 divide-x space-x-2 text-sm">
        <div className="flex flex-col lg:flex-row items-center">
          Time left to vote{" "}
          <VotingEndsIn className="pl-2" date={votingEndDate} />
        </div>
        <Link href={badgeholderManualUrl} target="_blank">
          <Button
            iconRight={ArrowUpRight}
            variant="link"
            className="pl-4"
            onClick={() => mixpanel.track("Open Manual", { external: true })}
          >
            View badgeholder manual
          </Button>
        </Link>
      </div>
      <div className="hidden sm:block">
        <ConnectButton />
      </div>

      <SignMessage />
    </header>
  );
}
