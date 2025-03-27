// @flow
import * as React from "react";
import { Suspense, useContext, useMemo } from "react";
import { DataContext, PaginationContext } from "@/context/paginationContext";
import { Await } from "react-router";
import { cn } from "@/lib/styles";
import { namedUnknown } from "../../../data/filter";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ComponentPropsWithoutRef<"div">;
  amountToDisplay?: number;
  iterate?: boolean;
};

export function SectionContent({
  children,
  className,
  iterate = true,
  amountToDisplay,
}: Props) {
  const dataArray = useContext(DataContext) as
    | namedUnknown[]
    | Promise<unknown>[];
  const page = useContext(PaginationContext);
  const currentPage = page?.current ? page.current - 1 : 0;
  amountToDisplay =
    amountToDisplay ?? page?.amountToDisplay ?? dataArray.length;
  const dataChildren = useMemo(
    () =>
      childrenToDisplay(
        dataArray,
        currentPage,
        amountToDisplay ?? page?.amountToDisplay ?? dataArray.length,
        children,
      ),
    [dataArray],
  );
  let fillerCards = 0;
  if (dataChildren.length < amountToDisplay + currentPage + 1) {
    fillerCards = amountToDisplay + currentPage - dataArray.length;
  }
  return (
    <section
      className={cn(
        "overflow-hidden col-span-full grid grid-cols-1 data-[expanded=true]:grid-cols-[repeat(3,100%)] laptop:data-[expanded=true]:grid-cols-3 gap-4 mt-10 lg:mt-20",
        className,
      )}
      data-expanded={!!page?.paginate}
    >
      {Array.isArray(dataArray) && dataArray.length > 0 && iterate ? (
        dataChildren.slice(
          currentPage,
          amountToDisplay + currentPage + fillerCards,
        )
      ) : (
        <>{children}</>
      )}
    </section>
  );
}

const childrenToDisplay = (
  data: namedUnknown[] | Promise<unknown>[],
  page: number,
  amountToDisplay: number,
  children: Props["children"],
) => {
  return data.map((property, index) => {
    if (property instanceof Promise) {
      return (
        <Suspense
          key={index}
          fallback={<div className={"contents *:order-last"}>{children}</div>}
        >
          <Await resolve={property}>
            {(promiseData) => {
              if (!promiseData) return null;
              return (
                <DataContext.Provider value={promiseData}>
                  {children}
                </DataContext.Provider>
              );
            }}
          </Await>
        </Suspense>
      );
    } else {
      return (
        <DataContext.Provider value={property} key={index}>
          {children}
        </DataContext.Provider>
      );
    }
  });
};
