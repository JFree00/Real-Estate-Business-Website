// @flow
import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Ratings } from "@/components/ratings";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Testimonial } from "../../../KV/testimonials";
import { useAsyncValue } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";

interface props {
  data?: Testimonial["metadata"];
}

export function TestimonialCards({ data }: props) {
  const promiseValue = useAsyncValue() as Testimonial | undefined;
  data = data ?? promiseValue?.metadata;
  return (
    <div className={"dataCard"}>
      <Card className={"dataCardComponent laptop:space-y-10 bg-sgrey-8"}>
        <CardHeader className={"mr-3"}>
          {data ? (
            <Ratings amountOfRatings={5} ratings={data.rating} />
          ) : (
            <Skeleton />
          )}
          <p className={"text-xl font-semibold laptop:text-2xl"}>
            {data?.title}
          </p>
          <p className={"pt-3 text-left"}>{data?.testimonial}</p>
        </CardHeader>
        <CardContent className={" flex items-center justify-start"}>
          {data?.image ? (
            <img alt={"Customer Headshot"} src={data?.image} />
          ) : (
            <UserCircleIcon className="size-16" />
          )}
          <div className={"px-2 text-xl"}>
            {data?.name}
            <br />
            <p className={"text-lg text-sgrey-60"}> {data?.location}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
