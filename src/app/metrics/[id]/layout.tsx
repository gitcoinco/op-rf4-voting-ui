import { DistributionSidebar } from "@/components/metrics/distribution-sidebar";

export default function BallotLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex-1 space-y-6">{children}</div>
      <aside>
        <DistributionSidebar />
      </aside>
    </>
  );
}
