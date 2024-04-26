"use client";
import { ConnectButton as RConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "../common/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useDisconnect } from "wagmi";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import ky from "ky";

export function ConnectButton() {
  const { disconnect } = useDisconnect();
  return (
    <RConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button variant="outline" onClick={openConnectModal}>
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button variant="outline" onClick={openChainModal}>
                    Wrong network
                  </Button>
                );
              }

              return (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <UserButton {...account} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => disconnect()}>
                      Disconnect wallet
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            })()}
          </div>
        );
      }}
    </RConnectButton.Custom>
  );
}

function UserButton({ displayName = "", ensAvatar = "" }) {
  return (
    <Button
      variant="outline"
      icon={() =>
        ensAvatar && (
          <Image
            alt={displayName}
            width={24}
            height={24}
            className="size-6 rounded-full mr-1"
            src={ensAvatar}
          />
        )
      }
    >
      {displayName}
      <ChevronDown className="size-4 ml-2" />
    </Button>
  );
}

// Are these needed?
function useNonce() {
  return useQuery({
    queryKey: ["nonce"],
    queryFn: async () => ky.get("/api/agora/auth/nonce").text(),
  });
}
function useVerify() {
  return useMutation({
    mutationFn: async () => ky.post("/api/agora/auth/verify").json(),
  });
}
