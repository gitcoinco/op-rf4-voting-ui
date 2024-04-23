import { BallotTabs } from "@/components/ballot/ballot-tabs";
import { AllocationSidebar } from "@/components/metrics/allocation-sidebar";

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
        <AllocationSidebar />
      </aside>
    </>
  );
}
