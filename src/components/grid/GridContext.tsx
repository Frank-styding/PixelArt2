import { createContext } from "react";

export const GridContext = createContext<{
  itemWidth: number;
  intermediateElement: {
    sizes: number[];
    initialWidth?: number;
    onHover?: { width: number };
  };
  onDown: (id: number, idx: number) => void;
  onUp: (id: number, idx: number) => void;
  setSize: (idx: number, size: number) => void;
  getSum: (id: number) => number;
  gap: number;
  onMove: (id: number, idx: number, pos: [number, number]) => void;
}>({
  itemWidth: 0,
  onDown: () => {},
  onUp: () => {},
  onMove: () => {},
  setSize: () => {},
  getSum: () => 0,
  gap: 0,
  intermediateElement: {
    sizes: [],
  },
});
