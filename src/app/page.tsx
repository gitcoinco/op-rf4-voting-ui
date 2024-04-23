import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <pre>onboarding not implemented yet</pre>
      <Button variant="destructive" asChild>
        <Link href={"/ballot"}>Go to ballot</Link>
      </Button>
    </div>
  );
}
