// @flow
import * as React from "react";
import { designationProps } from "@/components/Designations/sectionDesignation";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { PaginationContext } from "@/context/paginationContext";

type paginationProps = Pick<designationProps, "buttonText"> & {
  setPage: (page: () => number) => void;
};
export function Pagination({ buttonText, setPage }: paginationProps) {
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
    <div className={"col-span-full flex mt-5 justify-between "}>
      {buttonText && (
        <Button
          variant={"outline"}
          className={" bg-sgrey-10 font-medium laptop:hidden basis-1/3 h-12"}
        >
          {buttonText || "View All"}
        </Button>
      )}
      <p className={"text-sgrey-60 basis-3/12 text-xl hidden laptop:flex"}>
        <span className={"text-white"}>
          0{context.current}
          {" of "}
        </span>
        &nbsp;
        {context.max}
      </p>

      <div className={" grow flex gap-x-2 justify-end items-center"}>
        <Button
          size={"icon"}
          className={"rounded-full w-10 h-10 laptop:h-14 laptop:w-14"}
          onClick={() => paginate(false)}
          disabled={context.current === 1}
        >
          <ArrowLeftIcon className={"size-6 "} />
        </Button>
        <p className={"text-sgrey-60 my-auto text-xl laptop:hidden"}>
          <span className={"text-white"}>
            0{context.current} {" of "}
          </span>
          &nbsp;
          {context.max}
        </p>
        <Button
          size={"icon"}
          variant={"secondary"}
          className={"rounded-full w-10 h-10 laptop:h-14 laptop:w-14"}
          onClick={() => paginate(true)}
          disabled={context.current === context.max}
        >
          <ArrowRightIcon className={"size-6"} />
        </Button>
      </div>
    </div>
  );
}
