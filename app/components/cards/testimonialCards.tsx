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
  return (
    <div className={"dataCard"}>
      <Card className={"dataCardComponent bg-sgrey-8"}>
        <CardHeader className={"mr-3"}>
          <Ratings amountOfRatings={5} ratings={data.rating} />
          <p className={"text-xl font-semibold laptop:text-2xl"}>
            {data.title}
          </p>
          <p className={"max-h-32 min-h-32 pt-3 text-left"}>
            {data.testimonial}
          </p>
        </CardHeader>
        <CardContent className={"mt-5 flex items-center justify-start"}>
          {data.image ? (
            <img alt={"Customer Headshot"} src={data.image} />
          ) : (
            <UserCircleIcon className="size-16" />
          )}
          <div className={"px-2 text-xl"}>
            {data.name}
            <br />
            <p className={"text-lg text-sgrey-60"}> {data.location}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
