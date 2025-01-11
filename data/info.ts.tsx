import { infoCardProps } from "@/components/cards/infoCards";
import {
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
  SunIcon,
} from "@heroicons/react/20/solid";
import { BanknotesIcon } from "@heroicons/react/24/solid";

export const indexInfoCard: infoCardProps[] = [
  {
    text: "Find Your Dream Home",
    icon: <BuildingStorefrontIcon />,
    id: "find-home",
    path: "/properties",
  },
  {
    text: "Unlock Property Value",
    icon: <BanknotesIcon />,
    id: "unlock-value",
    path: "/services",
  },
  {
    text: "Effortless Property Management",
    icon: <BuildingOffice2Icon />,
    id: "property-management",
    path: "/services",
  },
  {
    text: "Smart Investments, Informed Decisions",
    icon: <SunIcon />,
    id: "smart-investments",
    path: "/services",
  },
];
