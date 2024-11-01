// @flow
import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Ratings } from "@/components/ratings";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export type testimonialProps = {
  name: string;
  location: string;
  title: string;
  testimonial: string;
  image?: string;
  rating: number;
};

export function TestimonialCards({
  name,
  testimonial,
  rating,
  image = undefined,
  location,
  title,
}: testimonialProps) {
  return (
    <div className={"col-span-2 row-span-2"}>
      <Card className={"bg-sgrey-8 px-6 "}>
        <CardHeader className={"mr-3"}>
          <Ratings amountOfRatings={5} ratings={rating} />
          <p className={"text-2xl font-semibold"}>{title}</p>
          <p className={"pt-3 text-left min-h-32 max-h-32"}>{testimonial}</p>
        </CardHeader>
        <CardContent className={"flex justify-start items-center my-9"}>
          {image ? (
            <img alt={"Customer Headshot"} src={image} />
          ) : (
            <UserCircleIcon className="size-16" />
          )}
          <div className={"px-2 text-xl"}>
            {name}
            <br />
            <p className={"text-sgrey-60 text-lg"}> {location}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
