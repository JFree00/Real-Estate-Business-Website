import villa from "@/assets/villa.webp";
import metropolitan from "@/assets/MetropolitanHaven.webp";
import rusticCottage from "@/assets/RusticCottage.webp";
import { Property } from "./propertyTypings";

export const defaultProperties: Property[] = [
  {
    name: "Seaside Serenity Villa",
    description:
      "Discover your own piece of paradise with the Seaside Serenity Villa. T With an open floor plan, breathtaking ocean views from every room, and direct access to a pristine sandy beach, this property is the epitome of coastal living.",
    features: [
      {
        description: "Expansive oceanfront terrace for outdoor entertaining",
        type: "amenity",
      },
      {
        description:
          "Master suite with a spa-inspired bathroom and ocean-facing balcony",
        type: "amenity",
      },
      {
        description:
          "Private beach access for morning strolls and sunset views",
        type: "location",
      },
      {
        description: "Private garage and ample storage space",
        type: "security",
      },
      {
        description: "Gourmet kitchen with top-of-the-line appliances",
        type: "luxury",
      },
    ],
    previewImages: "Seaside Serenity Villa",
    metadata: {
      name: "Seaside Serenity Villa",
      bedrooms: 4,
      bathrooms: 3,
      property_type: "Villa",
      price: "$500,000",
      description:
        "A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood...",
      image: villa,
      location: "Los Angeles, USA",
      size: 3500,
      build_year: 2018,
    },
    pricing: {
      monthlyCost: {
        propertyTax: 300,
        hoa: 200,
      },
      initialCost: {
        downPayment: 100000,
        listingPrice: 500000,
        mortgage: 400000,
        additionalFees: {
          transfer: 5000,
          inspection: 300,
          mortgage: null,
          legal: 1000,
          insurance: 500,
        },
      },
      monthlyExpenses: {
        insurance: 200,
        mortgage: null,
      },
      additionalFees: {
        transfer: 5000,
        inspection: 300,
        mortgage: null,
        legal: 1000,
        insurance: 500,
      },
    },
  },
  {
    name: "Metropolitan Haven",
    description:
      "Enjoy the best of city living with the Metropolitan Haven. This chic and fully-furnished 2-bedroom apartment offers panoramic city views, a spacious open-concept layout, and a prime location in the heart of the city.",
    features: [
      {
        description: "2 bedrooms",
        type: "amenity",
      },
      {
        description: "2 bathrooms",
        type: "amenity",
      },
      {
        description: "1500 sq ft",
        type: "amenity",
      },
      {
        description: "Built in 2015",
        type: "location",
      },
    ],
    previewImages: "Metropolitan Haven",
    metadata: {
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
    pricing: {
      monthlyCost: {
        propertyTax: 200,
        hoa: 100,
      },
      initialCost: {
        downPayment: 50000,
        listingPrice: 500000,
        mortgage: 450000,
        additionalFees: {
          transfer: 3000,
          inspection: 200,
          mortgage: null,
          legal: 500,
          insurance: 300,
        },
      },
      monthlyExpenses: {
        insurance: 100,
        mortgage: null,
      },
      additionalFees: {
        transfer: 3000,
        inspection: 200,
        mortgage: null,
        legal: 500,
        insurance: 300,
      },
    },
  },
  {
    name: "Rustic Retreat Cottage",
    description:
      "Escape to the countryside with the Rustic Retreat Cottage. This charming 2-bedroom, 2-bathroom cottage offers a cozy and inviting atmosphere, surrounded by lush gardens and scenic views.",
    features: [
      {
        description: "2 bedrooms",
        type: "amenity",
      },
      {
        description: "2 bathrooms",
        type: "amenity",
      },
      {
        description: "1500 sq ft",
        type: "amenity",
      },
      {
        description: "Built in 2010",
        type: "location",
      },
    ],
    previewImages: "Rustic Retreat Cottage",
    metadata: {
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
    pricing: {
      monthlyCost: {
        propertyTax: 200,
        hoa: 100,
      },
      initialCost: {
        downPayment: 50000,
        listingPrice: 500000,
        mortgage: 450000,
        additionalFees: {
          transfer: 3000,
          inspection: 200,
          mortgage: null,
          legal: 500,
          insurance: 300,
        },
      },
      monthlyExpenses: {
        insurance: 100,
        mortgage: null,
      },
      additionalFees: {
        transfer: 3000,
        inspection: 200,
        mortgage: null,
        legal: 500,
        insurance: 300,
      },
    },
  },
];
