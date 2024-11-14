// @flow
import * as React from "react";
import { SectionDesignation } from "@/components/Designations/sectionDesignation";
import { SectionHeader } from "@/components/Designations/sectionHeader";
import { SectionDescription } from "@/components/Designations/sectionDescription";
import { SectionContent } from "@/components/Designations/sectionContent";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Separator } from "@/components/ui/separator";
import { FilterInput } from "@/components/filterInput";

const filterKeys = [
  "Location",
  "Property Type",
  "Price Range",
  "Property Size",
  "Build Year",
];

export default function Properties() {
  return (
    <div>
      <div className={" grid grid-cols-12 relative "}>
        <div
          className={
            "bg-gradient-to-r from-sgrey-15 to-30% to-sgrey-15/0 col-span-full "
          }
        >
          <SectionDesignation pagination={false}>
            <SectionHeader>Find Your Dream Property</SectionHeader>
            <SectionDescription className={"mb-14"}>
              Welcome to Estatein, where your dream property awaits in every
              corner of our beautiful world. Explore our curated selection of
              properties, each offering a unique story and a chance to redefine
              your life. With categories to suit every dreamer, your journey{" "}
            </SectionDescription>
          </SectionDesignation>
          <Separator className={"h-px"} />
        </div>
        <SectionDesignation pagination={false} className={"col-span-full"}>
          <SectionHeader> </SectionHeader>
          <SectionDescription> </SectionDescription>
          <SectionContent className={"  bottom-0 overflow-visible shrink-0"}>
            <div className={"basis-full flex w-full flex-wrap"}>
              <div
                className={
                  "basis-full w-full flex size-16 outline-sgrey-10 outline rounded-xl p-2 border border-sgrey-15"
                }
              >
                <input
                  className={
                    "focus:outline-0 bg-transparent  rounded-xl basis-full ml-2"
                  }
                  placeholder={"Search For A Property"}
                />
                <Button
                  size={"icon"}
                  variant={"primary"}
                  className={"basis-2/12 h-full"}
                >
                  <MagnifyingGlassIcon className={"size-2/4"} />
                </Button>
              </div>
              <div
                className={
                  "basis-full flex flex-col gap-5 w-full  rounded-xl bg-sgrey-10 mt-5 p-5"
                }
              >
                {filterKeys.map((key) => (
                  <FilterInput
                    placeholder={key}
                    data={["sd", "ds", "dsd"]}
                  ></FilterInput>
                ))}
              </div>
            </div>
          </SectionContent>
        </SectionDesignation>
      </div>
    </div>
  );
}
