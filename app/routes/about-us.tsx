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
      </div>
    </div>
  );
}
