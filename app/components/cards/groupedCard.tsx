// @flow
import * as React from "react";
import { useContext } from "react";
import { DataContext } from "@/context/paginationContext";
import { valuesProps } from "../../../KV/values";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/styles";

export function GroupedCard() {
  const data = useContext(DataContext) as valuesProps[];
  return (
    <div
      className={
        "col-span-full outline outline-[6px] outline-sgrey-10 rounded-xl border border-sgrey-15"
      }
    >
      <div
        className={
          " w-full flex flex-col laptop:flex-row laptop:flex-wrap gap-x-12 laptop:gap-y-12 p-5 laptop:p-14 desktop:p-16 relative"
        }
      >
        {data.map((item, index) => (
          <div
            key={index}
            className={
              "basis-1/4 laptop:basis-1/3 laptop:shrink-0 border-sgrey-15 grow flex flex-col"
            }
          >
            <div className={"flex items-center gap-x-2 pb-3 laptop:pb-5"}>
              <div
                className={
                  "size-10 desktop:size-16 rounded-full border border-pprimary-60 flex"
                }
              >
                <div
                  className={"m-auto size-6 desktop:size-8 text-pprimary-75"}
                >
                  {item.icon}
                </div>
              </div>
              <p className={" text-lg  desktop:text-2xl font-semibold"}>
                {item.name}
              </p>
            </div>

            <p
              className={
                "text-sm desktop:text-lg text-sgrey-60 laptop:min-h-16 divide-sgrey-15"
              }
            >
              {item.description}
            </p>
            <Separator
              className={
                index !== data.length - 1
                  ? "laptop:absolute bottom-1/2 mx-auto inset-x-0 laptop:w-[calc(100%-6em)] h-px my-6 laptop:my-0 "
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
