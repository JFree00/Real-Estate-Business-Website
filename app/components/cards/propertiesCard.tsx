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

export type propertyProps = {
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  price: string;
  name: string;
  description: string;
  image: string;
};
type props = {
  data?: propertyProps;
};

export function PropertiesCard({ data }: props) {
  data = data as propertyProps;
  return (
    <div key={data.name} className={"dataCard"}>
      <Card className={"bg-sgrey-8 dataCardComponent"}>
        <CardHeader className={""}>
          <img alt={"property Image"} src={data.image} />
          <CardTitle className={"font-semibold text-2xl pt-4"}>
            {data.name}
          </CardTitle>
          <CardDescription className={"text-sgrey-60"}>
            {data.description}
            <a href={"/"} className={"underline ml-1 text-white"}>
              Read More
            </a>
          </CardDescription>
        </CardHeader>

        <CardContent
          className={
            "flex flex-wrap gap-y-5 laptop:gap-y-8 gap-x-3 justify-start justify-items-stretch pt-4"
          }
        >
          <div className={"basis-full gap-1.5 laptop:gap-2 flex flex-wrap"}>
            <Badge variant={"card"} className={" border-sgrey-15"}>
              <img
                alt={"Bed Icon"}
                src={BedIcon}
                className={"mr-1 size-5 2xl:size-6"}
              />
              {data.bedrooms}-Bedroom
            </Badge>
            <Badge variant={"card"} className={" border-sgrey-15"}>
              <img
                alt={"Bathroom Icon"}
                src={BathroomIcon}
                className={"mr-1 size-5 2xl:size-6"}
              />
              {data.bathrooms}-Bathroom
            </Badge>
            <Badge variant={"card"} className={" border-sgrey-15"}>
              <BuildingOfficeIcon className={"mr-1 size-5 2xl:size-6"} />
              {data.propertyType}
            </Badge>
          </div>

          <div className={"laptop:basis-1/3 text-sgrey-60"}>
            <p>Price</p>
            <span className={"text-white text-xl 2xl:text-2xl font-semibold"}>
              {data.price}
            </span>
          </div>
          <div className={" grow"}>
            <Button
              className={"bg-pprimary-60 laptop:h-full laptop:w-full"}
              size={"responsive"}
            >
              View Property Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}