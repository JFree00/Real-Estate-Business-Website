// @flow
import * as React from "react";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/styles";
import { Separator } from "@/components/ui/separator";
import { Pagination } from "@/components/pagination";
import { DataContext, PaginationContext } from "@/context/paginationContext";
import { Await } from "react-router";
import { loaderData } from "@/routes/_index";
import { namedUnknown } from "../../../KV/filter";

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
    | namedUnknown[];
};
type loader = Awaited<ReturnType<loaderData>>;

export function SectionDesignation({
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
        "offset relative mt-20 grid col-span-full grid-cols-6 laptop:grid-cols-12",
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
      ) : (
        data && (
          <DataContext.Provider value={data}>{children}</DataContext.Provider>
        )
      )}
    </div>
  );
}
