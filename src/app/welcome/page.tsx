import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/headings";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Welcome() {
  return (
    <div className="max-w-screen-md mx-auto flex flex-1">
      <Background />
      <Card className="w-full bg-white px-8 py-16 flex flex-col items-center rounded-3xl gap-6">
        <Badge variant="secondary">Welcome</Badge>

        <div className="w-72 h-36 bg-gray-100" />
        <div className="max-w-[450px] mx-auto">
          <Heading variant="h3" className="text-center mb-4">
            How the metrics were created
          </Heading>
          <Text className="text-center">
            The list of 20 metrics for this round of voting were created by the
            Optimism Foundation in partnership with our citizen badgeholders.{" "}
          </Text>
        </div>

        <Button variant={"destructive"} asChild>
          <Link href="/ballot">Let&apos;s go</Link>
        </Button>
      </Card>
    </div>
  );
}

function Background() {
  return (
    <div className="w-screen h-screen fixed inset-0 -z-10 bg-cover bg-gray-100" />
  );
}
