// @flow
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/styles";
import { Separator } from "@/components/ui/separator";
import { Pagination } from "@/components/pagination";
import { DataContext, PaginationContext } from "@/context/paginationContext";
import { namedUnknown } from "../../../data/filter";
import { Property } from "../../../data/propertyTypings";
import { Testimonial } from "../../../data/testimonials";
import { Link } from "react-router";

export type designationProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  columns?: number;
  rows?: number;
  buttonText?: string;
  pagination?: boolean;
  displayAmount?: number;
  data?:
    | {
        items: Promise<Property | Testimonial | namedUnknown | undefined>[];
        length: number;
      }
    | namedUnknown[];
  disabled?: boolean;
  linkTo?: string;
};

export function SectionDesignation({
  children,
  className,
  buttonText,
  displayAmount = 1,
  pagination = true,
  data,
  disabled,
  linkTo,
  ...props
}: designationProps) {
  const [currentPage, setCurrentPage] = React.useState(1);
  return (
    <div
      className={cn(
        "offset relative pt-20 grid col-span-full grid-cols-6 laptop:grid-cols-12",
        className,
      )}
      {...props}
    >
      {buttonText && (
        <Button
          variant={"outline"}
          className={
            " absolute right-0 top-20 hidden bg-sgrey-10 py-8 font-medium laptop:flex"
          }
          disabled={disabled}
          asChild={!!linkTo}
        >
          {linkTo ? <Link to={linkTo}>{buttonText}</Link> : buttonText}
        </Button>
      )}
      {data ? (
        <PaginationContext.Provider
          value={{
            current: currentPage,
            max: data?.length ?? data.length,
            amountToDisplay: displayAmount,
            paginate: pagination,
          }}
        >
          <DataContext.Provider value={Array.isArray(data) ? data : data.items}>
            {children}
          </DataContext.Provider>

          <Separator className={"col-span-full mt-10"} />
          <Pagination
            className={!pagination ? "hidden" : ""}
            setPage={(page) => setCurrentPage(page)}
            buttonText={buttonText}
          />
        </PaginationContext.Provider>
      ) : (
        <>{children}</>
      )}
    </div>
  );
}
