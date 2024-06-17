import { useSession } from "@/components/auth/sign-message";

export function useIsBadgeholder() {
  const { data: session } = useSession();
  return session?.siwe?.isBadgeholder;
}
