"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/headings";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ComponentProps, ComponentType, PropsWithChildren } from "react";
import { useDisconnect } from "../auth/sign-message";

export function EmptyBallot() {
  return (
    <EmptyCard
      icon={BallotSvg}
      title="Your ballot is empty"
      description="Review and add the metrics you believe should be used to reward projects in this round."
    >
      <div className="flex gap-2">
        <Button variant="destructive" asChild>
          <Link href="/ballot/metrics">Review metrics</Link>
        </Button>
        <Button variant="outline">Import ballot</Button>
      </div>
      <Button variant="link" asChild>
        <Link href="#learn-more">Learn more</Link>
      </Button>
    </EmptyCard>
  );
}

export function NonBadgeholder() {
  const { disconnect } = useDisconnect();
  return (
    <div>
      <EmptyCard
        icon={UserSvg}
        title="You’re not a badgeholder"
        description="Feel free to play around, but you won’t be able to comment on metrics or
            submit a ballot."
      >
        <Button variant="destructive" onClick={() => disconnect()}>
          Disconnect wallet
        </Button>
        <Button variant="link">Learn more</Button>
      </EmptyCard>
    </div>
  );
}

function DashedCard({ className, ...props }: ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn("border-none", className)}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23bcbfcd' stroke-width='2' stroke-dasharray='10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
      }}
      {...props}
    />
  );
}

function EmptyCard({
  icon: Icon,
  title,
  description,
  children,
}: PropsWithChildren<{
  icon: ComponentType;
  title: string;
  description: string;
}>) {
  return (
    <DashedCard className="px-6 py-16 flex items-center justify-center flex-col gap-4">
      <Icon />
      <Heading variant="h3">{title}</Heading>
      <Text className="text-center max-w-lg mx-auto">{description}</Text>

      {children}
    </DashedCard>
  );
}

function UserSvg() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32Z"
        fill="#F2F3F8"
      />
      <path
        d="M40 42H24V40C24 37.2386 26.2386 35 29 35H35C37.7614 35 40 37.2386 40 40V42ZM32 33C28.6863 33 26 30.3137 26 27C26 23.6863 28.6863 21 32 21C35.3137 21 38 23.6863 38 27C38 30.3137 35.3137 33 32 33Z"
        fill="#636779"
      />
    </svg>
  );
}

function BallotSvg() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32Z"
        fill="#F2F3F8"
      />
      <path
        d="M40 42H24C23.4477 42 23 41.5523 23 41V23C23 22.4477 23.4477 22 24 22H40C40.5523 22 41 22.4477 41 23V41C41 41.5523 40.5523 42 40 42ZM28 27V29H36V27H28ZM28 31V33H36V31H28ZM28 35V37H33V35H28Z"
        fill="#636779"
      />
    </svg>
  );
}
