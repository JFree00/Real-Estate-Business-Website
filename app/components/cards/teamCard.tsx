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

interface props {
  data?: teamProps;
}

export function TeamCard({ data }: props) {
  data = data!;
  return (
    <Card className={"rounded-xl border border-sgrey-15 bg-sgrey-8 p-8"}>
      <div className={"relative flex justify-center"}>
        <img alt={"sarah johnson"} src={data.image} />
        <div
          className={"absolute inset-x-0 -bottom-5 flex justify-center"}
        >
          <Button
            size={"icon"}
            className={"h-10 w-[18%] rounded-3xl bg-pprimary-60"}
          >
            <img alt={"twitter"} src={twitter} />
          </Button>
        </div>
      </div>
      <CardHeader
        className={
          "gap-y-1 pb-5 pt-10 text-center text-lg font-semibold  laptop:gap-y-0 laptop:pt-8"
        }
      >
        <CardTitle className={"laptop:text-xl"}>{data.name}</CardTitle>
        <CardDescription className={" font-medium text-sgrey-60"}>
          {data.role}
        </CardDescription>
      </CardHeader>
      <CardContent className={"mt-0"}>
        <div
          className={
            "flex h-16 basis-full rounded-full border border-sgrey-15 bg-sgrey-10 px-2 laptop:h-12"
          }
        >
          <input
            className={"w-full basis-full bg-transparent px-6 focus:outline-0"}
            placeholder={"Say hello 👋"}
          />
          <Button
            size={"icon"}
            className={
              "my-auto  size-12 shrink-0 grow-0 rounded-full bg-pprimary-60 "
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
