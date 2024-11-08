// @flow
import * as React from "react";
import { useContext } from "react";
import { DataContext } from "@/context/paginationContext";
import { valuesProps } from "../../../KV/values";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { Separator } from "@/components/ui/separator";

export function GroupedCard() {
  const data = useContext(DataContext) as valuesProps[];
  return (
    <div
      className={
        "basis-11/12 outline outline-[6px] outline-sgrey-10 rounded-xl border border-sgrey-15"
      }
    >
      <div className={" mx-auto my-1 w-full flex flex-col"}>
        {data.map((item, index) => (
          <div key={index} className={"basis-1/4 px-6 py-2"}>
            <div className={"flex items-center gap-x-2 mb-2"}>
              <div
                className={
                  "size-10 rounded-full border border-pprimary-60 flex"
                }
              >
                <UserGroupIcon className={"m-auto size-6 text-pprimary-75"} />
              </div>
              <p className={" text-lg font-semibold"}>{item.name}</p>
            </div>

            <p className={"text-sm text-sgrey-60"}>{item.description}</p>
            {index + 2 > data.length ? null : <Separator className={"mt-3"} />}
          </div>
        ))}
      </div>
    </div>
  );
}
