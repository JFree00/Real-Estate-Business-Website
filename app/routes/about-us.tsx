// @flow
import * as React from "react";
import { SectionDesignation } from "@/components/Designations/sectionDesignation";
import { SectionHeader } from "@/components/Designations/sectionHeader";
import { SectionDescription } from "@/components/Designations/sectionDescription";
import { SectionContent } from "@/components/Designations/sectionContent";
import house from "@/assets/house.webp";
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

export const links: LinksFunction = () => {
  return [{ rel: "preload", as: "image", href: house }];
};

export default function AboutUs() {
  return (
    <div>
      <div className={" grid grid-cols-12 relative "}>
        <SectionDesignation>
          <div className={"rounded-xl border border-sgrey-15"}>
            <img src={house} width={"100%"} alt={"House"} />
          </div>
          <SectionHeader>Our Journey</SectionHeader>
          <SectionDescription>
            Our story is one of continuous growth and evolution. We started as a
            small team with big dreams, determined to create a real estate
            platform that transcended the ordinary. Over the years, we've
            expanded our reach, forged valuable partnerships, and gained the
            trust of countless clients.
          </SectionDescription>
          <SectionContent>
            <div>
              <div
                className={
                  "flex col-span-full flex-wrap gap-y-4 laptop:text-left text-center"
                }
              >
                <div className={"basis-1/2 laptop:basis-1/3 px-2"}>
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
          </SectionContent>
        </SectionDesignation>
        <SectionDesignation data={values} pagination={false}>
          <SectionHeader>Our Values</SectionHeader>
          <SectionDescription>
            Our story is one of continuous growth and evolution. We started as a
            small team with big dreams, determined to create a real estate
            platform that transcended the ordinary.
          </SectionDescription>
          <SectionContent iterate={false} className={"overflow-visible"}>
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
          <SectionContent className={"flex-col gap-5"}>
            <SectionCards></SectionCards>
          </SectionContent>
        </SectionDesignation>
        <SectionDesignation pagination={false} data={steps}>
          <SectionHeader>Navigating the Estatein Experience</SectionHeader>
          <SectionDescription>
            At Estatein, we've designed a straightforward process to help you
            find and purchase your dream property with ease. Here's a
            step-by-step guide to how it all works.
          </SectionDescription>
          <SectionContent className={"flex-col gap-y-8"}>
            <NteeCard />
          </SectionContent>
        </SectionDesignation>
      </div>
    </div>
  );
}
