"use client";

import { SiweMessage } from "siwe";
import ky from "ky";
import {
  useAccount,
  useChainId,
  useDisconnect as useWagmiDisconnect,
  useSignMessage,
} from "wagmi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { getToken, setToken } from "@/lib/token";
import { useRouter } from "next/navigation";

export function SignMessage() {
  const { data: nonce } = useNonce();
  const { data: session } = useSession();
  const { address } = useAccount();
  const verify = useVerify();
  const chainId = useChainId();
  const sign = useSignMessage();

  async function handleSign() {
    if (nonce) {
      const message = new SiweMessage({
        version: "1",
        domain: window.location.host,
        uri: window.location.origin,
        address,
        chainId,
        nonce,
        statement: "Sign in to Agora with Ethereum",
      }).prepareMessage();
      const signature = await sign.signMessageAsync({ message });
      verify.mutate({ signature, message, nonce });
    }
  }

  const { disconnect } = useDisconnect();

  return (
    <Dialog open={address && !session}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Authenticate</DialogTitle>
          <DialogDescription>Sign message to authenticate.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Button
            type="button"
            className="w-full"
            variant={"destructive"}
            isLoading={sign.isPending}
            onClick={handleSign}
          >
            Sign message
          </Button>
          <Button
            className="w-full"
            variant="ghost"
            onClick={() => {
              disconnect?.();
            }}
          >
            Disconnect wallet
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function useNonce() {
  return useQuery({
    queryKey: ["nonce"],
    queryFn: async () => ky.get("/api/agora/auth/nonce").text(),
  });
}
function useVerify() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (json: {
      message: string;
      signature: string;
      nonce: string;
    }) => {
      const { access_token } = await ky
        .post("/api/agora/auth/verify", { json })
        .json<{ access_token: string }>();

      setToken(access_token);
      // Trigger a refetch of the session
      client.invalidateQueries({
        queryKey: ["session"],
      });

      return { access_token };
    },
  });
}
export function useDisconnect() {
  const client = useQueryClient();
  const router = useRouter();
  const wagmiDisconnect = useWagmiDisconnect();

  function disconnect() {
    wagmiDisconnect.disconnect();
    global?.localStorage.removeItem("token");
    client.invalidateQueries({ queryKey: ["session"] });
    router.push("/");
  }

  return { disconnect };
}
function useSession() {
  const accessToken = getToken();
  return useQuery({
    queryKey: ["session", { accessToken }],
    // Session endpoint not available yet
    queryFn: async () => {
      return accessToken ? { accessToken } : null;
      // return accessToken ? decodeJwt(accessToken) : null;
    },
  });
}
