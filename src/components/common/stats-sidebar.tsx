import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Heading } from "../ui/headings";
import { ScrollArea } from "../ui/scroll-area";
import { Text } from "../ui/text";
import { DistributionChart } from "../metrics/distribution-chart";

export function StatsSidebar({
  title,
  description,
  projects,
  footer,
}: {
  title: string;
  description?: string;
  footer?: ReactNode;
  projects: ListItem[];
}) {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <Heading variant="h3">{title}</Heading>
        {description && <Text>{description}</Text>}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border rounded-lg h-32">
          <DistributionChart />
        </div>
        <ScrollArea>
          <List
            items={projects}
            renderItem={({ label, value }) => (
              <div
                key={label}
                className="flex text-xs items-center justify-between py-2 flex-1 border-b text-muted-foreground"
              >
                <div className="flex gap-2 items-center">
                  <div className="size-6 rounded-lg  bg-gray-100" />
                  <div className="">{label}</div>
                </div>
                <div className="">{value}</div>
              </div>
            )}
          />
        </ScrollArea>

        {footer}
      </CardContent>
    </Card>
  );
}

type ListItem = { label: string; value: string };
export function List({
  items,
  renderItem,
}: {
  items: ListItem[];
  renderItem: (item: ListItem) => ReactNode;
}) {
  return <ul>{items.map((item) => renderItem(item))}</ul>;
}
