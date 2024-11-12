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
        <SectionDesignation
          className={"laptop:flex laptop:gap-10"}
          pagination={false}
        >
          <div className={"basis-2/3"}>
            <div
              className={
                "rounded-xl border border-sgrey-15 laptop:hidden flex content-end"
              }
              style={{
                backgroundImage: `url(${aboutUsWaves})`,
                backgroundRepeat: "no-repeat",
              }}
            >
              <img src={house} height={"100%"} alt={"House"} />
            </div>
            <SectionHeader className={"mt-5"}>Our Journey</SectionHeader>
            <SectionDescription
              className={"tablet:w-full text-base"}
              columns={12}
            >
              Our story is one of continuous growth and evolution. We started as
              a small team with big dreams, determined to create a real estate
              platform that transcended the ordinary. Over the years, we've
              expanded our reach, forged valuable partnerships, and gained the
              trust of countless clients.
            </SectionDescription>

            <SectionContent>
              <div className={"w-full"}>
                <div
                  className={
                    "flex col-span-full flex-wrap gap-y-4 laptop:text-left text-center"
                  }
                >
                  <div className={"basis-1/2 laptop:basis-1/3 pr-2"}>
                    <Card className={" pb-0  p-4 "}>
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
                        <CardDescription>
                          Properties For Clients
                        </CardDescription>
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
            </SectionContent>
          </div>
          <div
            className={
              "rounded-xl border border-sgrey-15 basis-3/4 content-end hidden laptop:flex"
            }
            style={{
              backgroundImage: `url(${aboutUsWaves})`,
              backgroundRepeat: "no-repeat",
            }}
          >
            <img src={house} height={"100%"} alt={"House"} />
          </div>
        </SectionDesignation>
        <SectionDesignation
          className={"laptop:flex laptop:items-center laptop:gap-10"}
          data={values}
          pagination={false}
        >
          <div className={"basis-1/3 shrink-0"}>
            <SectionHeader>Our Values</SectionHeader>
            <SectionDescription className={"tablet:w-full"}>
              Our story is one of continuous growth and evolution. We started as
              a small team with big dreams, determined to create a real estate
              platform that transcended the ordinary.
            </SectionDescription>
          </div>
          <SectionContent
            iterate={false}
            className={"overflow-visible laptop:basis-1/2 laptop:grow"}
          >
            <GroupedCard />
          </SectionContent>
        </SectionDesignation>
        <SectionDesignation data={achievements} pagination={false}>
          <SectionHeader>Our Achievements</SectionHeader>
          <SectionDescription>
            Our story is one of continuous growth and evolution. We started as a
            small team with big dreams, determined to create a real estate
            platform that transcended the ordinary.
          </SectionDescription>
          <SectionContent
            className={"flex-col laptop:flex-row gap-5 overflow-visible"}
          >
            <SectionCards
              className={"outline outline-sgrey-10 border border-sgrey-15"}
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
          <SectionContent
            className={"flex-col laptop:flex-row laptop:flex-wrap gap-y-8"}
          >
            <NteeCard />
          </SectionContent>
        </SectionDesignation>
        <SectionDesignation
          pagination={false}
          data={team}
          paginationDisplayAmount={4}
        >
          <SectionHeader>Meet the Estatein Team</SectionHeader>
          <SectionDescription>
            At Estatein, our success is driven by the dedication and expertise
            of our team. Get to know the people behind our mission to make your
            real estate dreams a reality.At Estatein, our success is driven by
            the dedication and expertise of our team. Get to know the people
            behind our mission to make your real estate dreams a reality.
          </SectionDescription>
          <SectionContent
            className={"flex-col laptop:flex-row"}
            amountToDisplay={4}
          >
            <TeamCard />
          </SectionContent>
        </SectionDesignation>
        <SectionDesignation data={clientsData} paginationDisplayAmount={1}>
          <SectionHeader>Our Valued Clients</SectionHeader>
          <SectionDescription>
            At Estatein, we have had the privilege of working with a diverse
            range of clients across various industries. Here are some of the
            clients we've had the pleasure of serving
          </SectionDescription>
          <SectionContent className={"overflow-visible"}>
            <ClientsCard />
          </SectionContent>
        </SectionDesignation>
      </div>
    </div>
  );
}
