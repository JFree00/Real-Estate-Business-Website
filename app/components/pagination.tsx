// @flow
import * as React from "react";
import { designationProps } from "@/components/Designations/sectionDesignation";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { PaginationContext } from "@/context/paginationContext";
import { cn } from "@/lib/styles";

type paginationProps = Pick<designationProps, "buttonText"> &
  React.ComponentPropsWithoutRef<"div"> & {
    setPage: (page: () => number) => void;
  };
export function Pagination({
  buttonText,
  setPage,
  className,
  ...props
}: paginationProps) {
  const context = React.useContext(PaginationContext);
  if (!context || context.amountToDisplay === 0) return null;
  const paginate = (forward: boolean) => {
    setPage(() => {
      return forward && context.current < context.max
        ? context.current + 1
        : !forward && context.current > 1
          ? context.current - 1
          : context.current;
    });
  };
  return (
    <div
      className={cn("col-span-full mt-5 flex justify-between ", className)}
      {...props}
    >
      {buttonText && (
        <Button
          variant={"outline"}
          className={" h-12 basis-1/3 bg-sgrey-10 font-medium laptop:hidden"}
        >
          {buttonText || "View All"}
        </Button>
      )}
      <p className={"hidden basis-3/12 text-xl text-sgrey-60 laptop:flex"}>
        <span className={"text-white"}>
          0{context.current}
          {" of "}
        </span>
        &nbsp;
        {context.max}
      </p>

      <div className={" flex grow items-center justify-end gap-x-2"}>
        <Button
          size={"icon"}
          className={"size-10 rounded-full laptop:size-14"}
          onClick={() => paginate(false)}
          disabled={context.current === 1}
        >
          <ArrowLeftIcon className={"size-6 "} />
        </Button>
        <p className={"my-auto text-xl text-sgrey-60 laptop:hidden"}>
          <span className={"text-white"}>
            0{context.current} {" of "}
          </span>
          &nbsp;
          {context.max}
        </p>
        <Button
          size={"icon"}
          variant={"secondary"}
          className={"size-10 rounded-full laptop:size-14"}
          onClick={() => paginate(true)}
          disabled={context.current === context.max}
        >
          <ArrowRightIcon className={"size-6"} />
        </Button>
      </div>
    </div>
  );
}
