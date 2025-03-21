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
import {
  Link,
  useLoaderData,
  useOutletContext,
  useSearchParams,
} from "react-router";
import {
  abbreviatedFilterKey,
  Filter,
  filterCategories,
  rawFilterCursor,
} from "../../data/filter";
import { PropertiesCard } from "@/components/cards/propertiesCard";
import {
  BanknotesIcon,
  CalendarIcon,
  CubeIcon,
  EnvelopeIcon,
  HomeModernIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import { SubmitForm, submitInfoProps } from "@/components/cards/submitForm";
import { Label } from "@/components/ui/label";
import { IconInput } from "@/components/iconInput";
import { Route } from "./+types/properties._index";
import { Property } from "../../data/propertyTypings";
import { useState } from "react";
import * as Sentry from "@sentry/cloudflare";

const inputs: submitInfoProps[] = [
  {
    name: "first name",
    type: "text",
    placeholder: "Enter First Name",
  },
  {
    name: "last name",
    type: "text",
    placeholder: "Enter Last Name",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Enter your Email",
  },
  {
    name: "phone",
    type: "tel",
    placeholder: "Enter Phone Number",
  },
  {
    name: "Preferred Location",
    type: "filter",
    placeholder: "Select Location",
    data: "location",
  },
  {
    name: "Property Type",
    type: "filter",
    placeholder: "Select Property Type",
    data: "property_type",
  },
  {
    name: "No. of Bathrooms",
    type: "text",
    placeholder: "Select no. of Bathrooms",
  },
  {
    name: "No. of Bedrooms",
    type: "text",
    placeholder: "Select no. of Bedrooms",
  },
  {
    name: "Budget",
    type: "number",
    placeholder: "Enter Budget",
    data: "price",
    className: "laptop:col-span-2",
  },
  {
    name: "Message",
    type: "textArea",
    placeholder: "Enter your Message here..",
    className: "order-[20] col-span-full",
  },
];
const filterIcons: Record<filterCategories, React.ReactNode> = {
  property_type: <HomeModernIcon />,
  location: <MapPinIcon />,
  build_year: <CalendarIcon />,
  price: <BanknotesIcon />,
  size: <CubeIcon />,
};
export const loader = async ({ context, request }: Route.LoaderArgs) => {
  const { properties, metadata } = context.env;

  const getCursor = async (cursorName = Filter.CURSOR) => {
    const existing = await metadata.get(cursorName);
    if (!existing || !Filter.validate(Filter.fromCursor(existing))) {
      console.warn("Cursor is either stale or invalid, creating new cursor");
      const propertieslist = await properties.list();
      const propertiesfromKV = await Promise.all(
        propertieslist.keys.map(async (key) => {
          try {
            const value = (await properties.get(key.name, {
              cacheTtl: Number(context.env.CACHETTL),
            }))!;
            const propertyMetadata = JSON.parse(value) as Property;
            propertyMetadata.metadata.name =
              propertyMetadata.metadata.name ?? propertyMetadata.name; //fail-safe
            return propertyMetadata.metadata;
          } catch (error) {
            console.error(`Failed to process property ${key.name}:`, error);
            return null;
          }
        }),
      );
      const results = propertiesfromKV.filter((p) => p !== null);
      const newcursor = Filter.toCursor(results);
      await metadata.put(cursorName, JSON.stringify(newcursor));
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
  if (filterParam.length === 0)
    return {
      properties: null,
    };
  const data = () => {
    return Filter.withEveryFilter(cursor, filterParam).map((f) => {
      return Sentry.startSpanManual(
        {
          name: "KV Request",
        },
        async (span) => {
          try {
            const data = await properties.get(f);
            return data ? (JSON.parse(data) as Property) : undefined;
          } finally {
            span.end();
          }
        },
      );
    });
  };
  return {
    properties: { items: data(), length: cursor.length },
  };
};

function SearchBar() {
  const [ref, setref] = useState<string>("");
  return (
    <div
      className={
        "flex size-16 w-full rounded-xl border border-sgrey-15 bg-sgrey-8 p-2 outline outline-sgrey-10 laptop:h-20 laptop:w-4/5 laptop:p-4 laptop:outline-8 desktop:h-[100px]  desktop:p-5"
      }
    >
      <input
        className={
          "ml-2 basis-full  rounded-xl bg-transparent placeholder:text-sgrey-40 focus:outline-0  desktop:text-2xl"
        }
        placeholder={"Search For A Property"}
        onChange={(e) => setref(e.target.value)}
        value={ref}
      />

      <Button
        size={"default"}
        variant={"primary"}
        className={"  hidden gap-x-2 laptop:flex laptop:h-full laptop:shrink-0"}
      >
        <Link className={"contents"} discover={"none"} to={`./${ref}`}>
          <MagnifyingGlassIcon className={"size-2/3"} />
          <p>Find Property</p>
        </Link>
      </Button>
      <Button
        size={"default"}
        variant={"primary"}
        className={"  gap-x-2 laptop:hidden laptop:h-full  laptop:shrink-0"}
      >
        <Link discover={"none"} className={"contents"} to={`./${ref}`}>
          <MagnifyingGlassIcon className={"size-full"} />
        </Link>
      </Button>
    </div>
  );
}

export default function PropertiesIndex() {
  const filters = useOutletContext<rawFilterCursor>();
  const { properties } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <main className={" relative grid grid-cols-12"}>
      <div
        className={
          "col-span-full grid h-[285px] grid-cols-subgrid bg-gradient-to-r from-sgrey-15 to-sgrey-15/0  to-30% laptop:h-[315px] desktop:h-[390px]"
        }
      >
        <SectionDesignation pagination={false} className={"desktop:h-[23rem]"}>
          <div
            className={
              "col-span-full grid h-full grid-cols-subgrid flex-col content-center"
            }
          >
            <SectionHeader icon={false}>Find Your Dream Property</SectionHeader>
            <SectionDescription className={"mb-14 hidden laptop:block"}>
              Welcome to Estatein, where your dream property awaits in every
              corner of our beautiful world. Explore our curated selection of
              properties, each offering a unique story and a chance to redefine
              your life. With categories to suit every dreamer, your journey to
              finding the perfect property begins here. Let us guide you through
              an exceptional selection of estates and lifestyle opportunities
              that match your unique vision.
            </SectionDescription>
            <SectionDescription className={"mb-14 laptop:hidden"}>
              Welcome to Estatein, where your dream property awaits in every
              corner of our beautiful world. Explore our curated selection of
              properties, each offering a unique story and a chance to redefine
              your life.
            </SectionDescription>
          </div>
        </SectionDesignation>
        <Separator className={"col-span-full h-px self-end"} />
      </div>
      <SectionDesignation pagination={false} className={"pt-0  laptop:-top-32"}>
        <SectionContent className={"  bottom-0 shrink-0 overflow-visible"}>
          <div className={"flex w-full basis-full flex-wrap justify-center"}>
            <SearchBar />
            <div
              className={
                "mt-5 flex w-full basis-full flex-col gap-5  rounded-xl bg-sgrey-10 p-5 laptop:mt-0 laptop:flex-row laptop:p-2.5"
              }
            >
              {filters.map(([filterName, filterValue]) => {
                return (
                  <FilterInput
                    key={filterName}
                    filterName={filterName}
                    data={filterValue}
                    icon={filterIcons[filterName]}
                    submit={(item: string) => {
                      setSearchParams(
                        (prev) => {
                          const abbreviatedItem = Filter.abbreviate(
                            filterName,
                            item,
                          );
                          const filters = searchParams.getAll("filter");

                          if (filters.includes(abbreviatedItem)) {
                            prev.delete("filter", abbreviatedItem);
                          } else {
                            prev.append("filter", abbreviatedItem);
                          }

                          return prev;
                        },
                        { preventScrollReset: true },
                      );
                    }}
                    selected={(item: string) => {
                      return searchParams
                        .getAll("filter")
                        .includes(Filter.abbreviate(filterName, item));
                    }}
                  ></FilterInput>
                );
              })}
            </div>
          </div>
        </SectionContent>
      </SectionDesignation>
      {properties?.length ? (
        <SectionDesignation
          displayAmount={3}
          pagination={true}
          data={properties}
        >
          <ArrowDownIcon
            className={
              "col-span-full mx-auto -mt-10 mb-10 size-14 animate-bounce"
            }
          />
          <SectionHeader>Discover a World of Possibilities</SectionHeader>
          <SectionDescription>
            Our portfolio of properties is as diverse as your dreams. Explore
            the following categories to find the perfect property that resonates
            with your vision of home
          </SectionDescription>
          <SectionContent>
            <PropertiesCard />
          </SectionContent>
        </SectionDesignation>
      ) : null}
      <SectionDesignation pagination={false} className={"laptop:pt-0"}>
        <SectionHeader>Let's Make it Happen</SectionHeader>
        <SectionDescription>
          Ready to take the first step toward your dream property? Fill out the
          form below, and our real estate wizards will work their magic to find
          your perfect match. Don't wait; let's embark on this exciting journey
          together.
        </SectionDescription>
        <SectionContent iterate={false}>
          <SubmitForm inputData={inputs}>
            <div className={"grid grid-cols-subgrid  laptop:col-span-2"}>
              <div className={"grid grid-cols-subgrid"}>
                <Label
                  className={"inline-block pb-2.5 text-base capitalize"}
                  htmlFor={"contact"}
                >
                  Preferred Contact Method
                </Label>
                <IconInput
                  placeholder={"Enter your Phone Number"}
                  id={"contact"}
                  name={"contact"}
                  type={"tel"}
                >
                  <PhoneIcon className={"absolute size-full"} />
                </IconInput>
              </div>
              <div>
                <Label
                  className={
                    "invisible text-base capitalize laptop:inline-block "
                  }
                  htmlFor={"em"}
                >
                  Enter Your Email
                </Label>
                <IconInput
                  className={""}
                  id={"contact"}
                  name={"em"}
                  type={"email"}
                  placeholder={"Enter Your Email"}
                >
                  <EnvelopeIcon className={"absolute size-full"} />
                </IconInput>
              </div>
            </div>
          </SubmitForm>
        </SectionContent>
      </SectionDesignation>
    </main>
  );
}
