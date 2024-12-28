// @flow
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { BuildingOfficeIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";
import BedIcon from "@/assets/icons/bedIcon.svg";
import BathroomIcon from "@/assets/icons/bathroomIcon.svg";
import {
  SectionCardContent,
  SectionCardDescription,
  SectionCardTitle,
  SectionCards,
} from "@/components/cards/sectionCards";
import { Link } from "react-router";

import { Property } from "../../../KV/propertyTypings";
interface props {
  data?: Property;
}

export function PropertiesCard({ data }: props) {
  data = data!;
  return (
    <SectionCards key={data.name} className={"dataCard"}>
      <SectionCards.Header className={"row-span-1"}>
        <img alt={data.name + " Property"} src={data.image} />
          <img
            alt={data.name + " Property"}
            className={"aspect-[3/2]"}
            src={data.metadata.image}
          />
        <SectionCardTitle className={"pt-4 text-2xl font-semibold"}>
          {data.name}
        </SectionCardTitle>
        <SectionCardDescription className={"text-sgrey-60 laptop:h-14"}>
          {data.description}
          <a href={"/"} className={"ml-1 text-white underline"}>
            Read More
          </a>
        <SectionCardDescription className={"text-sgrey-60"}>
            <>
              {data?.metadata.description}
              <a href={"/"} className={"ml-1 text-white underline"}>
                Read More
              </a>
            </>
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
              <>{data?.metadata.bedrooms}-Bedrooms</>
          </Badge>
          <Badge variant={"card"} className={" border-sgrey-15"}>
            <img
              alt={"Bathroom Icon"}
              src={BathroomIcon}
              className={"mr-1 size-5 2xl:size-6"}
            />
            {data.bathrooms}-Bathroom
              <> {data?.metadata.bathrooms}-Bathroom</>
          </Badge>
          <Badge variant={"card"} className={" border-sgrey-15"}>
            <BuildingOfficeIcon className={"mr-1 size-5 2xl:size-6"} />
            {data.property_type}
              <>{data?.metadata.property_type}</>
          </Badge>
        </div>

        <div className={"text-sgrey-60 laptop:basis-1/3"}>
          <p>Price</p>
          <span className={"text-xl font-semibold text-white 2xl:text-2xl"}>
            {data?.metadata.price}
          </span>
        </div>
        <div className={"grow"}>
          {data ? (
            <Button
              asChild
              className={" laptop:size-full laptop:text-base"}
              size={"responsive"}
              variant={"primary"}
            >
              <Link to={`/properties/${data?.name}`}>
                View Property Details
              </Link>
            </Button>
          ) : (
            <Skeleton variant={"button"} />
          )}
        </div>
      </SectionCardContent>
    </SectionCards>
  );
}
