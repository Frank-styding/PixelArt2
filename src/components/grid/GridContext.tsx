import { createContext } from "react";

interface IGridContext {
  itemWidth: number;
  intermediateElementSpaces: number[];
  intermediateElementInitialWidth: number;
  onDown: (id: number, idx: number) => void;
  onUp: (id: number, idx: number) => void;
  setSpace: (idx: number, size: number) => void;
  getSumOfSpaces: (id: number) => number;
  addItem: (idx: number) => void;
  gap: number;
  onMove: (id: number, idx: number, pos: [number, number]) => void;
}

export const GridContext = createContext<IGridContext>({
  itemWidth: 0,
  onDown: () => {},
  onUp: () => {},
  onMove: () => {},
  setSpace: () => {},
  getSumOfSpaces: () => 0,
  gap: 0,
  addItem: () => {},
  intermediateElementSpaces: [],
  intermediateElementInitialWidth: 0,
});
