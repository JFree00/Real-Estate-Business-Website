import villa from "@/assets/villa.webp";
import metropolitan from "@/assets/MetropolitanHaven.webp";
import rusticCottage from "@/assets/RusticCottage.webp";
import { filterDataParams } from "./filter";

export type propertyProps = filterDataParams & {
  bedrooms: number;
  bathrooms: number;
  description: string;
  image: string;
};
export const defaultProperties: propertyProps[] = [
  {
    bedrooms: 4,
    bathrooms: 3,
    property_type: "Villa",
    price: "$500,000",
    name: "Seaside Serenity Villa",
    description:
      "A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood...",
    image: villa,
    location: "Los Angeles, USA",
    size: 3500,
    build_year: 2018,
  },
  {
    bedrooms: 2,
    bathrooms: 2,
    property_type: "Villa",
    price: "$500,000",
    name: "Metropolitan Haven",
    description:
      "A chic and fully-furnished 2-bedroom apartment with panoramic city views...",
    image: metropolitan,
    location: "New York, USA",
    size: 1500,
    build_year: 2015,
  },
  {
    bedrooms: 2,
    bathrooms: 2,
    property_type: "Villa",
    price: "$500,000",
    name: "Rustic Retreat Cottage",
    description:
      "A charming 2-bedroom, 2-bathroom cottage nestled in a serene countryside setting...",
    image: rusticCottage,
    location: "London, UK",
    size: 1500,
    build_year: 2010,
  },
];
