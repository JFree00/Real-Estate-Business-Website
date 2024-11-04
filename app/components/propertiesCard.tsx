// @flow
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BuildingOfficeIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";
import BedIcon from "@/assets/icons/bedIcon.svg";
import BathroomIcon from "@/assets/icons/bathroomIcon.svg";

export type PropertyProps = {
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  price: string;
  name: string;
  description: string;
  image: string;
};

export function PropertiesCard({
  bedrooms,
  image,
  propertyType,
  description,
  name,
  price,
  bathrooms,
}: PropertyProps) {
  return (
    <div className={"basis-full shrink-0 lg:shrink "}>
      <Card className={"bg-sgrey-8"}>
        <CardHeader className={" 2xl:px-6 2xl:pb-2 2xl:pt-6 "}>
          <img alt={"property Image"} src={image} />
          <CardTitle className={"font-semibold text-2xl pt-2"}>
            {name}
          </CardTitle>
          <CardDescription className={"text-sgrey-60"}>
            {description}
            <a href={"/"} className={"underline ml-1 text-white"}>
              Read More
            </a>
          </CardDescription>
        </CardHeader>

        <CardContent
          className={
            "flex flex-wrap gap-y-5 laptop:gap-y-8 justify-start gap-x-2 justify-items-stretch pt-4"
          }
        >
          <div className={"basis-full gap-2 flex flex-wrap"}>
            <Badge variant={"card"} className={" border-sgrey-15"}>
              <img
                alt={"Bed Icon"}
                src={BedIcon}
                className={"mr-1 size-3 2xl:size-6"}
              />
              {bedrooms}-Bedroom
            </Badge>
            <Badge variant={"card"} className={" border-sgrey-15"}>
              <img
                alt={"Bathroom Icon"}
                src={BathroomIcon}
                className={"mr-1 size-3 2xl:size-6"}
              />
              {bathrooms}-Bathroom
            </Badge>
            <Badge variant={"card"} className={" border-sgrey-15"}>
              <BuildingOfficeIcon className={"mr-1 size-3 2xl:size-6"} />
              {propertyType}
            </Badge>
          </div>

          <div className={"laptop:basis-1/3 text-sgrey-60"}>
            <p>Price</p>
            <span className={"text-white text-xl 2xl:text-2xl font-semibold"}>
              {price}
            </span>
          </div>
          <div className={" grow"}>
            <Button className={"bg-pprimary-60 size-full"} size={"responsive"}>
              View Property Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
