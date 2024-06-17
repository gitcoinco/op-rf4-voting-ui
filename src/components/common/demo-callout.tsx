"use client";
import { useAccount } from "wagmi";
import { useIsBadgeholder } from "@/hooks/useIsBadgeholder";

export function DemoCallout() {
  const { address, status } = useAccount();
  const isBadgeholder = useIsBadgeholder();

  if (!address) return null;
  if (["connecting", "reconnecting"].includes(status)) return null;
  if (isBadgeholder) return null;

  return (
    <div className="bg-accent-foreground text-center p-3 text-white">
      Demo mode: You&apos;re not a badgeholder
    </div>
  );
}
