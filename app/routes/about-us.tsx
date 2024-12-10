// @flow
import * as React from "react";
import { SectionDesignation } from "@/components/Designations/sectionDesignation";
import { SectionHeader } from "@/components/Designations/sectionHeader";
import { SectionDescription } from "@/components/Designations/sectionDescription";
import { SectionContent } from "@/components/Designations/sectionContent";
import house from "@/assets/house.webp";
import { LinksFunction } from "react-router";
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
      <div className={" relative grid grid-cols-12 "}>
        <SectionDesignation className={"gap-x-20"} pagination={false}>
          <div className={"col-span-6 grid-cols-subgrid"}>
            <SectionHeader className={"mt-5"}>Our Journey</SectionHeader>
            <SectionDescription
              className={"text-base tablet:w-full"}
              columns={12}
            >
              Our story is one of continuous growth and evolution. We started as
              a small team with big dreams, determined to create a real estate
              platform that transcended the ordinary. Over the years, we've
              expanded our reach, forged valuable partnerships, and gained the
              trust of countless clients.
            </SectionDescription>

            <SectionContent className={"col-span-full"}>
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
            </SectionContent>
          </div>
          <div
            className={
              "relative order-first col-span-6 rounded-xl border border-sgrey-15 laptop:order-none"
            }
          >
            <img src={house} height={"100%"} alt={"House"} />
            <div
              className={
                "absolute top-0 -z-10 size-full bg-waves bg-auto  opacity-10"
              }
            />
          </div>
        </SectionDesignation>
        <SectionDesignation
          data={values}
          pagination={false}
          className={"gap-x-20"}
        >
          <div className={"col-span-5 content-center"}>
            <SectionHeader>Our Values</SectionHeader>
            <SectionDescription className={"tablet:w-full"}>
              Our story is one of continuous growth and evolution. We started as
              a small team with big dreams, determined to create a real estate
              platform that transcended the ordinary.
            </SectionDescription>
          </div>
          <SectionContent
            iterate={false}
            className={"col-start-6 overflow-visible  "}
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
            className={
              " grid-cols-1 gap-5 overflow-visible laptop:grid laptop:grid-cols-3 laptop:gap-10 [&_p]:w-[95%]"
            }
          >
            <SectionCards
              className={
                "border border-sgrey-15 p-7 outline outline-sgrey-10 laptop:p-10 laptop:outline-8 desktop:p-14"
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
          <SectionContent className={"grid-cols-1 gap-y-8 laptop:grid-cols-3"}>
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
              "gap-x-12 overflow-hidden rounded-xl p-1 laptop:overflow-visible laptop:data-[expanded=true]:grid-cols-2 "
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
            className={" gap-x-12 data-[expanded=true]:laptop:grid-cols-2"}
          >
            <ClientsCard />
          </SectionContent>
        </SectionDesignation>
      </div>
    </div>
  );
}
