// @flow
import * as React from "react";
import { Suspense, useContext } from "react";
import { DataContext, PaginationContext } from "@/context/paginationContext";
import { Await } from "react-router";
import { cn } from "@/lib/styles";
import { namedUnknown } from "../../../KV/filter";

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
  return (
    <div
      className={cn(
        "overflow-hidden col-span-full grid grid-cols-1 data-[expanded=true]:grid-cols-[repeat(3,100%)] laptop:data-[expanded=true]:grid-cols-3  gap-4 mt-10 lg:mt-20 ",
        className,
      )}
      data-expanded={!!page?.paginate}
    >
      {Array.isArray(dataArray) && dataArray.length > 0 && iterate ? (
        childrenToDisplay(
          dataArray,
          !page?.current ? 0 : page.current - 1,
          amountToDisplay ?? page?.amountToDisplay ?? dataArray.length,
          children,
        )
      ) : (
        <>{children}</>
      )}
    </div>
  );
}

const childrenToDisplay = (
  data: namedUnknown[] | Promise<unknown>[],
  page: number,
  amountToDisplay: number,
  children: Props["children"],
) => {
  if (data.length === 0) return null;
  let fillerCards = 0;
  if (data.length < amountToDisplay + page + 1) {
    fillerCards = amountToDisplay + page - data.length;
  }
  return (
    <>
      {data
        .slice(page, amountToDisplay + page + fillerCards)
        .map((property, index) => {
          if (property instanceof Promise) {
            return (
              <Suspense
                key={index}
                fallback={
                  <div className={"contents *:order-last"}>{children}</div>
                }
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
        })}

      {Array.from({ length: fillerCards }).map((_, i) => {
        return <div className={"dataCard invisible"} key={i}></div>;
      })}
    </>
  );
};
