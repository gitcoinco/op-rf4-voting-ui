"use client";
import { useAccount } from "wagmi";
import { useSession } from "../auth/sign-message";

export function DemoCallout() {
  const { status } = useAccount();
  const session = useSession();

  if (["connecting", "reconnecting"].includes(status)) return null;
  if (session.data?.siwe?.isBadgeholder) return null;
  return (
    <div className="bg-accent-foreground text-center p-3 text-white">
      Demo mode: You&apos;re not a badgeholder
    </div>
  );
}
