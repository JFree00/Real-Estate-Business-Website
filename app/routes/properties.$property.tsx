// @flow
import * as React from "react";
import { Route } from "./+types/properties.$property";
import { Await, isRouteErrorResponse, Link, useRouteError } from "react-router";
import { SectionDesignation } from "@/components/Designations/sectionDesignation";
import { SectionHeader } from "@/components/Designations/sectionHeader";
import { SectionDescription } from "@/components/Designations/sectionDescription";
import { Badge } from "@/components/ui/badge";
import {
  LockClosedIcon,
  MapPinIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import {
  SectionCardContent,
  SectionCardDescription,
  SectionCardHeader,
  SectionCards,
  SectionCardTitle,
} from "@/components/cards/sectionCards";
import { SectionContent } from "@/components/Designations/sectionContent";
import { Property } from "../../KV/propertyTypings";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BoltIcon,
} from "@heroicons/react/24/solid";
import { cn } from "@/lib/styles";
import { Separator } from "@/components/ui/separator";
import BedIcon from "@/assets/icons/bedIcon.svg?react";
import BathroomIcon from "@/assets/icons/bathroomIcon.svg?react";
import AreaIcon from "@/assets/icons/areaIcon.svg?react";
import { SubmitForm, submitInfoProps } from "@/components/cards/submitForm";

