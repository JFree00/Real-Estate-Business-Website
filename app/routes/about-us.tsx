// @flow
import * as React from "react";
import { SectionDesignation } from "@/components/Designations/sectionDesignation";
import { SectionHeader } from "@/components/Designations/sectionHeader";
import { SectionDescription } from "@/components/Designations/sectionDescription";
import { SectionContent } from "@/components/Designations/sectionContent";
import house from "@/assets/house.webp";
import aboutUsWaves from "@/assets/waves.svg";

import { LinksFunction } from "@remix-run/cloudflare";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GroupedCard } from "@/components/cards/groupedCard";
import { values } from "../../KV/values";
import { SectionCards } from "@/components/cards/sectionCards";
import { achievements } from "../../KV/achievements";
import { NteeCard } from "@/components/cards/NTEECard";
import { steps } from "../../KV/steps";
import { TeamCard } from "@/components/cards/teamCard";
import { team } from "../../KV/team";
import { clientsData } from "../../KV/clients";
import { ClientsCard } from "@/components/cards/clientsCard";

export const links: LinksFunction = () => {
  return [{ rel: "preload", as: "image", href: house }];
};

export default function AboutUs() {
  return (
    <div>
      <div className={" grid grid-cols-12 relative "}>
        <SectionDesignation className={""} pagination={false}>
          <div
            className={
              "grid  laptop:grid-cols-2 gap-x-20 order-1 laptop:order-none"
            }
          >
            <div className={"grid-cols-subgrid"}>
              <SectionHeader className={"mt-5"}>Our Journey</SectionHeader>
              <SectionDescription
                className={"tablet:w-full text-base"}
                columns={12}
              >
                Our story is one of continuous growth and evolution. We started
                as a small team with big dreams, determined to create a real
                estate platform that transcended the ordinary. Over the years,
                we've expanded our reach, forged valuable partnerships, and
                gained the trust of countless clients.
              </SectionDescription>

              <SectionContent className={"col-span-full"}>
                <div
                  className={
                    "flex col-span-full flex-wrap gap-4 laptop:text-left text-center *:flex *:flex-col *:gap-y-2 *:basis-1/3 *:laptop:basis-1/4 *:grow *:py-4 *:laptop:p-5 *:laptop:py-6 *:desktop:p-8 *:h-auto"
                  }
                >
                  <Card className={"bg-sgrey-10 basis-1/2 pr-2"}>
                    <CardHeader>
                      <CardTitle>200+</CardTitle>
                    </CardHeader>
                    <CardFooter className={""}>
                      <CardDescription>Happy Customers</CardDescription>
                    </CardFooter>
                  </Card>

                  <Card className={" *:bg-sgrey-10 basis-1/2 px-2"}>
                    <CardHeader>
                      <CardTitle>10k+</CardTitle>
                    </CardHeader>
                    <CardFooter>
                      <CardDescription>Properties For Clients</CardDescription>
                    </CardFooter>
                  </Card>

                  <Card className={" px-2"}>
                    <CardHeader>
                      <CardTitle>16+</CardTitle>
                    </CardHeader>
                    <CardFooter>
                      <CardDescription>Years Of Experience</CardDescription>
                    </CardFooter>
                  </Card>
                </div>
              </SectionContent>
            </div>
            <div
              className={
                "rounded-xl border  relative border-sgrey-15  order-first laptop:order-none"
              }
            >
              <img src={house} height={"100%"} alt={"House"} />
              <div
                className={
                  "bg-waves bg-auto size-full absolute opacity-10 -z-10  top-0"
                }
              />
            </div>
          </div>
        </SectionDesignation>
        <SectionDesignation data={values} pagination={false}>
          <div className={"grid grid-cols-1 laptop:grid-cols-3 gap-x-14"}>
            <div className={"content-center"}>
              <SectionHeader>Our Values</SectionHeader>
              <SectionDescription className={"tablet:w-full"}>
                Our story is one of continuous growth and evolution. We started
                as a small team with big dreams, determined to create a real
                estate platform that transcended the ordinary.
              </SectionDescription>
            </div>
            <SectionContent
              iterate={false}
              className={"overflow-visible col-span-1 laptop:col-span-2 block"}
            >
              <GroupedCard />
            </SectionContent>
          </div>
        </SectionDesignation>
        <SectionDesignation data={achievements} pagination={false}>
          <SectionHeader>Our Achievements</SectionHeader>
          <SectionDescription>
            Our story is one of continuous growth and evolution. We started as a
            small team with big dreams, determined to create a real estate
            platform that transcended the ordinary.
          </SectionDescription>
          <SectionContent
            className={
              " gap-5 overflow-visible laptop:gap-10 laptop:grid grid-cols-1 laptop:grid-cols-3 [&_p]:w-[95%]"
            }
          >
            <SectionCards
              className={
                "outline outline-sgrey-10 laptop:outline-8 border border-sgrey-15 p-7 laptop:p-10 desktop:p-14"
              }
            ></SectionCards>
          </SectionContent>
        </SectionDesignation>
        <SectionDesignation pagination={false} data={steps}>
          <SectionHeader>Navigating the Estatein Experience</SectionHeader>
          <SectionDescription>
            At Estatein, we've designed a straightforward process to help you
            find and purchase your dream property with ease. Here's a
            step-by-step guide to how it all works.
          </SectionDescription>
          <SectionContent className={"gap-y-8 grid-cols-1 laptop:grid-cols-3"}>
            <NteeCard
              className={
                "[&:nth-child(n+4)]:hidden [&:nth-child(n+4)]:laptop:flex"
              }
            />
          </SectionContent>
        </SectionDesignation>
        <SectionDesignation pagination={false} data={team}>
          <SectionHeader>Meet the Estatein Team</SectionHeader>
          <SectionDescription>
            At Estatein, our success is driven by the dedication and expertise
            of our team. Get to know the people behind our mission to make your
            real estate dreams a reality.
          </SectionDescription>
          <SectionContent
            className={"grid-cols-1 laptop:grid-cols-4"}
            amountToDisplay={team.length}
          >
            <TeamCard />
          </SectionContent>
        </SectionDesignation>

        <SectionDesignation displayAmount={2} data={clientsData} className={""}>
          <SectionHeader>Our Valued Clients</SectionHeader>
          <SectionDescription>
            At Estatein, we have had the privilege of working with a diverse
            range of clients across various industries. Here are some of the
            clients we've had the pleasure of serving
          </SectionDescription>
          <SectionContent
            className={
              "laptop:data-[expanded=true]:grid-cols-2 gap-x-12 overflow-hidden laptop:overflow-visible p-1 rounded-xl "
            }
          >
            <ClientsCard />
          </SectionContent>
        </SectionDesignation>
        <SectionDesignation
          data={clientsData}
          displayAmount={2}
          className={"hidden"}
        >
          <SectionHeader>Our Valued Clients</SectionHeader>
          <SectionDescription>
            At Estatein, we have had the privilege of working with a diverse
            range of clients across various industries. Here are some of the
            clients we've had the pleasure of serving
          </SectionDescription>
          <SectionContent
            className={" data-[expanded=true]:laptop:grid-cols-2 gap-x-12"}
          >
            <ClientsCard />
          </SectionContent>
        </SectionDesignation>
      </div>
    </div>
  );
}
