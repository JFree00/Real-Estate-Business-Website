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
  },
];
export default function Contact() {
  return (
    <main>
      <div className={" grid grid-cols-12 relative"}>
        <div
          className={
            "bg-gradient-to-r from-sgrey-15 to-30% to-sgrey-15/0 col-span-full  h-[285px] laptop:h-[315px] desktop:h-[390px]"
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
              <SectionDescription>
                Welcome to Estatein's Contact Us page. We're here to assist you
                with any inquiries, requests, or feedback you may have.
              </SectionDescription>
            </div>
          </SectionDesignation>
        </div>
        <InfoCards.InfoCardsArea className={"m-0"} cardData={infoCards} />
        <SectionDesignation>
          <SectionHeader>Let's Connect</SectionHeader>
          <SectionDescription>
            We're excited to connect with you and learn more about your real
            estate goals. Use the form below to get in touch with Estatein.
          </SectionDescription>
          <SectionContent>
            <SubmitForm inputData={inputs} />
          </SectionContent>
        </SectionDesignation>
        <SectionDesignation pagination={false}>
          <SectionHeader>Discover Our Office Locations</SectionHeader>
          <SectionDescription>
            Estatein is here to serve you across multiple locations. Whether
            you're looking to meet our team.
          </SectionDescription>
          <SectionContent iterate={false}>
            <div>
              <div>
                <Tabs defaultValue={"All"}>
                  <TabsList className={"mb-7"}>
                    <TabsTrigger value={"All"}>All</TabsTrigger>
                    <TabsTrigger value={"Regional"}>Regional</TabsTrigger>
                    <TabsTrigger value={"International"}>
                      International
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent
                    className={
                      "flex flex-col gap-y-4 data-[state=inactive]:mt-0"
                    }
                    key={"All"}
                    value={"All"}
                  >
                    {Array.from(locations).map(([, buildings]) => {
                      return buildings.map((building) => {
                        return (
                          <SectionCards key={building.address}>
                            <SectionCards.Header className={"gap-1"}>
                              <SectionCards.Title
                                className={"text-sm font-medium"}
                              >
                                {building.type}
                              </SectionCards.Title>
                              <SectionCards.Title>
                                {building.address}
                              </SectionCards.Title>
                              <SectionCards.Description>
                                {building.description}
                              </SectionCards.Description>
                            </SectionCards.Header>
                            <SectionCards.Content
                              className={
                                "overflow-visible text-nowrap gap-2 flex-wrap"
                              }
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
                            </SectionCards.Content>
                            <SectionCards.Content
                              variant={"primary"}
                              buttonText={"Get Directions"}
                              className={
                                "overflow-visible text-nowrap gap-2 flex-wrap"
                              }
                            ></SectionCards.Content>
                          </SectionCards>
                        );
                      });
                    })}
                  </TabsContent>

                  {Array.from(locations).map(([area, buildings]) => {
                    return (
                      <TabsContent
                        key={area}
                        value={area}
                        className={
                          "flex flex-col gap-y-4 data-[state=inactive]:mt-0"
                        }
                      >
                        {buildings.map((building) => {
                          return (
                            <SectionCards key={building.address}>
                              <SectionCards.Header className={"gap-1"}>
                                <SectionCards.Title
                                  className={"text-sm font-medium"}
                                >
                                  {building.type}
                                </SectionCards.Title>
                                <SectionCards.Title>
                                  {building.address}
                                </SectionCards.Title>
                                <SectionCards.Description>
                                  {building.description}
                                </SectionCards.Description>
                              </SectionCards.Header>
                              <SectionCards.Content
                                buttonText={"Get Directions"}
                                variant={"primary"}
                                className={
                                  "overflow-visible text-nowrap gap-2 flex-wrap"
                                }
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
                              </SectionCards.Content>
                            </SectionCards>
                          );
                        })}
                      </TabsContent>
                    );
                  })}
                </Tabs>
              </div>
            </div>
          </SectionContent>
        </SectionDesignation>
        <SectionDesignation pagination={false}>
          <SectionContent iterate={false}>
            <SectionCards className={"bg-sgrey-10 overflow-hidden  relative"}>
              <div
                className={
                  "bg-waves absolute max-w-none bg-auto size-full bg-no-repeat bg-[right_-160px_top_-350px] left-0 top-0 opacity-35"
                }
              />

              <SectionCards.Header className={"*:z-0 gap-y-8 "}>
                <div
                  className={
                    "grid grid-cols-4 justify-items-center gap-2.5 *:rounded-lg *:h-[70px] z-20"
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
                </div>
                <div className={"space-y-2"}>
                  <SectionHeader>Explore Estatein's World </SectionHeader>
                  <SectionCards.Header.Description>
                    Step inside the world of Estatein, where professionalism
                    meets warmth, and expertise meets passion. Our gallery
                    offers a glimpse into our team and workspaces, inviting you
                    to get to know us better.
                  </SectionCards.Header.Description>
                </div>
                <img src={"app/assets/Image-5.webp"} />
              </SectionCards.Header>
            </SectionCards>
          </SectionContent>
        </SectionDesignation>
      </div>
    </main>
  );
}