export const loader = async ({ context, params }: Route.LoaderArgs) => {
  const { properties, images, bucket } = context.env;
  const propertyData = await properties.get(params.property).catch(() => {
    throw new Response(`Something went wrong`, { status: 502 });
  });

  if (!propertyData) {
    throw new Response(`Property not found`, { status: 404 });
  }
  const property = JSON.parse(propertyData) as Property;
  const previewImages = await images.get(property.previewImages);
  const propertyImages = previewImages
    ? (JSON.parse(previewImages) as string[])
    : [];
  propertyImages.push(property.metadata.image);
  const previews = propertyImages.map(async (image) => {
    try {
      return await bucket
        .get(image)
        .then((response) => (response ? response.blob() : null));
    } catch (error) {
      console.error(error);
      return null;
    }
  });
  return { property, images: previews };
};
export default function NestedProperty({ loaderData }: Route.ComponentProps) {
  const { property, images } = loaderData;
  const [selectedImage, setSelectedImage] = React.useState(0);

  const submitData: submitInfoProps[] = [
    {
      name: "First Name",
      type: "text",
      placeholder: "Enter First Name",
    },
    {
      name: "Last Name",
      type: "text",
      placeholder: "Enter Last Name",
    },
    {
      name: "Email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "Phone Number",
      type: "tel",
      placeholder: "Enter your phone number",
    },
    {
      name: "Selected Property",
      type: "dropdown",
      placeholder: "Which property are you interested in?",
      data: [property.name],
    },
    {
      name: "Message",
      type: "textArea",
      placeholder: "Enter your message here...",
    },
  ];
  return (
    <main>
      <div className={" relative grid grid-cols-12"}>
        <SectionDesignation>
          <SectionHeader icon={false}>{property.name}</SectionHeader>
          <SectionDescription>
            <div className={"flex flex-nowrap items-center gap-x-5"}>
              <Badge
                variant={"outline"}
                className={
                  "gap-x-1 rounded-md p-2 text-sm font-medium text-white"
                }
              >
                <MapPinIcon className={"size-5"} />
                {property.metadata.location}
              </Badge>
              <div className={" text-sm capitalize laptop:justify-self-end"}>
                <span className={"sr-only"}>price</span>
                <span
                  className={
                    "pl-2.5 text-start text-lg font-semibold text-white before:pr-2 before:text-sm before:font-medium before:text-sgrey-60 before:content-['Price']"
                  }
                >
                  {property.metadata.price}
                </span>
              </div>
            </div>
          </SectionDescription>
          <SectionContent iterate={false}>
            <SectionCards className={"row-span-3 size-full bg-sgrey-10"}>
              <SectionCards.Header
                className={
                  "order-2 mb-2.5 rounded-xl border border-sgrey-15 bg-sgrey-8 p-4"
                }
              >
                <ToggleGroup
                  className={" h-8 justify-start laptop:h-24"}
                  type={"single"}
                  onValueChange={(value) => {
                    if (value && typeof value === "number") {
                      setSelectedImage(value);
                    }
                  }}
                >
                  {images.map((image, index) => {
                    return (
                      <ToggleGroupItem
                        key={index}
                        value={index.toString()}
                        className={
                          "h-12 w-20 brightness-50 transition-all data-[state=on]:h-14 data-[state=on]:w-24 data-[state=on]:brightness-100"
                        }
                      >
                        <Suspense fallback={<div />}>
                          <Await resolve={image as Promise<Blob | null>}>
                            {(promiseData) => {
                              console.log(promiseData);
                              return (
                                promiseData && (
                                  <img
                                    key={index}
                                    alt={""}
                                    className={"size-full rounded-lg"}
                                    src={URL.createObjectURL(promiseData)}
                                  />
                                )
                              );
                            }}
                          </Await>
                        </Suspense>
                      </ToggleGroupItem>
                    );
                  })}
                </ToggleGroup>
              </SectionCards.Header>
              <SectionCards.Header className={"max-h-[1000px]"}>
                <div className={"flex justify-between gap-x-8"}>
                  <img
                    alt={""}
                    className={"min-h-0 min-w-0 grow"}
                    src={property.metadata.image}
                  />
                  <img
                    alt={""}
                    className={"hidden min-h-0 min-w-0 grow laptop:block"}
                    src={property.metadata.image}
                  />
                </div>
              </SectionCards.Header>
              <SectionCards.Content
                className={
                  "order-3 flex h-16 w-full items-center justify-between rounded-full  border border-sgrey-15 bg-sgrey-8 p-2"
                }
              >
                <Button
                  className={
                    "order-first size-11 rounded-full border border-sgrey-15 p-0"
                  }
                >
                  <ArrowLeftIcon className={"size-6 stroke-sgrey-50"} />
                </Button>
                <div className={"flex items-center justify-between gap-x-1"}>
                  <Suspense fallback={<div />}>
                    <Await resolve={images}>
                      {(promiseData) => {
                        return promiseData?.map((_image, index) => {
                          return (
                            <Button
                              key={index}
                              variant={"primary"}
                              className={cn(
                                "h-px py-[1.4px] px-1.5",
                                index === selectedImage
                                  ? "bg-pprimary-60"
                                  : "bg-sgrey-30",
                              )}
                            ></Button>
                          );
                        });
                      }}
                    </Await>
                  </Suspense>
                </div>

                <Button
                  className={
                    "order-last size-11 rounded-full border border-sgrey-15 p-0"
                  }
                >
                  <ArrowRightIcon className={"size-6 stroke-sgrey-50"} />
                </Button>
              </SectionCards.Content>
            </SectionCards>
          </SectionContent>
        </SectionDesignation>
        <SectionDesignation className={"py-0"}>
          <SectionContent className={"mt-5 flex"}>
            <SectionCards className={"gap-y-5"}>
              <SectionCardHeader>
                <SectionCardTitle>Description</SectionCardTitle>
                <SectionCardDescription>
                  Discover your own piece of paradise with the Seaside Serenity
                  Villa. T With an open floor plan, breathtaking ocean views
                  from every room, and direct access to a pristine sandy beach,
                  this property is the epitome of coastal living.
                </SectionCardDescription>
              </SectionCardHeader>
              <Separator className={"h-px"} />
              <SectionCardContent className={"grid grid-cols-2 gap-y-5"}>
                <div>
                  <span className={"inline-flex w-full gap-x-1 text-sgrey-60"}>
                    <BedIcon className={" size-5 fill-sgrey-60"} />
                    <h2 className={"text-sm"}>Bedrooms</h2>
                  </span>
                  <p className={"text-lg"}>0{property.metadata.bedrooms}</p>
                </div>
                <div className={"border-l border-sgrey-15 pl-5"}>
                  <span className={"inline-flex w-full gap-x-1 text-sgrey-60"}>
                    <BathroomIcon className={"size-5 fill-sgrey-60"} />
                    <h2 className={"inline-block text-sm"}>Bathrooms</h2>
                  </span>
                  <p className={"text-lg"}>0{property.metadata.bathrooms}</p>
                </div>
                <Separator className={"col-span-2 h-px"} />
                <div className={"col-span-2"}>
                  <span className={"inline-flex w-full gap-x-1 text-sgrey-60"}>
                    <AreaIcon className={"size-5 fill-sgrey-60"} />
                    <h2 className={"text-sm"}>Area</h2>
                  </span>
                  <p className={"text-lg"}>
                    {new Intl.NumberFormat().format(
                      property.metadata.size as number,
                    )}{" "}
                    Square Feet
                  </p>
                </div>
              </SectionCardContent>
            </SectionCards>
          </SectionContent>
        </SectionDesignation>
        <SectionDesignation className={"py-0"}>
          <SectionContent className={"mt-5"}>
            <SectionCards>
              <SectionCards.Header className={"space-y-5"}>
                <SectionCardTitle>Key Features and Amenities</SectionCardTitle>
                {property.features.map((feature, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        "inline-grid w-full grid-cols-12 items-center gap-x-2.5 border-l border-l-pprimary-60 bg-sgrey-10 p-2.5 *:shrink-0"
                      }
                    >
                      {feature.type === "security" ? (
                        <LockClosedIcon className={"size-4"} />
                      ) : feature.type === "location" ? (
                        <MapPinIcon className={"size-4"} />
                      ) : feature.type === "amenity" ? (
                        <BoltIcon className={"size-4"} />
                      ) : feature.type === "luxury" ? (
                        <StarIcon className={"size-4"} />
                      ) : null}

                      <p className={"col-span-11 text-sm text-sgrey-60"}>
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </SectionCards.Header>
            </SectionCards>
          </SectionContent>
        </SectionDesignation>
        <SectionDesignation className={"py-10"}>
          <SectionHeader>Inquire About Seaside Serenity Villa</SectionHeader>
          <SectionDescription>
            Interested in this property? Fill out the form below, and our real
            estate experts will get back to you with more details, including
            scheduling a viewing and answering any questions you may have.
          </SectionDescription>
          <SectionContent>
            <SubmitForm inputData={submitData} />
          </SectionContent>
        </SectionDesignation>
      </div>
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <div
          className={
            "mx-auto flex min-h-[25vw] flex-col gap-y-10 pt-20 text-center capitalize"
          }
        >
          <div>
            <h2 className={"text-8xl font-bold"}>{error.status}</h2>
            <h2 className={"text-5xl font-bold"}>{error.data}</h2>
          </div>
          <Link to={"/properties"} className={"underline"}>
            back to properties
          </Link>
        </div>
      </div>
    );
  }
  return <div>Something went wrong!</div>;
}
