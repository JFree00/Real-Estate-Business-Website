import { createContext } from "react";
import { assumedData } from "@/components/Designations/sectionContent";
type paginationProps = {
  current: number;
  max: number;
  amountToDisplay: number;
};

export const PaginationContext = createContext<paginationProps>({
  current: 1,
  max: 1,
  amountToDisplay: 3,
});
export const DataContext = createContext([] as assumedData[]);
