"use client";
import { useAccount } from "wagmi";
import { useIsBadgeholder } from "@/hooks/useIsBadgeholder";
import { useVotingTimeLeft } from "../voting-ends-in";
import { votingEndDate } from "@/config";

export function Callouts() {
  const { address, status } = useAccount();
  const isBadgeholder = useIsBadgeholder();

  const [days, hours, minutes, seconds] = useVotingTimeLeft(votingEndDate);

  console.log(days, hours, minutes, seconds);
  if (Number(seconds) < 0) {
    return (
      <div className="bg-accent-foreground text-center p-3 text-white">
        Voting in Retro Funding Round 4 has closed
      </div>
    );
  }

  if (!address) return null;
  if (["connecting", "reconnecting"].includes(status)) return null;
  if (isBadgeholder) return null;

  return (
    <div className="bg-accent-foreground text-center p-3 text-white">
      Demo mode: You&apos;re not a badgeholder
    </div>
  );
}
