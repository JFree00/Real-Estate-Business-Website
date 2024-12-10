import sarahJohnson from "@/assets/sarahJohnson.webp";
import maxMitchell from "@/assets/maxMitchell.webp";
import davidBrown from "@/assets/davidBrown.webp";
import michaelTurner from "@/assets/michaelTurner.webp";
import { namedUnknown } from "./filter";

export interface teamProps extends namedUnknown {
  name: string;
  role: string;
  image: string;
}
export const team: teamProps[] = [
  { name: "Max Mitchell", role: "Founder", image: maxMitchell },
  {
    name: "Sarah Johnson",
    role: "Chief Real Estate Officer",
    image: sarahJohnson,
  },
  {
    name: "David Brown",
    role: "Head Of Property Management",
    image: davidBrown,
  },
  {
    name: "Michael Turner",
    role: "Legal Counsel",
    image: michaelTurner,
  },
];
