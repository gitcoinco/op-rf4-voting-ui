import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { WelcomeCarousel } from "@/components/welcome/carousel";

const slides = [
  {
    title: "Welcome to metrics based voting",
    description:
      "In this round, you’ll be voting on metrics that you think matter most when evaluating the impact of onchain projects across the Superchain.",
  },
  {
    title: "You’ll choose metrics, not projects",
    description:
      "Learn about each metric, add comments for your fellow badgeholders, and fill your ballot. Remember, you’ll be choosing metrics, not projects.",
  },
  {
    title: "How the metrics were created",
    description:
      "The list of 20 metrics for this round of voting were created by the Optimism Foundation in partnership with our citizen badgeholders.",
  },
];
export default function Welcome() {
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
