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
  },
  {
    text: "Unlock Property Value",
    icon: <BanknotesIcon />,
  },
  {
    text: "Effortless Property Management",
    icon: <BuildingOffice2Icon />,
  },
  {
    text: "Smart Investments, Informed Decisions",
    icon: <SunIcon />,
  },
];
