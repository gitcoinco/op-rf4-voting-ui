import { truncate } from "@/lib/truncate";
import { type ComponentProps } from "react";
import { type Address } from "viem";
import { normalize } from "viem/ens";
import { useEnsAvatar, useEnsName } from "wagmi";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function AvatarENS({
  address,
  ...props
}: { address: string } & ComponentProps<typeof Avatar>) {
  const { data: name } = useEnsName({
    address: address as Address,
    chainId: 1,
    query: { enabled: Boolean(address) },
  });

  const { data: src } = useEnsAvatar({
    name: normalize(name!),
    query: { enabled: Boolean(name) },
  });
  return (
    <Avatar {...props}>
      <AvatarImage src={src!} alt={name ?? address} />
      <AvatarFallback className="bg-gray-300">{name}</AvatarFallback>
    </Avatar>
  );
}

export function NameENS({
  address,
  truncateLength,
  ...props
}: {
  address?: string;
  truncateLength?: number;
} & ComponentProps<"div">) {
  const { data: name } = useEnsName({
    address: address as Address,
    chainId: 1,
    query: { enabled: Boolean(address) },
  });

  return (
    <div {...props} title={address}>
      {name ?? truncate(address, truncateLength)}
    </div>
  );
}
