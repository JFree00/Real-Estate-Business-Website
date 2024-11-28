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
import {
  useLoaderData,
  useOutletContext,
  useSearchParams,
} from "@remix-run/react";
import { defaultProperties, propertyProps } from "../../KV/properties";
import {
  abbreviatedFilterKey,
  Filter,
  filterCategories,
  rawFilterCursor,
} from "../../KV/filter";
import { PropertiesCard } from "@/components/cards/propertiesCard";
import {
  BanknotesIcon,
  CalendarIcon,
  CubeIcon,
  HomeModernIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { SubmitForm } from "@/components/cards/submitForm";

const filterIcons: { [k in filterCategories]: React.ReactNode } = {
  property_type: <HomeModernIcon />,
  location: <MapPinIcon />,
  build_year: <CalendarIcon />,
  price: <BanknotesIcon />,
  size: <CubeIcon />,
};

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
        Filter.withEveryFilter(cursor, filterParam).map(async (f) => {
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
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div>
      <div className={" grid grid-cols-12 relative "}>
        <div
          className={
            "bg-gradient-to-r from-sgrey-15 to-30% to-sgrey-15/0 col-span-full "
          }
        >
          <SectionDesignation
            pagination={false}
            className={"desktop:h-[370px]"}
          >
            <div className={"h-full flex-col content-center"}>
              <SectionHeader icon={false}>
                Find Your Dream Property
              </SectionHeader>
              <SectionDescription className={"mb-14"}>
                Welcome to Estatein, where your dream property awaits in every
                corner of our beautiful world. Explore our curated selection of
                properties, each offering a unique story and a chance to
                redefine your life. With categories to suit every dreamer, your
                journey{" "}
              </SectionDescription>
            </div>
          </SectionDesignation>
          <Separator className={"h-px"} />
        </div>
        <SectionDesignation
          pagination={false}
          className={"mt-0  laptop:-top-32"}
        >
          <SectionContent className={"  bottom-0 overflow-visible shrink-0"}>
            <div className={"basis-full flex w-full flex-wrap justify-center"}>
              <div
                className={
                  " w-full flex size-16 laptop:h-20 desktop:h-[100px] outline-sgrey-10 outline laptop:outline-8 rounded-xl p-2 laptop:p-4 desktop:p-5 border border-sgrey-15 bg-sgrey-8  laptop:w-[80%]"
                }
              >
                <input
                  className={
                    "focus:outline-0 bg-transparent  rounded-xl basis-full ml-2 desktop:text-2xl  placeholder:text-sgrey-40"
                  }
                  placeholder={"Search For A Property"}
                />
                <Button
                  size={"default"}
                  variant={"primary"}
                  className={
                    "  laptop:shrink-0 laptop:h-full gap-x-2 hidden laptop:flex"
                  }
                >
                  <MagnifyingGlassIcon className={"size-2/3"} />
                  <p className={"b"}>Find Property</p>
                </Button>{" "}
                <Button
                  size={"default"}
                  variant={"primary"}
                  className={
                    "  laptop:shrink-0 laptop:h-full gap-x-2  laptop:hidden"
                  }
                >
                  <MagnifyingGlassIcon className={"size-2/3"} />
                  <p className={"b"}>Find Property</p>
                </Button>
              </div>
              <div
                className={
                  "basis-full flex flex-col laptop:flex-row gap-5 w-full  rounded-xl bg-sgrey-10 mt-5 laptop:mt-0 p-5 laptop:p-2.5"
                }
              >
                {filters.map(([filterName, filterValue]) => {
                  return (
                    <FilterInput
                      key={filterName}
                      filterName={filterName}
                      data={filterValue}
                      icon={filterIcons[filterName as filterCategories]}
                      submit={(item: string) => {
                        setSearchParams((prev) => {
                          const abbreviatedItem = Filter.abbreviate(
                            filterName as filterCategories,
                            item,
                          );
                          const filters = searchParams.getAll("filter");

                          if (filters.includes(abbreviatedItem)) {
                            prev.delete("filter", abbreviatedItem);
                          } else {
                            prev.append("filter", abbreviatedItem);
                          }

                          return prev;
                        });
                      }}
                      selected={(item: string) => {
                        return searchParams
                          .getAll("filter")
                          .includes(
                            Filter.abbreviate(
                              filterName as filterCategories,
                              item,
                            ),
                          );
                      }}
                    ></FilterInput>
                  );
                })}
              </div>
            </div>
          </SectionContent>
        </SectionDesignation>
        {properties && properties.length ? (
          <SectionDesignation
            displayAmount={3}
            pagination={true}
            data={properties}
          >
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
        <SectionDesignation pagination={false}>
          <SectionHeader>Let's Make it Happen</SectionHeader>
          <SectionDescription>
            Ready to take the first step toward your dream property? Fill out
            the form below, and our real estate wizards will work their magic to
            find your perfect match. Don't wait; let's embark on this exciting
            journey together.
          </SectionDescription>
          <SectionContent iterate={false}>
            <SubmitForm />
          </SectionContent>
        </SectionDesignation>
      </div>
    </div>
  );
}
