import { filterDataParams, namedUnknown } from "./filter";
export interface kv {
  metadata: unknown;
  value: unknown;
}

export interface Property extends propertyInfo, namedUnknown {
  pricing: propertyPricing;
  metadata: Metadata;
}
export interface Metadata extends filterDataParams {
  bedrooms: number;
  bathrooms: number;
  description: string;
  image: string;
}

interface propertyInfo {
  description: string;
  features: propertyFeature[];
  previewImages: string; //kv Name
}

export interface propertyPricing {
  monthlyCost: monthlyCost;
  initialCost: initialCost;
  monthlyExpenses: monthlyExpenses;
  additionalFees: additionalFees;
}
//fees
interface additionalFees {
  transfer: number;
  inspection: number;
  mortgage: number | null;
  legal: number;
  insurance: number;
}
interface monthlyCost {
  propertyTax: number;
  hoa: number;
}
interface initialCost {
  downPayment: number;
  listingPrice: number;
  mortgage: number;
  additionalFees: additionalFees;
}
interface monthlyExpenses {
  insurance: number;
  mortgage: additionalFees["mortgage"];
}

//extras
interface propertyFeature {
  description: string;
  type: "security" | "luxury" | "amenity" | "location";
}
