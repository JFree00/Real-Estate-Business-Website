import React from "react";
import {
  AcademicCapIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

export interface valuesProps {
  name: string;
  description: string;
  icon: React.ReactNode;
}

export const values = [
  {
    name: "Trust",
    description:
      "Trust is the cornerstone of every successful real estate transaction.",
    icon: <StarIcon />,
  },
  {
    name: "Excellence",
    description:
      "We set the bar high for ourselves. From the properties we list to the services we provide.",
    icon: <AcademicCapIcon />,
  },
  {
    name: "Client-Centric",
    description:
      "Your dreams and needs are at the center of our universe. We listen, understand.",
    icon: <UserGroupIcon />,
  },
  {
    name: "Our Commitment",
    description:
      "We are dedicated to providing you with the highest level of service, professionalism",
    icon: <StarIcon />,
  },
];
