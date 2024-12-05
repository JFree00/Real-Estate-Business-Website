// @flow
import * as React from "react";
import { SectionDesignation } from "@/components/Designations/sectionDesignation";
import { SectionHeader } from "@/components/Designations/sectionHeader";
import { SectionDescription } from "@/components/Designations/sectionDescription";
import InfoCards, { infoCardProps } from "@/components/cards/infoCards";
import {
  EnvelopeIcon,
  FireIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import { SubmitForm, submitInfoProps } from "@/components/cards/submitForm";
import { SectionContent } from "@/components/Designations/sectionContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { companyEmail, companyPhone, locations } from "../../KV/locations";
import { SectionCards } from "@/components/cards/sectionCards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const infoCards: infoCardProps[] = [
  {
    text: "info@estatein.com",
    icon: <EnvelopeIcon />,
  },
  {
    text: "+1 (123) 456-7890",
    icon: <PhoneIcon />,
  },
  {
    text: "Main Headquarters",
    icon: <MapPinIcon />,
  },
  {
    text: "Socials",
    icon: <FireIcon />,
  },
];
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
    name: "Inquiry Type",
    type: "dropdown",
    placeholder: "Select Inquiry Type",
    data: ["Buying", "Selling", "Renting", "Other"],
  },
  {
    name: "How Did You Hear About Us?",
    type: "dropdown",
    placeholder: "Select",
    data: ["Google", "Facebook", "Instagram", "Other"],
  },
  {
    name: "Message",
    type: "textArea",
    placeholder: "Enter your Message here..",
    className: "col-span-full",
  },
];
function LocationCard() {
  const locationMap: typeof locations = new Map();
  locations.forEach((building, area) => {
    locationMap.set(area, building);
  });
  locationMap.set("All", Array.from(locationMap.values()).flat());

  return Array.from(locationMap).map(([area, buildings]) => {
    return (
      <TabsContent
        key={area}
        value={area}
        className={"col-span-full grid laptop:grid-cols-subgrid "}
      >
        {buildings.map((building) => {
          return (
            <SectionCards key={building.address} className={" row-span-3"}>
              <SectionCards.Header className={"gap-3"}>
                <SectionCards.Title
                  className={"text-sm desktop:text-sm font-medium"}
                >
                  {building.type}
                </SectionCards.Title>
                <SectionCards.Title>{building.address}</SectionCards.Title>
                <SectionCards.Description className={""}>
                  {building.description}
                </SectionCards.Description>
              </SectionCards.Header>
              <SectionCards.Content
                variant={"primary"}
                className={"gap-2 flex-wrap"}
              >
                <Badge variant={"card"} className={"px-4"}>
                  <EnvelopeIcon className={"size-5"} />
                  {building.email ?? companyEmail}
                </Badge>
                <Badge variant={"card"} className={"px-4"}>
                  <PhoneIcon className={"size-5"} />
                  {building.phone ?? companyPhone}
                </Badge>
                <Badge variant={"card"} className={"px-4"}>
                  <MapPinIcon className={"size-5"} />
                  {building.cityType}
                </Badge>
              </SectionCards.Content>{" "}
              <Button
                size={"responsive"}
                className={"bg-pprimary-60 laptop:w-full"}
              >
                Get Directions
              </Button>
            </SectionCards>
          );
        })}
      </TabsContent>
    );
  });
}
export default function Contact() {
  return (
    <main>
      <div className={" grid grid-cols-12 relative"}>
        <div
          className={
            "bg-gradient-to-r from-sgrey-15 to-30% to-sgrey-15/0 col-span-full  h-[18rem] laptop:h-[19.5rem] desktop:h-[24.5rem]"
          }
        >
          <SectionDesignation
            pagination={false}
            className={"h-full mt-0 content-center"}
          >
            <div className={"my-auto"}>
              <SectionHeader icon={false}>
                Get in Touch with Estatein
              </SectionHeader>
              <SectionDescription className={"laptop:hidden"}>
                Welcome to Estatein's Contact Us page. We're here to assist you
                with any inquiries, requests, or feedback you may have.
              </SectionDescription>
              <SectionDescription className={"hidden laptop:flex"}>
                Welcome to Estatein's Contact Us page. We're here to assist you
                with any inquiries, requests, or feedback you may have. Whether
                you're looking to buy or sell a property, explore investment
                opportunities, or simply want to connect, we're just a message
                away. Reach out to us, and let's start a conversation.
              </SectionDescription>
            </div>
          </SectionDesignation>
        </div>
        <InfoCards.InfoCardsArea className={"m-0"} cardData={infoCards} />
        <SectionDesignation pagination={false}>
          <SectionHeader>Let's Connect</SectionHeader>
          <SectionDescription className={"laptop:hidden"}>
            We're excited to connect with you and learn more about your real
            estate goals. Use the form below to get in touch with Estatein.
          </SectionDescription>
          <SectionDescription className={"hidden laptop:flex"}>
            We're excited to connect with you and learn more about your real
            estate goals. Use the form below to get in touch with Estatein.
            Whether you're a prospective client, partner, or simply curious
            about our services, we're here to answer your questions and provide
            the assistance you need.
          </SectionDescription>
          <SectionContent>
            <SubmitForm
              className={"laptop:p-16 laptop:grid-cols-3"}
              inputData={inputs}
            />
          </SectionContent>
        </SectionDesignation>
        <SectionDesignation pagination={false}>
          <SectionHeader>Discover Our Office Locations</SectionHeader>
          <SectionDescription className={"laptop:hidden"}>
            Estatein is here to serve you across multiple locations. Whether
            you're looking to meet our team.
          </SectionDescription>
          <SectionDescription className={"hidden laptop:flex"}>
            Estatein is here to serve you across multiple locations. Whether
            you're looking to meet our team, discuss real estate opportunities,
            or simply drop by for a chat, we have offices conveniently located
            to serve your needs. Explore the categories below to find the
            Estatein office nearest to you
          </SectionDescription>
          <SectionContent iterate={false} className={"grid-cols-2"}>
            <Tabs
              defaultValue={"All"}
              className={"grid col-span-full grid-cols-subgrid"}
            >
              <TabsList
                className={
                  "mb-7 flex *:basis-1/3 laptop:w-1/3 desktop:w-1/4 *:rounded-lg col-span-full"
                }
              >
                <TabsTrigger value={"All"}>All</TabsTrigger>
                <TabsTrigger value={"Regional"}>Regional</TabsTrigger>
                <TabsTrigger value={"International"}>International</TabsTrigger>
              </TabsList>

              <LocationCard />
            </Tabs>
          </SectionContent>
        </SectionDesignation>
        <SectionDesignation pagination={false}>
          <SectionContent iterate={false} className={"row-span-4 "}>
            <SectionCards
              className={
                "bg-sgrey-10 overflow-hidden  relative desktop:p-16 grid grid-cols-4 *:gap-2.5 *:laptop:gap-5 row-span-5 laptop:row-span-2 *:z-10 "
              }
            >
              <div
                className={
                  "bg-waves absolute max-w-none bg-auto size-full bg-no-repeat bg-[right_-160px_top_-350px] left-0 top-0 opacity-35 order-last "
                }
              />
              <SectionCards.Header
                className={
                  "space-y-0 col-span-full grid grid-cols-subgrid *:z-0 *:rounded-lg *:w-full"
                }
              >
                <img
                  alt={"Estatein Team"}
                  className={"col-span-2"}
                  src={"app/assets/Image.webp"}
                />
                <img
                  alt={"Estatein Team"}
                  className={"col-span-2"}
                  src={"app/assets/Image-2.webp"}
                />
                <img
                  alt={"Estatein Team"}
                  className={"col-span-2"}
                  src={"app/assets/Image-1.webp"}
                />
                <img alt={"Estatein Team"} src={"app/assets/Image-3.webp"} />
                <img alt={"Estatein Team"} src={"app/assets/Image-4.webp"} />
              </SectionCards.Header>

              <div className={" block col-span-full laptop:col-span-2"}>
                <SectionHeader>Explore Estatein's World </SectionHeader>
                <SectionDescription className={"laptop:w-11/12"}>
                  Step inside the world of Estatein, where professionalism meets
                  warmth, and expertise meets passion. Our gallery offers a
                  glimpse into our team and workspaces, inviting you to get to
                  know us better.
                </SectionDescription>
              </div>
              <img
                src={"app/assets/Image-5.webp"}
                className={"col-span-4 laptop:col-span-2 w-full"}
              />
            </SectionCards>
          </SectionContent>
        </SectionDesignation>
      </div>
    </main>
  );
}
