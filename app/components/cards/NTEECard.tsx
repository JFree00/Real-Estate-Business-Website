// @flow
import * as React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { stepsProps } from "../../../KV/steps";

type props = {
  data?: stepsProps;
};

export function NteeCard({ data }: props) {
  data = data as stepsProps;
  console.log(data);
  return (
    <div>
      <div className={"border-l border-l-pprimary-60 h-16 flex items-center"}>
        <p className={"font-medium text-base px-7"}>Step 0{data.step}</p>
      </div>
      <div
        className={" w-full  border rounded-full border-transparent"}
        style={{
          padding: "1px, 1px, 1px, 1px",
          backgroundImage:
            "linear-gradient(#141414, #141414), linear-gradient(150deg, rgba(112,59,247, 1) 0%, rgba(153,153,153, .1) 30%)",
          borderRadius: "0 10px 10px 10px ",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
      >
        <Card className={" bg-transparent rounded-none border-0  p-7"}>
          <CardHeader className={"justify-center"}>
            <CardTitle className={"basis-1/3 font-semibold text-lg"}>
              {data.name}
            </CardTitle>
            <CardDescription className={"text-base text-sgrey-60"}>
              {data.description}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
