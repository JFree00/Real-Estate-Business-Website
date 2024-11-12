// @flow
import * as React from "react";
import { Button } from "@/components/ui/button";
import twitter from "@/assets/icons/twitter.svg";
import paperAirplane from "@/assets/icons/paperAirplane.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { teamProps } from "../../../KV/team";

type props = {
  data?: teamProps;
};

export function TeamCard({ data }: props) {
  data = data as teamProps;
  return (
    <Card className={"border rounded-xl border-sgrey-15 bg-sgrey-8 p-8"}>
      <div className={"relative flex justify-center"}>
        <img alt={"sarah johnson"} src={data.image} />
        <div
          className={"absolute -bottom-5 left-0 right-0 flex justify-center"}
        >
          <Button
            size={"icon"}
            className={"bg-pprimary-60 w-[18%] h-10 rounded-3xl"}
          >
            <img alt={"twitter"} src={twitter} />
          </Button>
        </div>
      </div>
      <CardHeader
        className={
          "text-center gap-y-1 laptop:gap-y-0 pt-10 laptop:pt-8 pb-5  text-lg font-semibold"
        }
      >
        <CardTitle className={"laptop:text-xl"}>{data.name}</CardTitle>
        <CardDescription className={" text-sgrey-60 font-medium"}>
          {data.role}
        </CardDescription>
      </CardHeader>
      <CardContent className={"mt-0"}>
        <div
          className={
            "h-16 laptop:h-12 rounded-full basis-full border border-sgrey-15 bg-sgrey-10 flex px-2"
          }
        >
          <input
            className={"bg-transparent w-full basis-full px-6 focus:outline-0"}
            placeholder={"Say hello 👋"}
          />
          <Button
            size={"icon"}
            className={
              "size-12  grow-0 shrink-0 rounded-full bg-pprimary-60 my-auto "
            }
          >
            <img
              alt={"paper airplane icon"}
              className={""}
              src={paperAirplane}
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
