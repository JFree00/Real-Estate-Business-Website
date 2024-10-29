import { title } from "@/config.shared";
import type { MetaFunction } from "@remix-run/cloudflare";

import homeBuildings from "@/assets/homeBuildings.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import circle from "@/assets/circleText.svg";
import * as React from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { InfoCards } from "@/components/infoCards";
import {
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
  SunIcon,
} from "@heroicons/react/20/solid";
import { BanknotesIcon } from "@heroicons/react/24/solid";
import { SectionDesignation } from "@/components/Designations/sectionDesignation";
import { SectionHeader } from "@/components/Designations/sectionHeader";
import { SectionDescription } from "@/components/Designations/sectionDescription";
import { SectionContent } from "@/components/Designations/sectionContent";
export const meta: MetaFunction = () => {
  return [
    { title: title() },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main>
      <div className={"grid grid-cols-12 grid-rows-12 relative"}>
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
        <div className={"col-span-5 row-span-3 col-start-2"}>
          <div
            className={" w-11/12 grid grid-cols-6 grid-rows-4 mt-36 gap-x-4"}
          >
            <div className={"font-semibold text-balance col-span-6 h-1/4"}>
              <p className={"text-6xl"} style={{ lineHeight: "1.2" }}>
                Discover Your Dream Property with Estatein
              </p>
            </div>
            <h5
              className={"col-span-6 self-center text-sgrey-60 -mt-5 text-lg"}
            >
              Your journey to finding the perfect property begins here. Explore
              our listings to find the home that matches your dreams.
            </h5>
            <div className={"col-span-6 h-2/4"}>
              <div className={"flex gap-x-3 items-center"}>
                <div className={"basis-1/5"}>
                  <Button variant={"active"} className={"px-6 h-16"}>
                    Learn More
                  </Button>
                </div>
                <div className={"basis-3/4"}>
                  <Button
                    variant={"default"}
                    className={"bg-pprimary-60 px-6 h-16"}
                  >
                    Browse Properties
                  </Button>
                </div>
              </div>
            </div>
            <div className={"col-span-2"}>
              <Card>
                <CardHeader>
                  <CardTitle>200+</CardTitle>
                </CardHeader>
                <CardFooter>Happy Customers</CardFooter>
              </Card>
            </div>
            <div className={"col-span-2"}>
              <Card>
                <CardHeader>
                  <CardTitle>10k+</CardTitle>
                </CardHeader>
                <CardFooter>Properties For Clients</CardFooter>
              </Card>
            </div>
            <div className={"col-span-2"}>
              <Card>
                <CardHeader>
                  <CardTitle>16+</CardTitle>
                </CardHeader>
                <CardFooter>Years Of Experience</CardFooter>
              </Card>
            </div>
          </div>
        </div>

        <div
          className={"col-span-6 row-span-3 overflow-hidden"}
          style={{ maxHeight: "100%" }}
        >
          <img
            src={homeBuildings}
            loading={"lazy"}
            alt={"Real Estate"}
            width={"100%"}
          />
        </div>
        <div
          className={"col-span-12 border border-sgrey-15"}
          style={{
            height: "95%",
          }}
        >
          <div className={"mx-4 mt-5 flex gap-x-5 h-full"}>
            <InfoCards
              text={"Find Your Dream Home"}
              icon={<BuildingStorefrontIcon />}
            />
            <InfoCards
              text={"Unlock Property Value"}
              icon={<BanknotesIcon />}
            />
            <InfoCards
              text={"Effortless Property Management"}
              icon={<BuildingOffice2Icon />}
            />
            <InfoCards
              text={"Smart Investments, Informed Decisions"}
              icon={<SunIcon />}
            />
          </div>
        </div>
        <SectionDesignation>
          <SectionHeader>Featured Properties</SectionHeader>
          <SectionDescription>
            Explore our handpicked selection of featured properties. Each
            listing offers a glimpse into exceptional homes and investments
            available through Estatein. Click "View Details" for more
            information.
          </SectionDescription>
          <SectionContent columns={6}>
            <div className={"col-span-2"}>
              <Card className={"size-full"}></Card>
            </div>
          </SectionContent>
        </SectionDesignation>
      </div>
    </main>
  );
}
