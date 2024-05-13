import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { Button } from "@/components/common/button";

import { ConnectButton } from "../auth/connect-button";
import { SignMessage } from "../auth/sign-message";

export function Header() {
  return (
    <header className="h-20 px-4 flex justify-between items-center">
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
      <ConnectButton />
      <SignMessage />
    </header>
  );
}
