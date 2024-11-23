// @flow
import * as React from "react";
import { SectionDesignation } from "@/components/Designations/sectionDesignation";
import { SectionHeader } from "@/components/Designations/sectionHeader";
import { SectionDescription } from "@/components/Designations/sectionDescription";
import { SectionContent } from "@/components/Designations/sectionContent";
import { Button } from "@/components/ui/button";
import {
  ArrowDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Separator } from "@/components/ui/separator";
import { FilterInput } from "@/components/filterInput";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { defaultProperties, propertyProps } from "../../KV/properties";
import { abbreviatedFilterKey, Filter, rawFilterCursor } from "../../KV/filter";
import { PropertiesCard } from "@/components/cards/propertiesCard";

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const { properties, metadata } = context.env;

  const getCursor = async (cursorName = Filter.cursor) => {
    const existing = await metadata.get(cursorName);
    if (!existing || !Filter.validate(Filter.fromCursor(existing))) {
      console.warn("Cursor is either stale or invalid, creating new cursor");
      const newcursor = Filter.toCursor(defaultProperties);
      metadata.put(cursorName, JSON.stringify(newcursor));
      return newcursor;
    }
    return Filter.fromCursor(existing);
  };
  const cursor = await getCursor();
  const filterParam = new URL(request.url).searchParams
    .getAll("filter")
    .map((filter) => {
      return filter as abbreviatedFilterKey;
    });
  const data = async () => {
    if (filterParam.length !== 0) {
      return await Promise.all(
        Filter.anyWithFilter(cursor, filterParam).map(async (f) => {
          return properties
            .getWithMetadata(f)
            .then(
              (data) => JSON.parse(data.metadata as string) as propertyProps,
            );
        }),
      );
    }
    return [];
  };
  return {
    properties: await data(),
  };
};
export default function PropertiesIndex() {
  const filters = useOutletContext<rawFilterCursor>();
  const { properties } = useLoaderData<typeof loader>();
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
                {filters.map(([filterName, filterValue]) => {
                  return (
                    <FilterInput
                      key={filterName}
                      filterName={filterName}
                      data={filterValue}
                    ></FilterInput>
                  );
                })}
              </div>
            </div>
          </SectionContent>
        </SectionDesignation>
        {properties && properties.length ? (
          <SectionDesignation pagination={true} data={properties}>
            <ArrowDownIcon
              className={"animate-bounce size-14 -mt-10 mb-10 mx-auto"}
            />
            <SectionHeader>Discover a World of Possibilities</SectionHeader>
            <SectionDescription>
              Our portfolio of properties is as diverse as your dreams. Explore
              the following categories to find the perfect property that
              resonates with your vision of home
            </SectionDescription>
            <SectionContent>
              <PropertiesCard />
            </SectionContent>
          </SectionDesignation>
        ) : null}
      </div>
    </div>
  );
}
