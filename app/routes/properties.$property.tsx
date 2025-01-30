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
import { Property } from "../../data/propertyTypings";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MouseEvent, Suspense } from "react";
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { faqCards } from "../../data/faq";

const format: Intl.NumberFormatOptions = {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
};

type dataComponentProps = {
  data: number | null;
  name: string;
} & React.ComponentPropsWithoutRef<"div">;

export function DataComponent({
  data,
  name,
  children,
  className,
  ...props
}: dataComponentProps) {
  return (
    <div className={" border-t-sgrey-15 border-t pt-5"} {...props}>
      <SectionCardDescription className={"col-span-full basis-full py-2.5"}>
        {name}
      </SectionCardDescription>
      <div className={"flex flex-nowrap gap-x-5 items-center"}>
        <SectionCardHeader className={" text-lg"}>
          {typeof data === "number"
            ? Intl.NumberFormat(undefined, format).format(data)
            : children
              ? "Varies"
              : "Varies based on terms and interest rate"}
        </SectionCardHeader>
        {children && (
          <div className={"col-span-6"}>
            <SectionCards
              className={cn(
                " p-2.5 bg-sgrey-10  rounded-lg block h-auto w-fit",
                className,
              )}
            >
              <SectionCardDescription className={"w-auto"}>
                {children}
              </SectionCardDescription>
            </SectionCards>
          </div>
        )}
      </div>
    </div>
  );
}
export const loader = async ({ context, params }: Route.LoaderArgs) => {
  const { properties, images } = context.env;
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
  return { property, images: propertyImages.reverse() };
};
export default function NestedProperty({ loaderData }: Route.ComponentProps) {
  const { property, images } = loaderData;
  const [selectedImage, setSelectedImage] = React.useState(0);
  const submitData: submitInfoProps[] = [
    {
      name: "First Name",
      type: "text",
      placeholder: "Enter First Name",
      className: "laptop:col-span-2",
    },
    {
      name: "Last Name",
      type: "text",
      placeholder: "Enter Last Name",
      className: "laptop:col-span-2",
    },
    {
      name: "Email",
      type: "email",
      placeholder: "Enter your email",
      className: "laptop:col-span-2",
    },
    {
      name: "Phone Number",
      type: "tel",
      placeholder: "Enter your phone number",
      className: "laptop:col-span-2",
    },
    {
      name: "Selected Property",
      type: "dropdown",
      placeholder: "Which property are you interested in?",
      data: [property.name],
      className: "laptop:col-span-full",
    },
    {
      name: "Message",
      type: "textArea",
      placeholder: "Enter your message here...",
      className: "laptop:col-span-full",
    },
  ];
  const changeImage = (e: MouseEvent, index: number) => {
    e.currentTarget.scrollIntoView({
      inline: "nearest",
      behavior: "smooth",
      block: "nearest",
    });
    setSelectedImage(index);
    console.log(selectedImage);
    console.log(images);
  };
  return (
    <main>
      <div className={" relative grid grid-cols-12"}>
        <SectionDesignation>
          <div
            className={
              "contents laptop:flex col-span-full *:shrink-0 gap-x-5 items-center"
            }
          >
            <SectionHeader icon={false} className={"shrink-0"}>
              {property.name}
            </SectionHeader>
            <div
              className={
                "col-span-full flex flex-nowrap items-center gap-x-5 laptop:contents"
              }
            >
              <Badge
                variant={"outline"}
                className={
                  "gap-x-1 rounded-md p-2 text-sm font-medium text-white"
                }
              >
                <MapPinIcon className={"size-5"} />
                {property.metadata.location}
              </Badge>
              <div className={"grow"} />
              <div className={"text-sm capitalize laptop:justify-self-end"}>
                <span
                  className={
                    "sr-only laptop:not-sr-only text-sm font-medium text-sgrey-60"
                  }
                >
                  price
                </span>
                <br className={"hidden laptop:block"} />
                <span
                  className={
                    "pl-2.5 laptop:pl-0 text-start text-lg laptop:text-xl font-semibold text-white before:pr-2 laptop:before:pr-0 before:text-sm before:font-medium before:text-sgrey-60 before:content-['Price'] laptop:before:content-['']"
                  }
                >
                  {property.metadata.price}
                </span>
              </div>
            </div>
          </div>
          <SectionContent iterate={false} className={""}>
            <div
              className={
                "row-span-3 size-full bg-sgrey-10 flex flex-col justify-center items-center rounded-xl p-5 gap-y-5 border border-sgrey-15"
              }
            >
              <ScrollArea
                className={
                  " mb-2.5 rounded-xl border border-sgrey-15 bg-sgrey-8 order-2 laptop:order-first laptop:pb-2 pl-1 w-full"
                }
              >
                <ToggleGroup
                  className={
                    " justify-start scroll-px-10 gap-0 h-[70px] laptop:h-[100px]"
                  }
                  type={"single"}
                  onValueChange={(value) => {
                    if (value && typeof value === "number") {
                      setSelectedImage(value);
                    }
                  }}
                  value={selectedImage.toString()}
                >
                  {images.map((image, index) => {
                    return (
                      <Suspense key={index} fallback={<div />}>
                        <Await resolve={image}>
                          {(promiseData) => {
                            return promiseData ? (
                              <ToggleGroupItem
                                value={index.toString()}
                                className={
                                  "px-1 rounded-xl shrink-0 snap-start h-12 laptop:h-[74px] w-20 laptop:w-[122px] brightness-50 transition-all data-[state=on]:h-14 laptop:data-[state=on]:h-20 data-[state=on]:w-24 laptop:data-[state=on]:w-36 data-[state=on]:brightness-100 scroll-mx-10"
                                }
                                onClick={(e) => changeImage(e, index)}
                              >
                                <img
                                  key={index}
                                  alt={""}
                                  className={"size-full rounded-lg  "}
                                  src={`../assets/${image}?size=s`}
                                />
                              </ToggleGroupItem>
                            ) : null;
                          }}
                        </Await>
                      </Suspense>
                    );
                  })}
                </ToggleGroup>
                <ScrollBar orientation={"horizontal"} className={""} />
              </ScrollArea>
              <SectionCards.Header className={" w-full"}>
                <div className={"flex gap-x-8"}>
                  <picture className={"grow aspect-[3/2]"}>
                    <source
                      rel={"preload"}
                      srcSet={`../assets/${images[selectedImage]}?size=medium`}
                      media={"(min-width: 1245px)"}
                    />
                    <source
                      rel={"preload"}
                      srcSet={`../assets/${images[selectedImage]}?size=large`}
                      media={"(min-width: 700px)"}
                    />
                    <img
                      rel={"preload"}
                      alt={""}
                      src={`../assets/${images[selectedImage]}`}
                      className={" aspect-[3/2] rounded-xl"}
                    />
                  </picture>
                  <picture className={"hidden laptop:block grow aspect-[3/2]"}>
                    <source
                      rel={"preload"}
                      srcSet={`../assets/${images[selectedImage + 1] ?? images[0]}?size=medium`}
                      media={"(min-width: 1245px)"}
                    />
                    <source
                      rel={"preload"}
                      srcSet={`../assets/${images[selectedImage + 1] ?? images[0]}?size=large`}
                      media={"(min-width: 0px)"}
                    />
                    <img
                      rel={"preload"}
                      alt={""}
                      src={`../assets/${images[selectedImage + 1] ?? images[0]}`}
                      onError={(e) => {
                        console.log("errror");
                        e.currentTarget.onerror = null;
                      }}
                      className={" aspect-[3/2] rounded-xl"}
                    />
                  </picture>
                </div>
              </SectionCards.Header>
              <SectionCards.Content
                className={
                  "order-3 flex h-16 w-full laptop:w-1/4 items-center justify-between rounded-full  border border-sgrey-15 bg-sgrey-8 p-2"
                }
              >
                <Button
                  className={
                    "order-first size-11 shrink-0 rounded-full border border-sgrey-15 p-0"
                  }
                  onClick={() =>
                    setSelectedImage(
                      selectedImage !== 0
                        ? selectedImage - 1
                        : images.length - 1,
                    )
                  }
                >
                  <ArrowLeftIcon className={"size-6 stroke-sgrey-50"} />
                </Button>
                <div
                  className={
                    "flex items-center justify-between gap-x-1 px-5 shrink grow-0"
                  }
                >
                  <Suspense fallback={<div />}>
                    <Await resolve={images}>
                      {(promiseData) => {
                        return promiseData?.map((_image, index) => {
                          return (
                            <Button
                              key={index}
                              variant={"primary"}
                              className={cn(
                                "h-px py-[1.4px] px-1.5  transition",
                                index === selectedImage
                                  ? "bg-pprimary-60"
                                  : index === selectedImage + 1
                                    ? "bg-pprimary-60/70"
                                    : "bg-sgrey-30",
                              )}
                              onClick={(e) => changeImage(e, index)}
                            ></Button>
                          );
                        });
                      }}
                    </Await>
                  </Suspense>
                </div>

                <Button
                  className={
                    "order-last size-11 rounded-full border shrink-0 border-sgrey-15 p-0"
                  }
                  onClick={() =>
                    setSelectedImage(
                      selectedImage !== images.length - 1
                        ? selectedImage + 1
                        : 0,
                    )
                  }
                >
                  <ArrowRightIcon className={"size-6 stroke-sgrey-50"} />
                </Button>
              </SectionCards.Content>
            </div>
          </SectionContent>
        </SectionDesignation>
        <SectionDesignation
          className={"py-0 laptop:col-span-6 laptop:col-start-1 laptop:mr-2.5"}
        >
          <SectionContent className={"mt-5 laptop:mt-5 flex h-min"}>
            <SectionCards
              className={
                "gap-y-5 laptop:gap-y-2 grid-rows-none laptop:flex flex-col"
              }
            >
              <SectionCardHeader
                className={"border-b border-b-sgrey-15 pb-5 laptop:gap-y-2.5"}
              >
                <SectionCardTitle>Description</SectionCardTitle>
                <SectionCardDescription>
                  Discover your own piece of paradise with the Seaside Serenity
                  Villa. T With an open floor plan, breathtaking ocean views
                  from every room, and direct access to a pristine sandy beach,
                  this property is the epitome of coastal living.
                </SectionCardDescription>
              </SectionCardHeader>
              <SectionCardContent
                className={"grid grid-cols-2 laptop:grid-cols-3 gap-y-5"}
              >
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
                <div
                  className={
                    "col-span-2 laptop:col-span-1 laptop:border-l laptop:border-sgrey-15 laptop:pl-5"
                  }
                >
                  <Separator className={"laptop:hidden mb-5"} />
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
        <SectionDesignation
          className={
            "py-0 laptop:col-span-5 laptop:col-start-7 laptop:-mr-10 laptop:ml-2.5 "
          }
        >
          <SectionContent className={"mt-5 laptop:mt-5"}>
            <SectionCards>
              <SectionCards.Header className={"space-y-5"}>
                <SectionCardTitle>Key Features and Amenities</SectionCardTitle>
                {property.features.map((feature, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        "inline-grid w-full grid-cols-12 items-center gap-x-2.5 border-l border-l-pprimary-60 bg-gradient-to-r from-sgrey-10 p-2.5 to-transparent *:shrink-0"
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
          <div className={" laptop:col-span-4 laptop:mr-16 col-span-full"}>
            <SectionHeader>Inquire About Seaside Serenity Villa</SectionHeader>
            <SectionDescription>
              Interested in this property? Fill out the form below, and our real
              estate experts will get back to you with more details, including
              scheduling a viewing and answering any questions you may have.
            </SectionDescription>
          </div>
          <SectionContent className={"laptop:col-span-8 laptop:mt-0"}>
            <SubmitForm inputData={submitData} />
          </SectionContent>
        </SectionDesignation>
        <SectionDesignation>
          <SectionHeader>Comprehensive Pricing Details</SectionHeader>
          <SectionDescription>
            At Estatein, transparency is key. We want you to have a clear
            understanding of all costs associated with your property investment.
            Below, we break down the pricing for Seaside Serenity Villa to help
            you make an informed decision
          </SectionDescription>
          <SectionContent className={"grid-rows-2"}>
            <SectionCards
              className={
                "laptop:px-10 laptop:py-8 bg-sgrey-10 laptop:items-center flex flex-nowrap flex-col laptop:flex-row justify-start gap-x-5"
              }
            >
              <p className={"text-2xl"}>Note</p>
              <Separator
                orientation={"vertical"}
                className={"hidden laptop:block"}
              />
              <Separator
                orientation={"horizontal"}
                className={"laptop:hidden"}
              />
              <SectionCards.Header.Description>
                The figures provided above are estimates and may vary depending
                on the property, location, and individual circumstances.
              </SectionCards.Header.Description>
            </SectionCards>
          </SectionContent>
          <div
            className={
              "col-span-full grid overflow-visible gap-5 grid-rows-1 laptop:gap-y-14 mt-16"
            }
          >
            <div className={" col-span-1 laptop:row-span-full"}>
              <SectionDescription>Listing Price</SectionDescription>
              <SectionHeader className={"col-span-1"} icon={false}>
                {Intl.NumberFormat(undefined, format).format(
                  property.pricing.initialCost.listingPrice,
                )}
              </SectionHeader>
            </div>
            <div
              className={
                "contents  laptop:*:col-span-8 *: gap-y-5 laptop:*:col-start-2"
              }
            >
              <SectionCards
                className={
                  "grid-rows-none *:*:border-l-sgrey-15 *:*:pl-5 first:*:border-l-0 laptop:grid-cols-2"
                }
              >
                <SectionCards.Header className={"col-span-full"}>
                  <SectionCards.Header.Title
                    className={"flex items-center justify-between"}
                  >
                    <h2>Additional Fees</h2>
                    <Button disabled className={" bg-sgrey-10"}>
                      Learn More
                    </Button>
                  </SectionCards.Header.Title>
                </SectionCards.Header>
                <DataComponent
                  data={property.pricing.additionalFees.transfer}
                  name={"Property Transfer Tax"}
                >
                  Based on the sale price and local regulations
                </DataComponent>

                <DataComponent
                  data={property.pricing.additionalFees.legal}
                  name={"Legal Fees"}
                >
                  Approximate cost for legal services, including title transfer
                </DataComponent>
                <DataComponent
                  data={property.pricing.additionalFees.inspection}
                  name={"Home Inspection"}
                  className={"rounded-full"}
                >
                  Recommended for due diligence
                </DataComponent>
                <DataComponent
                  data={property.pricing.additionalFees.insurance}
                  name={"Property Insurance"}
                >
                  Annual cost for comprehensive property insurance
                </DataComponent>
                <DataComponent
                  data={property.pricing.additionalFees.mortgage}
                  name={"Mortgage Fees"}
                >
                  If applicable, consult with your lender for specific details
                </DataComponent>
                <div className={" border-t-sgrey-15 border-t pt-5"} />
              </SectionCards>
              <SectionCards className={"grid-rows-none"}>
                <SectionCards.Header className={"col-span-full"}>
                  <SectionCards.Header.Title
                    className={"flex items-center justify-between"}
                  >
                    <h2>Monthly Costs</h2>
                    <Button disabled className={" bg-sgrey-10"}>
                      Learn More
                    </Button>
                  </SectionCards.Header.Title>
                </SectionCards.Header>
                <DataComponent
                  data={property.pricing.monthlyCost.propertyTax}
                  name={"Property Taxes"}
                >
                  Approximate monthly property tax based on the sale price and
                  local rates
                </DataComponent>

                <DataComponent
                  data={property.pricing.monthlyCost.hoa}
                  name={"Homeowners' Association Fee"}
                >
                  Monthly fee for common area maintenance and security
                </DataComponent>
              </SectionCards>
              <SectionCards className={"grid-rows-none laptop:grid-cols-2"}>
                <SectionCards.Header className={"col-span-full"}>
                  <SectionCards.Header.Title
                    className={"flex items-center justify-between"}
                  >
                    <h2>Total Initial Costs</h2>
                    <Button disabled className={"bg-sgrey-10"}>
                      Learn More
                    </Button>
                  </SectionCards.Header.Title>
                </SectionCards.Header>
                <DataComponent
                  data={property.pricing.initialCost.listingPrice}
                  name={"Listing Price"}
                />

                <DataComponent
                  data={property.pricing.monthlyCost.hoa}
                  name={"Homeowners' Association Fee"}
                >
                  Property transfer tax, legal fees, inspection, insurance
                </DataComponent>
                <DataComponent
                  data={property.pricing.initialCost.downPayment}
                  name={"Down Payment"}
                  className={"rounded-full"}
                >
                  20%
                </DataComponent>
                <DataComponent
                  data={property.pricing.initialCost.mortgage}
                  name={"Mortgage Amount"}
                  className={"rounded-full"}
                >
                  If applicable
                </DataComponent>
              </SectionCards>
              <SectionCards className={"grid-rows-none laptop:grid-cols-2"}>
                <SectionCards.Header className={"col-span-full"}>
                  <SectionCards.Header.Title
                    className={"flex items-center justify-between"}
                  >
                    <h2>Monthly Expenses</h2>
                    <Button disabled className={"bg-sgrey-10"}>
                      Learn More
                    </Button>
                  </SectionCards.Header.Title>
                </SectionCards.Header>
                <DataComponent
                  data={property.pricing.monthlyCost.propertyTax}
                  name={"Property Taxes"}
                />
                <DataComponent
                  data={property.pricing.monthlyCost.hoa}
                  name={"Homeowners' Association Fee"}
                />

                <DataComponent
                  data={property.pricing.monthlyExpenses.mortgage}
                  name={"Mortgage Payment"}
                ></DataComponent>
                <DataComponent
                  data={property.pricing.monthlyExpenses.insurance}
                  name={"Property Insurance"}
                  className={"rounded-full"}
                >
                  Approximate monthly cost
                </DataComponent>
              </SectionCards>
            </div>
          </div>
        </SectionDesignation>
        <SectionDesignation
          rows={3}
          buttonText={"View All FAQ’s"}
          displayAmount={3}
          disabled
          data={faqCards}
        >
          <SectionHeader>Frequently Asked Questions</SectionHeader>
          <SectionDescription>
            Find answers to common questions about Estatein's services, property
            listings, and the real estate process. We're here to provide clarity
            and assist you every step of the way.
          </SectionDescription>
          <SectionContent>
            <SectionCards />
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
