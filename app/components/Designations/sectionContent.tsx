// @flow
import * as React from "react";
import { Suspense, useContext } from "react";
import { DataContext, PaginationContext } from "@/context/paginationContext";
import { Await, useAsyncValue } from "react-router";
import { cn } from "@/lib/styles";
import { namedUnknown } from "../../../KV/filter";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactElement;
  amountToDisplay?: number;
  iterate?: boolean;
};

export function SectionContent({
  children,
  className,
  iterate = true,
  amountToDisplay,
}: Props) {
  const deferredData = useAsyncValue() as namedUnknown[];
  const dataContext = useContext(DataContext);
  const dataArray = deferredData ?? dataContext
  const page = useContext(PaginationContext);
  return (
    <div
      className={cn(
        "overflow-hidden col-span-full grid grid-cols-1 data-[expanded=true]:grid-cols-[repeat(3,100%)] laptop:data-[expanded=true]:grid-cols-3  gap-4 mt-10 lg:mt-20 ",
        className,
      )}
      data-expanded={!!page?.paginate}
    >
      {Array.isArray(dataArray) && dataArray.length > 0 && iterate
        ? childrenToDisplay(
            dataArray,
            !page?.current ? 0 : page.current - 1,
            amountToDisplay ?? page?.amountToDisplay ?? dataArray.length,
            children,
          )
        : React.cloneElement(children, {
            key: `SectionChild`,
            data: dataArray,
          })}
    </div>
  );
}

const childrenToDisplay = (
  data: namedUnknown[],
  page: number,
  amountToDisplay: number,
  children: React.ReactElement,
) => {
  let fillerCards = 0;
  if (data.length < amountToDisplay + page + 1) {
    fillerCards = amountToDisplay + page - data.length;
  }
  return (
    <>
      {data
        .slice(page, amountToDisplay + page + fillerCards)
        .map((property, index) => {
          return (
            <Suspense key={index} fallback={<div className={"dataCard"}></div>}>
              <Await resolve={data?.keys}>
                {React.cloneElement(children, {
                  data: property,
                })}
              </Await>
            </Suspense>
          );
        })}

      {Array.from({ length: fillerCards }).map((_, i) => {
        return <div className={"dataCard invisible"} key={i}></div>;
      })}
    </>
  );
};
