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
import { defaultTestimonials } from "../../KV/testimonials";
import { SectionCards } from "@/components/cards/sectionCards";
import { faqCards } from "../../KV/faq";
import { indexInfoCard } from "../../KV/info.ts";
import InfoCards from "@/components/cards/infoCards";
import { namedUnknown } from "../../KV/filter";
import { KVNamespace } from "@cloudflare/workers-types";
import { Route } from "./+types/_index";

export const links: LinksFunction = () => {
  return [{ rel: "preload", as: "image", href: homeBuildings }];
};

function getInitialKeys(k: KVNamespace, template: namedUnknown[], limit = 10) {
  const keys = template.map(async (key, index) => {
    if (index > limit) return Promise.resolve(undefined);
    return await k.getWithMetadata(key.name).then(async (data) => {
      if (!data.metadata || !(data.metadata as string).length) {
        if (data.value) return JSON.parse(data.value) as namedUnknown;
        const prop = template.find((item) => item.name === key.name);
        if (!prop) throw new Error(`${key.name} not found`);
        await k
          .put(key.name, "", { metadata: JSON.stringify(prop) })
          .catch(() => k.put(key.name, JSON.stringify(prop)));
        return prop;
      }
      return JSON.parse(data.metadata as string) as namedUnknown;
    });
  });
  return { keys: Promise.all(keys), length: keys.length };
}
export function loader({ context }: Route.LoaderArgs) {
  const env = context.env;
  const properties = getInitialKeys(env.properties, defaultProperties);
  const testimonials = getInitialKeys(env.testimonials, defaultTestimonials);
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
          displayAmount={3}
          data={properties}
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
