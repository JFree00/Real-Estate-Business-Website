import { title } from "@/config.shared";
import type { MetaFunction } from "@remix-run/cloudflare";

import homeBuildings from "@/assets/homeBuildings.jpg";
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
import InfoCards, { infoCardProps } from "@/components/infoCards";
import {
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
  SunIcon,
} from "@heroicons/react/20/solid";
import villa from "@/assets/villa.png";
import metropolitan from "@/assets/MetropolitanHaven.png";
import rusticCottage from "@/assets/RusticCottage.png";

import wadeWarren from "@/assets/wadeWarren.png";
import emelieThomson from "@/assets/emelieThomson.png";
import johnMans from "@/assets/johnMans.png";
import { BanknotesIcon } from "@heroicons/react/24/solid";
import { SectionDesignation } from "@/components/Designations/sectionDesignation";
import { SectionHeader } from "@/components/Designations/sectionHeader";
import { SectionDescription } from "@/components/Designations/sectionDescription";
import { SectionContent } from "@/components/Designations/sectionContent";
import { PropertiesCard, PropertyProps } from "@/components/propertiesCard";
import {
  TestimonialCards,
  testimonialProps,
} from "@/components/testimonialCards";
import { sectionCardProps, SectionCards } from "@/components/sectionCards";

const testimonials: testimonialProps[] = [
  {
    name: "Wade Warren",
    location: "USA, California",
    title: "Exceptional Service!",
    testimonial:
      "Our experience with Estatein was outstanding. Their team's dedication and professionalism made finding our dream home a breeze. Highly recommended!",
    rating: 5,
    image: wadeWarren,
  },
  {
    name: "Emelie Thomson",
    location: "USA, Florida",
    title: "Efficient and Reliable",
    testimonial:
      "Estatein provided us with top-notch service. They helped us sell our property quickly and at a great price. We couldn't be happier with the results.",
    rating: 5,
    image: emelieThomson,
  },
  {
    name: "John Mans",
    location: "USA, Nevada",
    title: "Trusted Advisors",
    testimonial:
      "The Estatein team guided us through the entire buying process. Their knowledge and commitment to our needs were impressive. Thank you for your support",
    rating: 5,
    image: johnMans,
  },
];
const properties: PropertyProps[] = [
  {
    bedrooms: 4,
    bathrooms: 3,
    propertyType: "Villa",
    price: "$500,000",
    name: "Seaside Serenity Villa",
    description:
      "A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood...",
    image: villa,
  },
  {
    bedrooms: 2,
    bathrooms: 2,
    propertyType: "Villa",
    price: "$500,000",
    name: "Metropolitan Haven",
    description:
      "A chic and fully-furnished 2-bedroom apartment with panoramic city views...",
    image: metropolitan,
  },
  {
    bedrooms: 2,
    bathrooms: 2,
    propertyType: "Villa",
    price: "$500,000",
    name: "Rustic Retreat Cottage",
    description:
      "A charming 2-bedroom, 2-bathroom cottage nestled in a serene countryside setting...",
    image: rusticCottage,
  },
];
export const meta: MetaFunction = () => {
  return [
    { title: title() },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
const infoCards: infoCardProps[] = [
  {
    text: "Find Your Dream Home",
    icon: <BuildingStorefrontIcon />,
  },
  {
    text: "Unlock Property Value",
    icon: <BanknotesIcon />,
  },
  {
    text: "Effortless Property Management",
    icon: <BuildingOffice2Icon />,
  },
  {
    text: "Smart Investments, Informed Decisions",
    icon: <SunIcon />,
  },
];

const faqCards: sectionCardProps[] = [
  {
    name: "How do I search for properties on Estatein?",
    description:
      "Learn how to use our user-friendly search tools to find properties that match your criteria.",
    buttonText: "Read More",
  },
  {
    name: "What documents do I need to sell my property through Estatein?",
    description:
      "Find out about the necessary documentation for listing your property with us.",
    buttonText: "Read More",
  },
  {
    name: "How can I contact an Estatein agent? ",
    description:
      "Discover the different ways you can get in touch with our experienced agents.",
    buttonText: "Read More",
  },
];
export default function Index() {
  const propertyCards = properties.map((property) => (
    <PropertiesCard
      key={property.name}
      bedrooms={property.bedrooms}
      bathrooms={property.bathrooms}
      propertyType={property.propertyType}
      description={property.description}
      name={property.name}
      price={property.price}
      image={property.image}
    />
  ));

  const testimonialCards = testimonials.map((testimonial) => (
    <TestimonialCards
      key={testimonial.name}
      name={testimonial.name}
      location={testimonial.location}
      title={testimonial.title}
      testimonial={testimonial.testimonial}
      image={testimonial.image}
      rating={testimonial.rating}
    />
  ));
  return (
    <main>
      <div className={" grid grid-cols-12 relative "}>
        <div
          className={
            "rounded-full bg-sgrey-8 border border-sgrey-15 size-40 absolute mx-auto left-0 right-0 top-40"
          }
        >
          <div
            className={" bg-cover bg-no-repeat mx-4 my-4 size-32"}
            style={{
              backgroundImage: `url('${circle}')`,
            }}
          ></div>
          <div
            className={
              "rounded-full bg-sgrey-10 border border-sgrey-15 size-16 mx-auto absolute  left-0 right-0 bottom-1/3"
            }
          >
            <ArrowUpRightIcon className={"mx-4 my-4 size-8"} />
          </div>
        </div>
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
                <Card className={" p-4 pb-0"}>
                  <CardHeader>
                    <CardTitle>200+</CardTitle>
                  </CardHeader>
                  <CardFooter className={"min-h-14"}>
                    <CardDescription>Happy Customers</CardDescription>
                  </CardFooter>
                </Card>
              </div>
              <div className={"basis-1/2  laptop:basis-1/3 px-2"}>
                <Card className={" p-4 pb-0"}>
                  <CardHeader>
                    <CardTitle>10k+</CardTitle>
                  </CardHeader>
                  <CardFooter className={"min-h-14"}>
                    <CardDescription>Properties For Clients</CardDescription>
                  </CardFooter>
                </Card>
              </div>
              <div className={"grow laptop:grow-0 laptop:basis-1/3 px-2"}>
                <Card className={" p-4 pb-0"}>
                  <CardHeader>
                    <CardTitle>16+</CardTitle>
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
            "row-start-1 col-span-full laptop:col-span-6 laptop:row-span-3 overflow-hidden"
          }
          style={{ maxHeight: "100%%" }}
        >
          <img
            src={homeBuildings}
            width={"100%"}
            style={{ objectFit: "contain" }}
            alt={"Real Estate"}
          />
        </div>
        <InfoCards.InfoCardsArea cardData={infoCards} />

        <SectionDesignation buttonText={"View All Properties"} rows={3}>
          <SectionHeader>Featured Properties</SectionHeader>
          <SectionDescription>
            Explore our handpicked selection of featured properties. Each
            listing offers a glimpse into exceptional homes and investments
            available through Estatein. Click "View Details" for more
            information.
          </SectionDescription>
          <SectionContent columns={6} rows={1}>
            {propertyCards}
          </SectionContent>
        </SectionDesignation>
        <SectionDesignation buttonText={"View All Testimonials"} rows={2}>
          <SectionHeader>What Our Clients Say</SectionHeader>
          <SectionDescription>
            Read the success stories and heartfelt testimonials from our valued
            clients. Discover why they chose Estatein for their real estate
            needs.
          </SectionDescription>

          <SectionContent columns={6} rows={1}>
            {testimonialCards}
          </SectionContent>
        </SectionDesignation>
        <SectionDesignation rows={3} buttonText={"View All FAQ’s"}>
          <SectionHeader>Frequently Asked Questions</SectionHeader>
          <SectionDescription>
            Find answers to common questions about Estatein's services, property
            listings, and the real estate process. We're here to provide clarity
            and assist you every step of the way.
          </SectionDescription>
          <SectionContent columns={3} rows={1}>
            <SectionCards cardData={faqCards} />
          </SectionContent>
        </SectionDesignation>
      </div>
    </main>
  );
}
