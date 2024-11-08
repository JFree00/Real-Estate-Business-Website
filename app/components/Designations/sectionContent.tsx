// @flow
import * as React from "react";
import { useContext } from "react";
import { DataContext, PaginationContext } from "@/context/paginationContext";
import { useAsyncValue } from "@remix-run/react";
import { cn } from "@/lib/styles";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactElement;
  amountToDisplay?: number;
  iterate?: boolean;
};

export type assumedData =
  | {
      name: string;
      [key: string]: string;
    }
  | { name: string; [key: string]: string }[];

export function SectionContent({ children, className, iterate = true }: Props) {
  const deferredData = useAsyncValue() as assumedData;
  const [dataArray, setArray] = React.useState(deferredData);
  const context = useContext(DataContext);
  if (!dataArray) setArray(context);

  const page = useContext(PaginationContext);
  return (
    <div
      className={cn(
        "flex basis-full overflow-hidden gap-x-7 flex-nowrap w-full mt-10 lg:mt-20 shrink-0 ",
        className,
      )}
    >
      {Array.isArray(dataArray) && dataArray.length > 0 && iterate
        ? childrenToDisplay(
            dataArray,
            page.current - 1,
            page.amountToDisplay,
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
  data: Array<assumedData>,
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
          return React.cloneElement(children, {
            key: index,
            data: property,
          });
        })}

      {Array.from({ length: fillerCards }).map((_, i) => {
        return (
          <div className={"invisible dataCard"}>
            {React.cloneElement(children, {
              key: `filler-${i}`,
              data: data[0],
            })}
          </div>
        );
      })}
    </>
  );
};
