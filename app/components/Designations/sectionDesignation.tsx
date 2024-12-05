// @flow
import * as React from "react";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/styles";
import { Separator } from "@/components/ui/separator";
import { Pagination } from "@/components/pagination";
import { DataContext, PaginationContext } from "@/context/paginationContext";
import { Await } from "@remix-run/react";
import { loaderData } from "@/routes/_index";

export interface assumedData {
  name: string;
  [key: string]: unknown;
}
export type designationProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  columns?: number;
  rows?: number;
  buttonText?: string;
  pagination?: boolean;
  displayAmount?: number;
  data?:
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
  displayAmount = 1,
  pagination = true,
  data,
}: designationProps) {
  const [currentPage, setCurrentPage] = React.useState(1);
  return (
    <div
      className={cn(
        " relative mt-20 grid col-start-2 col-end-12 col-span-full grid-cols-subgrid",
        className,
      )}
      // style={{
      //   gridRow: `span ${rows} / span ${rows}`,
      //   gridColumn: ` 1 / span ${columns}`,
      // }}
    >
      {buttonText && (
        <Button
          variant={"outline"}
          className={
            " absolute right-0 top-20 py-8 bg-sgrey-10 font-medium hidden laptop:flex"
          }
        >
          {buttonText}
        </Button>
      )}
      {pagination && data ? (
        <PaginationContext.Provider
          value={{
            current: currentPage,
            max: data?.length ?? data.length,
            amountToDisplay: displayAmount,
            paginate: pagination,
          }}
        >
          {data && Array.isArray(data) ? (
            <DataContext.Provider value={data}>{children}</DataContext.Provider>
          ) : (
            <Suspense>
              <Await resolve={data.keys}>{children}</Await>
            </Suspense>
          )}
          <Separator className={"mt-10 col-span-full"} />
          <Pagination
            setPage={(page) => setCurrentPage(page)}
            buttonText={buttonText}
          />
        </PaginationContext.Provider>
      ) : data && Array.isArray(data) ? (
        <DataContext.Provider value={data}>{children}</DataContext.Provider>
      ) : (
        <Suspense>
          <Await resolve={data?.keys}>{children}</Await>
        </Suspense>
      )}
    </div>
  );
}
