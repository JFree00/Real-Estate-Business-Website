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
import { Link, useAsyncValue } from "react-router";
import { Property } from "../../../KV/propertyTypings";
import { Skeleton } from "@/components/ui/skeleton";
interface props {
  data?: Property;
}

export function PropertiesCard({ data }: props) {
  data = data!;
  return (
    <SectionCards key={data.name} className={"dataCard"}>
      <SectionCards.Header className={"row-span-1"}>
        {data ? (
          <img
            alt={data.name + " Property"}
            className={"aspect-[3/2]"}
            src={data.metadata.image}
          />
        ) : (
          <Skeleton variant={"image"} />
        )}
        <SectionCardTitle className={"pt-4 text-2xl font-semibold"}>
          {data.name}
        </SectionCardTitle>
        <SectionCardDescription className={"text-sgrey-60"}>
          {data ? (
            <>
              {data?.metadata.description}
              <a href={"/"} className={"ml-1 text-white underline"}>
                Read More
              </a>
            </>
          ) : (
            <Skeleton variant={"paragraph"} />
          )}
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
            {data ? (
              <>{data?.metadata.bedrooms}-Bedrooms</>
            ) : (
              <Skeleton variant={"badge"} />
            )}
          </Badge>
          <Badge variant={"card"} className={" border-sgrey-15"}>
            <img
              alt={"Bathroom Icon"}
              src={BathroomIcon}
              className={"mr-1 size-5 2xl:size-6"}
            />
            {data ? (
              <> {data?.metadata.bathrooms}-Bathroom</>
            ) : (
              <Skeleton variant={"badge"} />
            )}
          </Badge>
          <Badge variant={"card"} className={" border-sgrey-15"}>
            <BuildingOfficeIcon className={"mr-1 size-5 2xl:size-6"} />
            {data ? (
              <>{data?.metadata.property_type}</>
            ) : (
              <Skeleton variant={"badge"} className={"min-w-[3rem]"} />
            )}
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
