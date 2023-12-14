import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { ItemData } from "./ItemData";

interface IGridContext {
  register: (name: string) => void;
  remove: (name: string, data: ItemData) => void;
  getPos: (name: string) => { x: number; y: number };
  startDrag: (name: string) => void;
  onMove: (x: number, y: number) => void;
  endDrag: () => void;
  itemWidth: number;
  activeItem: ItemData | null;
  varUpdate: boolean;
}

export const GridContext = createContext<IGridContext>({
  register: () => {},
  remove: () => {},
  getPos: () => ({ x: 0, y: 0 }),
  itemWidth: 0,
  startDrag: () => {},
  endDrag: () => {},
  activeItem: null,
  onMove: () => {},
  varUpdate: false,
});

const useUpdate = (): [boolean, () => void] => {
  const [varUpdate, setToggle] = useState(false);
  const update = () => setToggle(!varUpdate);
  return [varUpdate, update];
};

export const GridProvider = ({
  itemWidth,
  children,
}: {
  itemWidth: number;
  children: ReactNode;
}) => {
  const itemsData = useMemo<ItemData[]>(() => [], []);
  const prevItemsData = useMemo<ItemData[]>(() => [], []);
  const [activeItem, setActiveItem] = useState<ItemData | null>(null);
  const [newIdx, setNewIdx] = useState<number | null>(null);
  const [varUpdate, update] = useUpdate();

  const getIdx = (itemsData: ItemData[], name: string) =>
    itemsData.findIndex((item) => item.name == name);

  const register = (name: string) => {
    if (getIdx(itemsData, name) != -1) return;
    itemsData.push({
      name,
      pos: { x: itemsData.length * itemWidth, y: 0 },
    });
  };

  const remove = (name: string) => {
    const idx = getIdx(itemsData, name);
    itemsData.splice(idx, 1);
  };

  const getPos = (name: string) => {
    const idx = getIdx(itemsData, name);
    const item = itemsData[idx] as ItemData;
    return item.pos;
  };

  const startDrag = (name: string) => {
    if (activeItem !== null) return;
    const idx = getIdx(itemsData, name);
    prevItemsData.splice(0, prevItemsData.length, ...itemsData);
    setActiveItem(itemsData[idx]);
  };

  const onMove = (left: number) => {
    const newIdx = Math.floor((left + itemWidth / 2) / itemWidth);
    setNewIdx(newIdx);
  };

  const endDrag = () => {
    itemsData.forEach((item, idx) => {
      item.pos.x = idx * itemWidth;
    });
    setActiveItem(null);
  };

  useEffect(() => {
    if (activeItem == null || newIdx == null) return;
    const list = [...prevItemsData];
    const activeItemIdx = getIdx(list, activeItem.name);

    list.splice(activeItemIdx, 1);
    list.splice(newIdx, 0, activeItem);

    list.forEach((item, idx) => {
      if (item.name == activeItem.name) return;
      item.pos.x = idx * itemWidth;
    });
    update();

    itemsData.splice(0, itemsData.length, ...list);
  }, [activeItem, itemWidth, itemsData, newIdx, prevItemsData]);

  return (
    <GridContext.Provider
      value={{
        register,
        remove,
        getPos,
        itemWidth,
        startDrag,
        endDrag,
        activeItem,
        onMove,
        varUpdate,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};
