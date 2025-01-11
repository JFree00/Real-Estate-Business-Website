import { title } from "@/config.shared";
import { LinksFunction, MetaFunction } from "react-router";
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
import { PropertiesCard } from "@/components/cards/propertiesCard";
import { TestimonialCards } from "@/components/cards/testimonialCards";
import { useLoaderData } from "react-router";
import { defaultProperties } from "../../KV/properties";
import { defaultTestimonials, Testimonial } from "../../KV/testimonials";
import { SectionCards } from "@/components/cards/sectionCards";
import { faqCards } from "../../KV/faq";
import { indexInfoCard } from "../../KV/info.ts";
import InfoCards from "@/components/cards/infoCards";
import { namedUnknown } from "../../KV/filter";
import { KVNamespace } from "@cloudflare/workers-types";
import { Route } from "./+types/_index";
import { Property } from "../../KV/propertyTypings";

export const links: LinksFunction = () => {
  return [{ rel: "preload", as: "image", href: homeBuildings }];
};

function getInitialKeys(
  k: KVNamespace,
  template: Property[] | Testimonial[],
  limit = 10,
) {
  const keys = template.map(async (item, index) => {
    const key = item.metadata;
    if (index > limit) return Promise.resolve(undefined);
    return k.getWithMetadata(key.name).then(async (data) => {
      if (!data.metadata || !(data.metadata as string).length) {
        if (data.value) return JSON.parse(data.value) as Property;
        if (!item) throw new Error(`${key.name} not found`);
        await k
          .put(key.name, JSON.stringify(item), {
            metadata: item.metadata,
          })
          .catch(() => k.put(key.name, JSON.stringify(item)));
        return item;
      }
      return JSON.parse(data.metadata as string) as namedUnknown;
    });
  });
  return { items: keys, length: keys.length };
}
export function loader({ context }: Route.LoaderArgs) {
  const env = context.env;
  const properties = getInitialKeys(env.properties, defaultProperties);
  const testimonials = getInitialKeys(
    env.testimonials,
    defaultTestimonials.map((item) => ({ metadata: item })),
  );
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
      <div className={" relative grid grid-cols-12 "}>
        <div
          className={
            "offset-hero col-span-full row-start-2 laptop:col-span-6 laptop:row-start-1"
          }
        >
          <div
            className={
              "mt-14 grid w-full grid-cols-6 gap-y-8 laptop:mt-20 laptop:gap-y-12 desktop:mt-36"
            }
          >
            <div className={"col-span-full h-1/4 text-balance font-semibold"}>
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
                "col-span-full -mt-5 self-center text-lg text-sgrey-60"
              }
            >
              Your journey to finding the perfect property begins here. Explore
              our listings to find the home that matches your dreams.
            </h5>
            <div className={"col-span-6 h-full"}>
              <div className={"flex flex-wrap items-center gap-3"}>
                <div
                  className={"grow basis-full tablet:basis-auto laptop:grow-0 "}
                >
                  <Button
                    variant={"active"}
                    size={"responsive"}
                    className={"laptop:h-16 laptop:px-6"}
                  >
                    Learn More
                  </Button>
                </div>
                <div className={"grow "}>
                  <Button
                    variant={"default"}
                    size={"responsive"}
                    className={"bg-pprimary-60 laptop:h-16 laptop:px-6"}
                  >
                    Browse Properties
                  </Button>
                </div>
              </div>
            </div>
            <div
              className={
                "col-span-full flex flex-wrap gap-y-4 text-center laptop:text-left"
              }
            >
              <div className={"basis-1/2 px-2 laptop:basis-1/3"}>
                <Card className={"  h-fit p-4 pb-0"}>
                  <CardHeader>
                    <CardTitle className={"text-4xl"}>200+</CardTitle>
                  </CardHeader>
                  <CardFooter className={"min-h-14"}>
                    <CardDescription>Happy Customers</CardDescription>
                  </CardFooter>
                </Card>
              </div>
              <div className={"basis-1/2  px-2 laptop:basis-1/3"}>
                <Card className={" h-fit p-4 pb-0"}>
                  <CardHeader>
                    <CardTitle className={"text-4xl"}>10k+</CardTitle>
                  </CardHeader>
                  <CardFooter className={"min-h-14"}>
                    <CardDescription>Properties For Clients</CardDescription>
                  </CardFooter>
                </Card>
              </div>
              <div className={"grow px-2 laptop:grow-0 laptop:basis-1/3"}>
                <Card className={" h-fit p-4 pb-0"}>
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
            "relative  col-span-full row-start-1 m-4 laptop:col-span-6 laptop:row-span-3  laptop:m-0"
          }
          style={{ maxHeight: "100%%" }}
        >
          <div
            className={
              "absolute -bottom-12 flex size-32 rounded-full border border-sgrey-15 bg-sgrey-8 laptop:-bottom-20 laptop:-left-20 laptop:top-40 laptop:size-40"
            }
          >
            <div
              className={" m-auto flex size-4/5 bg-cover bg-no-repeat"}
              style={{
                backgroundImage: `url('${circle}')`,
              }}
            >
              <div
                className={
                  "inset-x-0 m-auto flex size-1/2 rounded-full border border-sgrey-15 bg-sgrey-10"
                }
              >
                <ArrowUpRightIcon className={"m-auto size-1/2"} />
              </div>
            </div>
          </div>
          <div
            className={
              " size-full overflow-hidden rounded-xl border border-sgrey-15 laptop:rounded-none laptop:border-0"
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
          displayAmount={3}
          data={properties}
          linkTo={"/properties"}
        >
          <SectionHeader>Featured Properties</SectionHeader>
          <SectionDescription>
            Explore our handpicked selection of featured properties. Each
            listing offers a glimpse into exceptional homes and investments
            available through Estatein. Click "View Details" for more
            information.
          </SectionDescription>
          <SectionContent className={"laptop:gap-x-5 desktop:gap-x-7"}>
            <PropertiesCard />
          </SectionContent>
        </SectionDesignation>
        <SectionDesignation
          buttonText={"View All Testimonials"}
          rows={2}
          displayAmount={3}
          data={testimonials}
          disabled
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
          displayAmount={3}
          data={faqCards}
          disabled
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
