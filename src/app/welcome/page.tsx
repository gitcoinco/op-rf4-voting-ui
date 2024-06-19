"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { WelcomeCarousel } from "@/components/welcome/carousel";

import onboard1 from "../../../public/onboard1.svg";
import onboard2 from "../../../public/onboard2.svg";
import onboard3 from "../../../public/onboard3.svg";
import { useAccount } from "wagmi";
import { redirect } from "next/navigation";
import { useMetricIds } from "@/hooks/useMetrics";

export default function Welcome() {
  const { address } = useAccount();
  const slides = [
    {
      title: "Welcome to metrics based voting",
      description:
        "In this round, you’ll be voting on metrics that you think matter most when evaluating the impact of onchain projects across the Superchain.",
      image: onboard1,
    },
    {
      title: "You’ll choose metrics, not projects",
      description:
        "Learn about each metric, add comments for your fellow badgeholders, and fill your ballot. Remember, you’ll be choosing metrics, not projects.",
      image: onboard2,
    },
    {
      title: "How the metrics were created",
      description: `The list of 16 impact metrics were created by Open Source Observer and the Optimism Foundation in partnership with citizens.`,
      image: onboard3,
    },
  ];
  if (!address) {
    return redirect("/");
  }

  return (
    <div className="max-w-screen-md mx-auto flex flex-1">
      <Background />
      <Card className="w-full bg-white px-8 py-16 flex flex-col items-center rounded-3xl gap-6">
        <Badge variant="secondary">Welcome</Badge>

        <WelcomeCarousel slides={slides} />
      </Card>
    </div>
  );
}

function Background() {
  return (
    <div className="w-screen h-screen fixed inset-0 -z-10 bg-cover bg-gray-100" />
  );
}
