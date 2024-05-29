"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useMetricIds } from "@/hooks/useMetrics";
import { cn } from "@/lib/utils";

export function MetricPagination({ id = "" }) {
  const { data, isPending } = useMetricIds();
  if (isPending) return null;
  const current = data?.findIndex((_id) => _id === id) ?? 0;
  const pages = data ?? [];

  return (
    <div className="fixed bottom-10 bg-white shadow border rounded-lg p-2 left-1/2 -translate-x-1/2">
      <Pagination>
        <PaginationContent>
          <PaginationItem
            className={cn({
              ["pointer-events-none opacity-50"]: current === 0,
            })}
          >
            <PaginationPrevious href={`/metrics/${pages[current - 1]}`} />
          </PaginationItem>

          {pages.map((pageId, index) => (
            <PaginationItem key={pageId}>
              <PaginationLink
                href={`/metrics/${pageId}`}
                isActive={index === current}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem
            className={cn({
              ["pointer-events-none opacity-50"]: current === pages.length - 1,
            })}
          >
            <PaginationNext href={`/metrics/${pages[current + 1]}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
