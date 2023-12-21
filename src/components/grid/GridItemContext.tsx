import { createContext } from "react";
import { ITraveler } from "./ITraveler";

interface IGridItemContext {
  traveler: null | ITraveler;
  id: number;
  idx: number;
  left: number;
  top: number;
  isTraveler: boolean;
  itemIdx: number;
}

export const GridItemContext = createContext<IGridItemContext>({
  traveler: null,
  left: 0,
  top: 0,
  isTraveler: false,
  id: 0,
  idx: 0,
  itemIdx: 0,
});
