// @flow
import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { clientsProps } from "../../../KV/clients";
import { Button } from "@/components/ui/button";
import { BoltIcon, Squares2X2Icon } from "@heroicons/react/24/outline";

interface Props {
  data?: clientsProps;
}

export function ClientsCard({ data }: Props) {
  return (
    <div className={"dataCard rounded-xl outline outline-8 outline-sgrey-10 "}>
      <Card
        className={
          "dataCardComponent mx-auto  border border-sgrey-15 bg-sgrey-8"
        }
      >
        <CardHeader className={"relative flex flex-col"}>
          <p className={"text-sgrey-60"}>Since {data?.startYear}</p>
          <p className={"pb-4 text-xl font-semibold"}>{data?.name}</p>
          <Button
            className={" h-14 bg-sgrey-10 laptop:absolute laptop:right-0"}
          >
            Visit Website
          </Button>
          <div
            className={
              "flex flex-row flex-nowrap gap-x-6 divide-x divide-sgrey-15 pt-7 laptop:divide-x-0"
            }
          >
            <div
              className={
                " shrink-0 basis-1/4 laptop:basis-1/2 laptop:border-r laptop:border-r-sgrey-15"
              }
            >
              <div className={"flex pb-1"}>
                <Squares2X2Icon className={"mr-1 size-5 stroke-sgrey-60"} />
                <p className={"text-sgrey-60"}>Domain</p>
              </div>

              <p>{data?.Domain}</p>
            </div>

            <div className={"mx-10 basis-2/4 laptop:mx-0 laptop:basis-1/2"}>
              <div className={"pl-5"}>
                <div className={"flex pb-1"}>
                  <BoltIcon className={"mr-1 size-5 stroke-sgrey-60"} />
                  <p className={"text-sgrey-60"}>Category</p>
                </div>

                <p>{data?.Category}</p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent
          className={
            "dataCardComponent mt-7 rounded-xl border border-sgrey-15 pt-2"
          }
        >
          <p className={"py-4 text-sgrey-60"}>What They Said 🤗</p>
          <p>{data?.Testimonial}</p>
        </CardContent>
      </Card>
    </div>
  );
}
