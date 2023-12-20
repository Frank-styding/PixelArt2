import { ReactNode, useState, Children } from "react";
import { GridContext } from "./GridContext";
import { GridItemContext } from "./GridItemContext";
import { GridContainer } from "./GridContainer";
import { ITraveler } from "./ITraveler";
import { IntermediateElement } from "./IntermediateElement";
import { useSizes } from "./useSizes";

export const GridProvider = ({
  children,
  itemWidth,
  gap = 0,
  intermediateElement,
  onChange,
}: {
  children: ReactNode;
  itemWidth: number;
  gap?: number;
  intermediateElement?: {
    element: () => JSX.Element;
    onHover?: { width: number; duration: number };
    width: number;
  };
  onChange: (idx: number, targetIdx: number) => void;
}) => {
  const itemsIndexes = Children.map(children, (_, i) => i) as number[];
  const [traveler, setTaverler] = useState<ITraveler | null>(null);

  const { getSize, getSum, sizes, setSize } = useSizes(
    intermediateElement?.width || 0,
    intermediateElement ? itemsIndexes.length : 0
  );

  const onDown = (id: number, idx: number) => {
    if (traveler != null) return;
    setTaverler({
      pos: [idx * itemWidth, 0],
      id,
      idx,
      targetIdx: idx,
    });
  };

  const onUp = () => {
    if (traveler != null) {
      onChange(traveler.idx, traveler.targetIdx);
    }
    setTaverler(null);
  };

  const onMove = (_: number, __: number, pos: [number, number]) => {
    if (traveler == null) return;
    const n_idx = Math.floor(
      (pos[0] + itemWidth / 2 + gap + (intermediateElement?.width || 0)) /
        (itemWidth + gap + (intermediateElement?.width || 0))
    );
    setTaverler({ ...traveler, pos, targetIdx: n_idx });
  };

  return (
    <GridContext.Provider
      value={{
        itemWidth,
        onDown,
        onUp,
        onMove,
        setSize,
        getSum,
        gap,
        intermediateElement: {
          initialWidth: intermediateElement?.width,
          sizes,
          onHover: intermediateElement?.onHover,
        },
      }}
    >
      <GridContainer>
        {Children.map(children, (child, idx) => {
          const list = itemsIndexes.slice();

          if (traveler != null) {
            list.splice(traveler.idx, 1);
            list.splice(traveler.targetIdx, 0, traveler.id);
          }

          const id = list[idx];
          const itemIdx = list.findIndex((item) => item == idx);

          const left =
            itemIdx * itemWidth + (itemIdx + 1) * gap + getSum(itemIdx + 1);

          const intermediateElementLeft =
            itemIdx * itemWidth +
            ((2 * itemIdx + 1) * gap) / 2 +
            getSum(itemIdx);

          const top = 0;
          const intermediateElementTop = 0;

          const isTraveler = traveler == null ? false : traveler.id == idx;
          const intermediateElementWidth = getSize(itemIdx);

          return (
            <GridItemContext.Provider
              value={{
                traveler,
                left,
                top,
                isTraveler,
                id,
                idx,
                itemIdx,
                intermediateElement: {
                  width: intermediateElementWidth,
                  left: intermediateElementLeft,
                  top: intermediateElementTop,
                },
              }}
            >
              {intermediateElement && (
                <IntermediateElement>
                  {intermediateElement.element()}
                </IntermediateElement>
              )}
              {child}
            </GridItemContext.Provider>
          );
        })}
      </GridContainer>
    </GridContext.Provider>
  );
};
