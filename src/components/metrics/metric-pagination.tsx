"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useMetricIds } from "@/hooks/useMetrics";

export function MetricPagination({ id = "" }) {
  const { data, isPending } = useMetricIds();
  if (isPending) return null;
  const current = data?.findIndex((_id) => _id === id) ?? 0;
  const pages = data ?? [];

  const maxPagesToShow = 5;
  const totalPages = pages.length;
  const startPage = Math.max(
    0,
    Math.min(current - 2, totalPages - maxPagesToShow)
  );
  const endPage = Math.min(startPage + maxPagesToShow, totalPages);

  const visiblePages = pages.slice(startPage, endPage);

  return (
    <div className="fixed bottom-10 bg-white shadow border rounded-lg p-2 left-1/2 -translate-x-1/2">
      <Pagination>
        <PaginationContent>
          {current > 0 && (
            <PaginationItem>
              <PaginationPrevious href={`/metrics/${pages[current - 1]}`} />
            </PaginationItem>
          )}

          {visiblePages.map((pageId, index) => (
            <PaginationItem key={pageId}>
              <PaginationLink
                href={`/metrics/${pageId}`}
                isActive={startPage + index === current}
              >
                {startPage + index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  href={`/metrics/${pages[totalPages - 1]}`}
                  isActive={current === totalPages - 1}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          {current < totalPages - 1 && (
            <PaginationItem>
              <PaginationNext href={`/metrics/${pages[current + 1]}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
