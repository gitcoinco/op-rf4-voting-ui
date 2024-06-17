import { useSession } from "@/components/auth/sign-message";

export function useIsBadgeholder() {
  const { data: session } = useSession();
  console.log(session);
  return Boolean(session?.isBadgeholder);
}
