import { createContext } from "react";
type paginationProps = {
  current: number;
  max: number;
  amountToDisplay: number;
};

export const PaginationContext = createContext<paginationProps | null>(null);
export const DataContext = createContext({} as unknown);
