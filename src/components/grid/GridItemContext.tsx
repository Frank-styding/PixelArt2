import { createContext } from "react";
import { ITraveler } from "./ITraveler";

export const GridItemContext = createContext<{
  traveler: null | ITraveler;
  id: number;
  idx: number;
  left: number;
  top: number;
  isTraveler: boolean;
  itemIdx: number;
  intermediateElement: {
    left: number;
    top: number;
    width: number;
  };
}>({
  traveler: null,
  left: 0,
  top: 0,
  isTraveler: false,
  id: 0,
  idx: 0,
  itemIdx: 0,
  intermediateElement: {
    left: 0,
    top: 0,
    width: 0,
  },
});
