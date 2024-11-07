import { propertyProps } from "@/components/propertiesCard";
import villa from "@/assets/villa.webp";
import metropolitan from "@/assets/MetropolitanHaven.webp";
import rusticCottage from "@/assets/RusticCottage.webp";

export const defaultProperties: propertyProps[] = [
  {
    bedrooms: 4,
    bathrooms: 3,
    propertyType: "Villa",
    price: "$500,000",
    name: "Seaside Serenity Villa",
    description:
      "A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood...",
    image: villa,
  },
  {
    bedrooms: 2,
    bathrooms: 2,
    propertyType: "Villa",
    price: "$500,000",
    name: "Metropolitan Haven",
    description:
      "A chic and fully-furnished 2-bedroom apartment with panoramic city views...",
    image: metropolitan,
  },
  {
    bedrooms: 2,
    bathrooms: 2,
    propertyType: "Villa",
    price: "$500,000",
    name: "Rustic Retreat Cottage",
    description:
      "A charming 2-bedroom, 2-bathroom cottage nestled in a serene countryside setting...",
    image: rusticCottage,
  },
];
