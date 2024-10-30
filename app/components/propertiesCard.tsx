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
import BedIcon from "@/assets/icons/bedIcon.svg?react";
import BathroomIcon from "@/assets/icons/BathroomIcon.svg?react";

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
    <div className={"col-span-2 row-span-2"}>
      <Card className={"size-fit bg-sgrey-8"}>
        <CardHeader className={"m-0 2xl:m-4 "}>
          <img alt={"property Image"} src={image} />
          <CardTitle className={"font-semibold text-2xl pt-5"}>
            {name}
          </CardTitle>
          <CardDescription className={"text-sgrey-60"}>
            {description}
            <a href={"/"} className={"underline ml-1 text-white"}>
              Read More
            </a>
          </CardDescription>
        </CardHeader>
        <div className={"mx-auto"}>
          <CardContent
            className={
              "flex flex-wrap gap-y-10 justify-start m-0 2xl:m-4 gap-x-2 justify-items-stretch"
            }
          >
            <Badge variant={"card"} className={" border-sgrey-15"}>
              <BedIcon className={"mr-1 size-3 2xl:size-6"} />
              {bedrooms}-Bedroom
            </Badge>
            <Badge variant={"card"} className={" border-sgrey-15"}>
              <BathroomIcon className={"mr-1 size-3 2xl:size-6"} />
              {bathrooms}-Bathroom
            </Badge>
            <Badge variant={"card"} className={" border-sgrey-15"}>
              <BuildingOfficeIcon className={"mr-1 size-3 2xl:size-6"} />
              {propertyType}
            </Badge>
            <div className={"basis-1/3 text-sgrey-60"}>
              <p>Price</p>
              <span className={"text-white text-xl 2xl:text-2xl font-semibold"}>
                {price}
              </span>
            </div>
            <div className={" grow"}>
              <Button className={"bg-pprimary-60 size-full"}>
                View Property Details
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
