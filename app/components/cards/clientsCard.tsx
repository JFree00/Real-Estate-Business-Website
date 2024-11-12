// @flow
import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { clientsProps } from "../../../KV/clients";
import { Button } from "@/components/ui/button";
import { BoltIcon, Squares2X2Icon } from "@heroicons/react/24/outline";

type Props = {
  data?: clientsProps;
};

export function ClientsCard({ data }: Props) {
  return (
    <div className={"dataCard outline outline-8 outline-sgrey-10 rounded-xl"}>
      <Card
        className={
          "border border-sgrey-15 outline-sgrey-10 dataCardComponent bg-sgrey-8"
        }
      >
        <CardHeader className={"flex flex-col"}>
          <text className={"text-sgrey-60"}>Since {data?.startYear}</text>
          <p className={"text-xl font-semibold pb-4"}>{data?.name}</p>
          <Button className={" bg-sgrey-10 h-14"}>Visit Website</Button>
          <div
            className={
              "flex flex-row flex-nowrap gap-x-6 divide-x divide-sgrey-15 pt-7"
            }
          >
            <div className={" basis-1/4 shrink-0 "}>
              <div className={"flex pb-1"}>
                <Squares2X2Icon className={"size-5 stroke-sgrey-60 mr-1"} />
                <p className={"text-sgrey-60"}>Domain</p>
              </div>

              <p>{data?.Domain}</p>
            </div>

            <div className={"basis-2/4 mx-10"}>
              <div className={"pl-5"}>
                <div className={"flex pb-1"}>
                  <BoltIcon className={"size-5 stroke-sgrey-60 mr-1"} />
                  <p className={"text-sgrey-60"}>Category</p>
                </div>

                <p>{data?.Category}</p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent
          className={
            "border border-sgrey-15 rounded-xl mt-7 dataCardComponent pt-2"
          }
        >
          <p className={"text-sgrey-60 py-4"}>What They Said 🤗</p>
          <p>{data?.Testimonial}</p>
        </CardContent>
      </Card>
    </div>
  );
}
