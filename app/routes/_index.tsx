import { title } from "@/config.shared";
import {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";

import homeBuildings from "@/assets/homeBuildings.webp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import circle from "@/assets/circleText.svg";
import * as React from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { SectionDesignation } from "@/components/Designations/sectionDesignation";
import { SectionHeader } from "@/components/Designations/sectionHeader";
import { SectionDescription } from "@/components/Designations/sectionDescription";
import { SectionContent } from "@/components/Designations/sectionContent";
import {
  PropertiesCard,
  propertyProps,
} from "@/components/cards/propertiesCard";
import {
  TestimonialCards,
  testimonialProps,
} from "@/components/cards/testimonialCards";
import { useLoaderData } from "@remix-run/react";
import { defaultProperties } from "../../KV/properties";
import { defaultTestimonials } from "../../KV/testimonials";
import { SectionCards } from "@/components/cards/sectionCards";
import { faqCards } from "../../KV/faq";
import { indexInfoCard } from "../../KV/info.ts";
import InfoCards from "@/components/cards/infoCards";

export const links: LinksFunction = () => {
  return [{ rel: "preload", as: "image", href: homeBuildings }];
};

export type template =
  | testimonialProps
  | propertyProps
  | {
      name: string;
      [key: string]: unknown;
    };

function getInitialKeys(k: KVNamespace, template: Readonly<template[]>) {
  const keys = template.map((key) => {
    //alternatively limit the amount of keys to fetch, but right now the average keys size is 300 bytes and there aren't many
    return k.get(key.name, "json");
  }) as Promise<template>[];
  const initialKey = Promise.race(keys).catch(() => {
    return template[0];
  });
  const keysPromiseAll = Promise.all(keys);

  return { initialKey, keys: keysPromiseAll, length: keys.length };
}
export async function loader({ context }: LoaderFunctionArgs) {
  const env = context.env;
  const propertiesPromises = getInitialKeys(env.properties, defaultProperties);
  const testimonialsPromises = getInitialKeys(
    env.testimonials,
    defaultTestimonials,
  );
  const testimonials = {
    ...testimonialsPromises,
    initialKey: await testimonialsPromises.initialKey,
  };
  const properties = {
    ...propertiesPromises,
    initialKey: await propertiesPromises.initialKey,
  };

  return {
    properties,
    testimonials,
  };
}

export type loaderData = typeof loader;

export const meta: MetaFunction = () => {
  return [
    { title: title() },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
export default function Index() {
  const { properties, testimonials } = useLoaderData<typeof loader>();
  return (
    <main>
      <div className={" grid grid-cols-12 relative "}>
        <div
          className={
            "offset-hero col-span-full row-start-2 laptop:row-start-1 laptop:col-span-6"
          }
        >
          <div
            className={
              "w-full grid grid-cols-6 mt-14 laptop:mt-20 desktop:mt-36 gap-y-8 laptop:gap-y-12"
            }
          >
            <div className={"font-semibold text-balance col-span-full h-1/4"}>
              <p
                className={
                  "text-3xl tablet:text-6xl laptop:text-5xl desktop:text-6xl"
                }
                style={{ lineHeight: "1.2" }}
              >
                Discover Your Dream Property with Estatein
              </p>
            </div>
            <h5
              className={
                "col-span-full self-center text-sgrey-60 -mt-5 text-lg"
              }
            >
              Your journey to finding the perfect property begins here. Explore
              our listings to find the home that matches your dreams.
            </h5>
            <div className={"col-span-6 h-full"}>
              <div className={"flex flex-wrap gap-3 items-center"}>
                <div
                  className={"basis-full tablet:basis-auto grow laptop:grow-0 "}
                >
                  <Button
                    variant={"active"}
                    size={"responsive"}
                    className={"laptop:px-6 laptop:h-16"}
                  >
                    Learn More
                  </Button>
                </div>
                <div className={"grow "}>
                  <Button
                    variant={"default"}
                    size={"responsive"}
                    className={"bg-pprimary-60 laptop:px-6 laptop:h-16"}
                  >
                    Browse Properties
                  </Button>
                </div>
              </div>
            </div>
            <div
              className={
                "flex col-span-full flex-wrap gap-y-4 laptop:text-left text-center"
              }
            >
              <div className={"basis-1/2 laptop:basis-1/3 px-2"}>
                <Card className={"  p-4 pb-0 h-fit"}>
                  <CardHeader>
                    <CardTitle className={"text-4xl"}>200+</CardTitle>
                  </CardHeader>
                  <CardFooter className={"min-h-14"}>
                    <CardDescription>Happy Customers</CardDescription>
                  </CardFooter>
                </Card>
              </div>
              <div className={"basis-1/2  laptop:basis-1/3 px-2"}>
                <Card className={" p-4 pb-0 h-fit"}>
                  <CardHeader>
                    <CardTitle className={"text-4xl"}>10k+</CardTitle>
                  </CardHeader>
                  <CardFooter className={"min-h-14"}>
                    <CardDescription>Properties For Clients</CardDescription>
                  </CardFooter>
                </Card>
              </div>
              <div className={"grow laptop:grow-0 laptop:basis-1/3 px-2"}>
                <Card className={" p-4 pb-0 h-fit"}>
                  <CardHeader>
                    <CardTitle className={"text-4xl"}>16+</CardTitle>
                  </CardHeader>
                  <CardFooter className={"min-h-14"}>
                    <CardDescription>Years Of Experience</CardDescription>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            "row-start-1  m-4 laptop:m-0 col-span-full laptop:col-span-6 laptop:row-span-3  relative"
          }
          style={{ maxHeight: "100%%" }}
        >
          <div
            className={
              "rounded-full bg-sgrey-8 border border-sgrey-15 size-32 laptop:size-40 absolute laptop:-left-20 -bottom-12 laptop:-bottom-20 laptop:top-40 flex"
            }
          >
            <div
              className={
                " bg-cover bg-no-repeat size-[80%] mx-auto my-auto flex"
              }
              style={{
                backgroundImage: `url('${circle}')`,
              }}
            >
              <div
                className={
                  "rounded-full bg-sgrey-10 border border-sgrey-15 size-[50%] m-auto left-0 right-0 flex"
                }
              >
                <ArrowUpRightIcon className={"m-auto size-[50%]"} />
              </div>
            </div>
          </div>
          <div
            className={
              " size-full overflow-hidden border border-sgrey-15 rounded-xl laptop:border-0 laptop:rounded-none"
            }
          >
            <img
              src={homeBuildings}
              width={"100%"}
              style={{ objectFit: "contain" }}
              alt={"Real Estate"}
            />
          </div>
        </div>
        <InfoCards.InfoCardsArea cardData={indexInfoCard} />
        <SectionDesignation
          buttonText={"View All Properties"}
          rows={3}
          paginationDisplayAmount={properties.length}
          data={properties}
        >
          <SectionHeader>Featured Properties</SectionHeader>
          <SectionDescription>
            Explore our handpicked selection of featured properties. Each
            listing offers a glimpse into exceptional homes and investments
            available through Estatein. Click "View Details" for more
            information.
          </SectionDescription>
          <SectionContent>
            <PropertiesCard />
          </SectionContent>
        </SectionDesignation>
        <SectionDesignation
          buttonText={"View All Testimonials"}
          rows={2}
          paginationDisplayAmount={testimonials.length}
          data={testimonials}
        >
          <SectionHeader>What Our Clients Say</SectionHeader>
          <SectionDescription>
            Read the success stories and heartfelt testimonials from our valued
            clients. Discover why they chose Estatein for their real estate
            needs.
          </SectionDescription>

          <SectionContent>
            <TestimonialCards />
          </SectionContent>
        </SectionDesignation>
        <SectionDesignation
          rows={3}
          buttonText={"View All FAQ’s"}
          paginationDisplayAmount={3}
          data={faqCards}
        >
          <SectionHeader>Frequently Asked Questions</SectionHeader>
          <SectionDescription>
            Find answers to common questions about Estatein's services, property
            listings, and the real estate process. We're here to provide clarity
            and assist you every step of the way.
          </SectionDescription>
          <SectionContent>
            <SectionCards
              className={"border border-sgrey-15 rounded-xl dataCardComponent"}
            >
              <SectionCards.Header>
                <SectionCards.Header.Title className={" min-h-[72px]"} />
                <SectionCards.Header.Description />
              </SectionCards.Header>

              <SectionCards.Content />
            </SectionCards>
          </SectionContent>
        </SectionDesignation>
      </div>
    </main>
  );
}
