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
      </div>
    </main>
  );
}
