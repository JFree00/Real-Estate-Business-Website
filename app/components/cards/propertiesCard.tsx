// @flow
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { BuildingOfficeIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";
import BedIcon from "@/assets/icons/bedIcon.svg";
import BathroomIcon from "@/assets/icons/bathroomIcon.svg";
import { propertyProps } from "../../../KV/properties";
import {
  SectionCardContent,
  SectionCardDescription,
  SectionCardTitle,
  SectionCards,
} from "@/components/cards/sectionCards";
import { Link } from "react-router";

interface props {
  data?: propertyProps;
}

export function PropertiesCard({ data }: props) {
  data = data!;
  return (
    <SectionCards key={data.name} className={"dataCard"}>
      <SectionCards.Header className={"row-span-1"}>
        <img alt={data.name + " Property"} src={data.image} />
        <SectionCardTitle className={"pt-4 text-2xl font-semibold"}>
          {data.name}
        </SectionCardTitle>
        <SectionCardDescription className={"text-sgrey-60 laptop:h-14"}>
          {data.description}
          <a href={"/"} className={"ml-1 text-white underline"}>
            Read More
          </a>
        </SectionCardDescription>
      </SectionCards.Header>

      <SectionCardContent
        className={
          "flex flex-wrap justify-start justify-items-stretch gap-x-3 gap-y-5 pt-4 laptop:gap-y-8"
        }
      >
        <div className={"flex basis-full flex-wrap gap-1.5 laptop:gap-2"}>
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
            {data.property_type}
          </Badge>
        </div>

        <div className={"text-sgrey-60 laptop:basis-1/3"}>
          <p>Price</p>
          <span className={"text-xl font-semibold text-white 2xl:text-2xl"}>
            {data.price}
          </span>
        </div>
        <div className={"grow"}>
          <Button
            className={
              "bg-pprimary-60 laptop:size-full laptop:text-base"
            }
            size={"responsive"}
          >
            View Property Details
          </Button>
        </div>
      </SectionCardContent>
    </SectionCards>
  );
}
