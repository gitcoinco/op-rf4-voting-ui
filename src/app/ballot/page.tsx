"use client";
import { EmptyBallot, NonBadgeholder } from "@/components/ballot/ballot-states";
import { useAccount } from "wagmi";

export default function BallotPage() {
  const { address } = useAccount();
  const isEmptyBallot = !Boolean(address);
  if (isEmptyBallot) {
    return <EmptyBallot />;
  }
  return (
    <div>
      <NonBadgeholder />
    </div>
  );
}
