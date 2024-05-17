import { BallotTabs } from "@/components/ballot/ballot-tabs";
import { BallotSidebar } from "@/components/metrics/ballot-sidebar";

export default function BallotLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex-1 space-y-6">
        <BallotTabs />

        {children}
      </div>
      <aside>
        <BallotSidebar />
      </aside>
    </>
  );
}
