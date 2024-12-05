import { createContext } from "react";
interface paginationProps {
  current: number;
  max: number;
  amountToDisplay: number;
  paginate?: boolean;
}

export const PaginationContext = createContext<paginationProps | null>(null);
export const DataContext = createContext({} as unknown);
