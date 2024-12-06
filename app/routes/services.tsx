// @flow
import * as React from "react";
import InfoCards from "@/components/cards/infoCards";
import { indexInfoCard } from "../../KV/info.ts";
import { SectionDesignation } from "@/components/Designations/sectionDesignation";
import { SectionHeader } from "@/components/Designations/sectionHeader";
import { SectionDescription } from "@/components/Designations/sectionDescription";
import { SectionContent } from "@/components/Designations/sectionContent";
import {
  sectionCardProps,
  SectionCards,
} from "@/components/cards/sectionCards";
import {
  ChartBarIcon,
  ChartPieIcon,
  CircleStackIcon,
  FireIcon,
  LightBulbIcon,
  MegaphoneIcon,
  SparklesIcon,
  SwatchIcon,
} from "@heroicons/react/24/solid";
import { Swirl } from "@/components/swirl";
import { Button } from "@/components/ui/button";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";
import { SunIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/styles";

export const servicesData: sectionCardProps[] = [
  {
    name: "Valuation Mastery",
    description:
      "Discover the true worth of your property with our expert valuation services.",
    icon: <ChartBarIcon />,
  },
  {
    name: "Strategic Marketing",
    description:
      "Selling a property requires more than just a listing; it demands a strategic marketing.",
    icon: <ChartPieIcon />,
  },
  {
    name: "Negotiation Wizardry",
    description:
      "Negotiating the best deal is an art, and our negotiation experts are masters of it.",
    icon: <CircleStackIcon />,
  },
  {
    name: "Closing Success",
    description:
      "A successful sale is not complete until the closing. We guide you through the intricate closing process.",
    icon: <MegaphoneIcon />,
  },
];
const data2: sectionCardProps[] = [
  {
    name: "Tenant Harmony",
    description:
      "Our Tenant Management services ensure that your tenants have a smooth and reducing vacancies.",
    icon: <SquaresPlusIcon />,
  },
  {
    name: "Maintenance Ease",
    description:
      "Say goodbye to property maintenance headaches. We handle all aspects of property upkeep.",
    icon: <SwatchIcon />,
  },
  {
    name: "Financial Peace of Mind",
    description:
      "Managing property finances can be complex. Our financial experts take care of rent collection",
    icon: <SparklesIcon />,
  },
  {
    name: "Legal Guardian",
    description:
      "Stay compliant with property laws and regulations effortlessly.",
    icon: <SunIcon />,
  },
];
const data3: sectionCardProps[] = [
  {
    name: "Market Insight",
    description:
      "Stay ahead of market trends with our expert Market Analysis. We provide in-depth insights into real estate market conditions",
    icon: <ChartBarIcon />,
  },
  {
    name: "ROI Assessment",
    description:
      "Make investment decisions with confidence. Our ROI Assessment services evaluate the potential returns on your investments",
    icon: <FireIcon />,
  },
  {
    name: "Customized Strategies",
    description:
      "Every investor is unique, and so are their goals. We develop Customized Investment Strategies tailored to your specific needs",
    icon: <LightBulbIcon />,
  },
  {
    name: "Diversification Mastery",
    description:
      "Diversify your real estate portfolio effectively. Our experts guide you in spreading your investments across various property types and locations",
    icon: <SunIcon />,
  },
];
type props = React.HTMLAttributes<HTMLDivElement> & {
  data: sectionCardProps[];
};
function NewComponent({ data, children, className }: props) {
  const cards = data.map((item) => {
    return (
      <SectionCards key={item.name} data={item} className={"items-start"}>
        <SectionCards.Header className={"flex-col gap-y-4"}>
          <div className={"inline-flex items-center gap-x-4"}>
            <Swirl className={"bg-sgrey-8"} size={"laptop:size-16"}>
              <SectionCards.Icon className={"size-5 laptop:size-6"} />
            </Swirl>
            <SectionCards.Header.Title
              className={"font-semibold"}
            ></SectionCards.Header.Title>
          </div>
          <SectionCards.Header.Description className={"align-top"} />
        </SectionCards.Header>
      </SectionCards>
    );
  });
  return (
    <div className={cn("contents", className)}>
      {cards}
      {children}
    </div>
  );
}

export default function Services() {
  return (
    <main>
      <div className={" grid grid-cols-12 relative"}>
        <div
          className={
            "bg-gradient-to-r grid grid-cols-subgrid  from-sgrey-15 to-30% to-sgrey-15/0 col-span-full  h-[285px] laptop:h-[315px] desktop:h-[390px]"
          }
        >
          <SectionDesignation
            pagination={false}
            className={"h-full mt-0 content-center"}
          >
            <div className={"my-auto contents"}>
              <SectionHeader icon={false}>
                Elevate Your Real Estate Experience
              </SectionHeader>
              <SectionDescription>
                Welcome to Estatein, where your real estate aspirations meet
                expert guidance. Explore our comprehensive range of services,
                each designed to cater to your unique needs and dreams.
              </SectionDescription>
            </div>
          </SectionDesignation>
        </div>
        <InfoCards.InfoCardsArea
          cardData={indexInfoCard}
          className={"m-0 rounded-none"}
          gap={""}
        />
        <SectionDesignation pagination={false} data={servicesData}>
          <SectionHeader>Unlock Property Value</SectionHeader>
          <SectionDescription className={"laptop:hidden"}>
            Selling your property should be a rewarding experience, and at
            Estatein, we make sure it is.
          </SectionDescription>
          <SectionDescription className={"hidden laptop:block"}>
            Selling your property should be a rewarding experience, and at
            Estatein, we make sure it is. Our Property Selling Service is
            designed to maximize the value of your property, ensuring you get
            the best deal possible. Explore the categories below to see how we
            can help you at every step of your selling journey
          </SectionDescription>
          <SectionContent
            iterate={false}
            className={"laptop:grid-cols-3"}
            amountToDisplay={4}
          >
            <NewComponent data={servicesData}>
              <SectionCards
                className={
                  "bg-sgrey-10 overflow-hidden relative laptop:basis-2/3 laptop:mt-0 laptop:col-span-2"
                }
              >
                <div className={" size-full absolute"}>
                  <div
                    className={
                      "absolute w-[1422px] h-[950px] z-0 overflow-hidden bg-auto bg-waves opacity-20 -top-[632px]"
                    }
                  ></div>
                </div>
                <SectionCards.Header
                  className={
                    "z-20 laptop:flex-row laptop:flex-wrap laptop:justify-between"
                  }
                >
                  <SectionCards.Header.Title className={"z-20 laptop:grow"}>
                    Unlock the Value of Your Property Today
                  </SectionCards.Header.Title>
                  <Button
                    size={"responsive"}
                    variant={"primary"}
                    className={
                      "bg-sgrey-8 z-20 border-sgrey-15 border laptop:py-6 desktop:py-8"
                    }
                  >
                    Learn More
                  </Button>

                  <SectionCards.Header.Description className={"z-20"}>
                    Ready to unlock the true value of your property? Explore our
                    Property Selling Service categories and let us help you
                    achieve the best deal possible for your valuable asset.
                  </SectionCards.Header.Description>
                </SectionCards.Header>
              </SectionCards>
            </NewComponent>
          </SectionContent>
        </SectionDesignation>
        <SectionDesignation pagination={false} data={data2}>
          <SectionHeader>Effortless Property Management</SectionHeader>
          <SectionDescription className={"laptop:hidden"}>
            Owning a property should be a pleasure, not a hassle. Estatein's
            Property Management Service takes the stress out of property
            ownership.
          </SectionDescription>
          <SectionDescription className={"hidden laptop:block"}>
            Owning a property should be a pleasure, not a hassle. Estatein's
            Property Management Service takes the stress out of property
            ownership, offering comprehensive solutions tailored to your needs.
            Explore the categories below to see how we can make property
            management effortless for you
          </SectionDescription>
          <SectionContent
            iterate={false}
            className={"laptop:grid-cols-3 gap-y-5"}
            amountToDisplay={4}
          >
            <NewComponent data={data2}>
              <SectionCards
                className={
                  "bg-sgrey-10 overflow-hidden relative laptop:basis-2/3 laptop:mt-0 laptop:col-span-2 "
                }
              >
                <div className={" size-full absolute"}>
                  <div
                    className={
                      "absolute w-[1422px] h-[950px] z-0  overflow-hidden bg-auto bg-waves opacity-20 -top-[632px]"
                    }
                  ></div>
                </div>
                <SectionCards.Header
                  className={
                    "z-20 gap-y-5 laptop:flex-row laptop:flex-wrap laptop:justify-between"
                  }
                >
                  <SectionCards.Header.Title className={"z-20 laptop:grow"}>
                    Experience Effortless Property Management
                  </SectionCards.Header.Title>
                  <Button
                    size={"responsive"}
                    variant={"primary"}
                    className={
                      "bg-sgrey-8 z-20 border-sgrey-15 border laptop:py-6 desktop:py-8"
                    }
                  >
                    Learn More
                  </Button>

                  <SectionCards.Header.Description className={"z-20 pt-0"}>
                    Ready to experience hassle-free property management? Explore
                    our Property Management Service categories and let us handle
                    the complexities while you enjoy the benefits of property
                    ownership.
                  </SectionCards.Header.Description>
                </SectionCards.Header>
              </SectionCards>
            </NewComponent>
          </SectionContent>
        </SectionDesignation>
        <SectionDesignation
          pagination={false}
          data={data3}
          className={"laptop:flex laptop:gap-12 "}
        >
          <div
            className={
              "basis-[34%] desktop:basis-1/3 laptop:shrink-0 flex flex-col justify-between"
            }
          >
            <SectionHeader className={" tablet:w-full"}>
              Smart Investments, Informed Decisions
            </SectionHeader>
            <SectionDescription className={"laptop:hidden"}>
              Building a real estate portfolio requires a strategic approach.
            </SectionDescription>
            <SectionDescription
              className={"hidden laptop:block tablet:w-full laptop:text-base"}
            >
              Building a real estate portfolio requires a strategic approach.
              Estatein's Investment Advisory Service empowers you to make smart
              investments and informed decisions.
            </SectionDescription>
            <SectionCards
              className={
                "bg-sgrey-10 overflow-hidden relative mt-5 shrink h-fit"
              }
            >
              <div className={" size-max absolute"}>
                <div
                  className={
                    "absolute w-[1422px] h-[950px] z-0 bg-auto bg-waves opacity-20 -top-[632px] "
                  }
                ></div>
              </div>
              <SectionCards.Header className={"z-20 gap-y-5 desktop:gap-y-8"}>
                <SectionCards.Header.Title className={"z-20  grow"}>
                  Unlock Your Investment Potential
                </SectionCards.Header.Title>
                <Button
                  size={"responsive"}
                  variant={"primary"}
                  className={
                    "bg-sgrey-8 z-20 border-sgrey-15 border laptop:w-full order-last py-0 laptop:py-6 desktop:py-8"
                  }
                >
                  Learn More
                </Button>

                <SectionCards.Header.Description
                  className={"z-20 laptop:text-base pt-0"}
                >
                  Explore our Property Management Service categories and let us
                  handle the complexities while you enjoy the benefits of
                  property ownership.
                </SectionCards.Header.Description>
              </SectionCards.Header>
            </SectionCards>
          </div>

          <SectionContent
            iterate={false}
            className={
              "flex-col gap-y-2.5 bg-sgrey-10 p-2.5 rounded-xl mt-12 shrink laptop:mt-0 laptop:grid-cols-2"
            }
            amountToDisplay={4}
          >
            <NewComponent data={data3}></NewComponent>
          </SectionContent>
        </SectionDesignation>
      </div>
    </main>
  );
}
