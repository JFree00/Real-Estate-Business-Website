// @flow
import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Ratings } from "@/components/ratings";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { testimonialProps } from "../../../KV/testimonials";

interface props {
  data?: testimonialProps;
}

export function TestimonialCards({ data }: props) {
  data = data!;
  console.log(data);
  return (
    <div className={"dataCard"}>
      <Card className={"bg-sgrey-8 dataCardComponent"}>
        <CardHeader className={"mr-3"}>
          <Ratings amountOfRatings={5} ratings={data.rating} />
          <p className={"text-xl laptop:text-2xl font-semibold"}>
            {data.title}
          </p>
          <p className={"pt-3 text-left min-h-32 max-h-32"}>
            {data.testimonial}
          </p>
        </CardHeader>
        <CardContent className={"flex justify-start items-center mt-5"}>
          {data.image ? (
            <img alt={"Customer Headshot"} src={data.image} />
          ) : (
            <UserCircleIcon className="size-16" />
          )}
          <div className={"px-2 text-xl"}>
            {data.name}
            <br />
            <p className={"text-sgrey-60 text-lg"}> {data.location}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
