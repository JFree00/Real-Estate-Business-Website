// @flow
import * as React from "react";
import { useContext } from "react";
import { DataContext } from "@/context/paginationContext";
import { valuesProps } from "../../../data/values";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/styles";

export function GroupedCard() {
  const data = useContext(DataContext) as valuesProps[];
  if (!data) return null;
  return (
    <div
      className={
        "col-span-full rounded-xl border border-sgrey-15 outline outline-[6px] outline-sgrey-10"
      }
    >
      <div
        className={
          " relative flex w-full flex-col gap-x-12 p-5 laptop:flex-row laptop:flex-wrap laptop:gap-y-12 laptop:p-14 desktop:p-16"
        }
      >
        {data.map((item, index) => (
          <div
            key={index}
            className={
              "flex grow basis-1/4 flex-col border-sgrey-15 laptop:shrink-0 laptop:basis-1/3"
            }
          >
            <div className={"flex items-center gap-x-2 pb-3 laptop:pb-5"}>
              <div
                className={
                  "flex size-10 rounded-full border border-pprimary-60 desktop:size-16"
                }
              >
                <div
                  className={"m-auto size-6 text-pprimary-75 desktop:size-8"}
                >
                  {item.icon}
                </div>
              </div>
              <p className={" text-lg  font-semibold desktop:text-2xl"}>
                {item.name}
              </p>
            </div>

            <p
              className={
                "divide-sgrey-15 text-sm text-sgrey-60 laptop:min-h-16 desktop:text-lg"
              }
            >
              {item.description}
            </p>
            <Separator
              className={
                index !== data.length - 1
                  ? "inset-x-0 bottom-1/2 mx-auto my-6 h-px laptop:absolute laptop:my-0 laptop:w-[calc(100%-6em)] "
                  : "hidden"
              }
            />
            <Separator
              orientation={"vertical"}
              className={cn(
                "hidden",
                index / 2 === 1
                  ? "laptop:block  absolute bottom-[calc(6em-7%)] right-1/2 h-[calc(50%-6em)] w-px"
                  : index / 2 == 0
                    ? "laptop:block  absolute top-[calc(6em-7%)] right-1/2 h-[calc(50%-6em)] w-px"
                    : "hidden",
              )}
            />
            {/*
              <Separator
                className={index < data.length / 2 ? "mt-3" : "hidden"}
              />
           */}
          </div>
        ))}
      </div>
    </div>
  );
}
