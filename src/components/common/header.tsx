import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";

import { ConnectButton } from "../auth/connect-button";
import { SignMessage } from "../auth/sign-message";
import { VotingEndsIn } from "../voting-ends-in";

export function Header() {
  return (
    <header className="h-20 px-4 flex justify-between items-center">
      <Link href={"/"}>
        <Logo />
      </Link>
      <div className="flex items-center gap-2 divide-x space-x-2 text-sm">
        <div>
          Time left to vote{" "}
          <VotingEndsIn className="pl-2" date={new Date("2024-07-31")} />
        </div>
        <Button iconRight={ArrowUpRight} variant="link" className="pl-4">
          View badgeholder manual
        </Button>
      </div>
      <ConnectButton />
      <SignMessage />
    </header>
  );
}
