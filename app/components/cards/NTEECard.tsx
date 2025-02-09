// @flow
import * as React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { stepsProps } from "../../../data/steps";
import { cn } from "@/lib/styles";
import { useContext } from "react";
import { DataContext } from "@/context/paginationContext";

type props = React.HTMLAttributes<HTMLDivElement> & {
  data?: stepsProps;
};

export function NteeCard({ data, className }: props) {
  const dataContext = useContext(DataContext) as stepsProps;
  data = data ?? dataContext;

  if (!data) return null;
  return (
    <article className={cn("laptop:basis-1/4 flex flex-col grow", className)}>
      <div className={"flex h-12 items-center border-l border-l-pprimary-60"}>
        <h3 className={"px-7 text-base font-medium"}>Step 0{data.step}</h3>
      </div>
      <div
        className={
          " size-full  rounded-lg border border-transparent p-px rounded-tl-none"
        }
        style={{
          backgroundImage:
            "linear-gradient(#141414, #141414), linear-gradient(150deg, rgba(112,59,247, 1) 0%, rgba(153,153,153, .1) 30%)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
      >
        <div
          className={
            "size-[99%]  bg-transparent bg-gradient-to-br from-pprimary-60/50 to-15%"
          }
        >
          <Card className={" rounded-none border-0 bg-transparent  p-7"}>
            <CardHeader className={"justify-center"}>
              <CardTitle className={"basis-1/3 py-4 text-lg font-semibold"}>
                {data.name}
              </CardTitle>
              <CardDescription className={"text-base text-sgrey-60"}>
                {data.description}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </article>
  );
}
