import { Link, LinksFunction, MetaFunction, useLoaderData } from "react-router";
import homeBuildings from "@/assets/homeBuildings.webp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as React from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { SectionDesignation } from "@/components/Designations/sectionDesignation";
import { SectionHeader } from "@/components/Designations/sectionHeader";
import { SectionDescription } from "@/components/Designations/sectionDescription";
import { SectionContent } from "@/components/Designations/sectionContent";
import { PropertiesCard } from "@/components/cards/propertiesCard";
import { TestimonialCards } from "@/components/cards/testimonialCards";
import { defaultProperties } from "../../data/properties";
import { defaultTestimonials, Testimonial } from "../../data/testimonials";
import { SectionCards } from "@/components/cards/sectionCards";
import { faqCards } from "../../data/faq";
import { indexInfoCard } from "../../data/info.ts";
import InfoCards from "@/components/cards/infoCards";
import { namedUnknown } from "../../data/filter";
import { KVNamespace } from "@cloudflare/workers-types";
import { Route } from "./+types/_index";
import { Property } from "../../data/propertyTypings";
import * as Sentry from "@sentry/cloudflare";

export const links: LinksFunction = () => {
  return [
    {
      rel: "preload",
      fetchpriority: "high",
      as: "image",
      href: homeBuildings,
      type: "image/webp",
    },
  ];
};

function getInitialKeys(
  k: KVNamespace,
  template: Property[] | Testimonial[],
  limit = 10,
) {
  const keys = template.map(async (item, index) => {
    const key = item.metadata;
    if (index > limit) return Promise.resolve(undefined);
    return Sentry.startSpanManual(
      {
        name: "KV Request",
      },
      (span) => {
        try {
          return k.getWithMetadata(key.name).then(async (data) => {
            if (!data.metadata || !(data.metadata as string).length) {
              if (data.value) {
                return JSON.parse(data.value) as Property;
              }
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
        } catch (e) {
          span.setAttribute("Property", key.name);
          span.end();
          console.error(e);
          return item;
        } finally {
          span.setAttribute("Property", key.name);
          span.end();
        }
      },
    );
  });
  return { items: keys, length: keys.length };
}
export async function loader({ context }: Route.LoaderArgs) {
  const env = context.env;
  let props;
  let emptyPromises = 0;
  try {
    const listed = await env.properties.list({ limit: 15 });
    props = listed.keys.map((property) => {
      return Sentry.startSpanManual(
        {
          name: "KV Request",
        },
        (span) => {
          return property.metadata
            ? (Promise.resolve(property) as Promise<Property>)
            : env.properties
                .get(property.name)
                .then((data) => {
                  const prop = JSON.parse(data!) as Property;
                  prop.metadata.name = prop.metadata.name ?? property.name;
                  return prop;
                })
                .finally(() => {
                  span.setAttribute("Property", property.name);
                  span.end();
                })
                .catch(() => {
                  emptyPromises++;
                  return Promise.resolve(undefined);
                });
        },
      );
    });
  } catch (e) {
    console.error(e);
  }
  const properties = props
    ? { items: props, length: props.length - emptyPromises }
    : getInitialKeys(env.properties, defaultProperties);
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
    {
      name: "description",
      content: "Discover Your Dream Property with Estatein",
    },
  ];
};
export default function Index() {
  const { properties, testimonials } = useLoaderData<typeof loader>();
  return (
    <main className={"relative grid grid-cols-12 "}>
      <section
        className={
          "offset-hero col-span-full row-start-2 laptop:col-span-6 laptop:row-start-1 mt-14 grid w-full grid-cols-6 gap-y-8 laptop:mt-20 laptop:gap-y-12 desktop:mt-36"
        }
      >
        <h1
          className={
            "col-span-full text-balance font-semibold text-3xl tablet:text-6xl laptop:text-5xl desktop:text-6xl desktop:leading-tight"
          }
        >
          Discover Your Dream Property with Estatein
        </h1>
        <h2 className={"col-span-full -mt-5 self-center text-lg text-sgrey-60"}>
          Your journey to finding the perfect property begins here. Explore our
          listings to find the home that matches your dreams.
        </h2>
        <div className={"col-span-6 h-full flex flex-wrap items-center gap-3"}>
          <Button
            variant={"active"}
            size={"responsive"}
            className={
              "laptop:h-16 laptop:px-6 grow basis-full tablet:basis-auto laptop:grow-0"
            }
            asChild
          >
            <Link to={"/about-us"}>Learn More</Link>
          </Button>

          <Button
            variant={"default"}
            size={"responsive"}
            className={
              "bg-pprimary-60 laptop:h-16 laptop:px-6 grow laptop:grow-0"
            }
            asChild
          >
            <Link to={"/properties"}>Browse Properties</Link>
          </Button>
        </div>
        <ul
          className={
            "col-span-full grid grid-cols-2 laptop:grid-cols-3  gap-y-4 text-center laptop:text-left"
          }
        >
          <li className={"basis-1/2 px-2 laptop:basis-1/3"}>
            <Card className={"  p-4"}>
              <CardHeader>
                <CardTitle className={"text-4xl"}>200+</CardTitle>
              </CardHeader>
              <CardFooter className={""}>
                <CardDescription>Happy Customers</CardDescription>
              </CardFooter>
            </Card>
          </li>
          <li className={"basis-1/2  px-2 laptop:basis-1/3"}>
            <Card className={"p-4"}>
              <CardHeader>
                <CardTitle className={"text-4xl"}>10k+</CardTitle>
              </CardHeader>
              <CardFooter className={""}>
                <CardDescription>Properties For Clients</CardDescription>
              </CardFooter>
            </Card>
          </li>
          <li
            className={
              "grow px-2 laptop:grow-0 laptop:basis-1/3 col-span-full laptop:col-span-1"
            }
          >
            <Card className={" p-4 "}>
              <CardHeader>
                <CardTitle className={"text-4xl"}>16+</CardTitle>
              </CardHeader>
              <CardFooter className={""}>
                <CardDescription>Years Of Experience</CardDescription>
              </CardFooter>
            </Card>
          </li>
        </ul>
      </section>
      <div
        className={
          "relative  col-span-full row-start-1 m-4 laptop:col-span-6 laptop:row-span-3  laptop:m-0 max-h-full"
        }
      >
        <div
          className={
            "absolute -bottom-12 flex size-32 rounded-full border border-sgrey-15 bg-sgrey-8 laptop:-bottom-20 laptop:-left-20 laptop:top-40 laptop:size-40"
          }
        >
          <div
            className={
              " m-auto flex size-4/5 bg-cover bg-no-repeat bg-landingDecoration"
            }
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
            className={"contain"}
            draggable={false}
            alt={"Skyscrapers"}
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
          Explore our handpicked selection of featured properties. Each listing
          offers a glimpse into exceptional homes and investments available
          through Estatein. Click "View Details" for more information.
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
          clients. Discover why they chose Estatein for their real estate needs.
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
    </main>
  );
}
