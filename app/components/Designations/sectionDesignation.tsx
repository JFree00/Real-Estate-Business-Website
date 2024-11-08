// @flow
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/styles";
import { Separator } from "@/components/ui/separator";
import { Pagination } from "@/components/pagination";
import { DataContext, PaginationContext } from "@/context/paginationContext";
import { Suspense } from "react";
import { Await } from "@remix-run/react";
import { loaderData } from "@/routes/_index";
import { assumedData } from "@/components/Designations/sectionContent";

export type designationProps = {
  children: React.ReactNode;
  columns?: number;
  rows?: number;
  className?: string;
  buttonText?: string;
  paginationDisplayAmount?: number;
  data:
    | {
        [K in keyof loader[keyof loader]]: loader[keyof loader][Awaited<K>];
      }
    | assumedData[];
};
type loader = Awaited<ReturnType<loaderData>>;

export function SectionDesignation({
  rows = 3,
  columns = 12,
  children,
  className,
  buttonText,
  paginationDisplayAmount = 3,
  data,
}: designationProps) {
  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <div
      className={cn("offset relative pt-20", className)}
      style={{
        gridRow: `span ${rows} / span ${rows}`,
        gridColumn: ` 1 / span ${columns}`,
      }}
    >
      <Button
        variant={"outline"}
        className={
          " absolute right-0 top-28 py-8 bg-sgrey-10 font-medium hidden laptop:flex"
        }
      >
        {buttonText || "View All"}
      </Button>
      <PaginationContext.Provider
        value={{
          current: currentPage,
          max: data.length,
          amountToDisplay: paginationDisplayAmount,
        }}
      >
        {data && Array.isArray(data) ? (
          <DataContext.Provider value={data}> {children}</DataContext.Provider>
        ) : (
          <Suspense>
            <Await resolve={data.keys}>{children}</Await>
          </Suspense>
        )}
        <Separator className={"mt-10"} />
        <Pagination
          setPage={(page) => setCurrentPage(page)}
          buttonText={buttonText}
        />
      </PaginationContext.Provider>
    </div>
  );
}
