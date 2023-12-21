import { ReactNode, useState, Children } from "react";
import { GridContext } from "./GridContext";
import { GridItemContext } from "./GridItemContext";
import { ITraveler } from "./ITraveler";
import { IntermediateElement } from "./IntermediateElement";
import { useIntermediateSpaces } from "./useIntermediateSpaces";
import { AddButton } from "./addButton";
import { GridContainer } from "./GridContainer";
import { IGridConfig } from "./IGridConfig";

export const Grid = ({
  children,
  onChange,
  config,
}: {
  children: ReactNode;
  onChange: (idx: number, targetIdx: number) => void;
  config?: IGridConfig;
}) => {
  let itemIndices = Children.map(children, (_, i) => i) as number[];

  const {
    itemWidth = 250,
    gap = 10,
    intermediateElement,
  } = config || {
    itemWidth: 250,
    gap: 10,
  };

  const [traveler, setTaverler] = useState<ITraveler | null>(null);
  const { getSpace, getSumOfSpaces, spaces, setSpace, insertItem } =
    useIntermediateSpaces(
      intermediateElement?.width || 0,
      intermediateElement ? itemIndices.length : 0
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
    const gapSpacesWidth = gap + (intermediateElement?.width || 0);
    const n_idx = Math.floor(
      (pos[0] + itemWidth / 2 + gapSpacesWidth) / (itemWidth + gapSpacesWidth)
    );
    setTaverler({ ...traveler, pos, targetIdx: n_idx });
  };

  const addItem = (idx: number) => {
    if (intermediateElement?.addButton == undefined) return;
    intermediateElement.addButton.onClick(idx);
    itemIndices = Children.map(children, (_, i) => i) as number[];
    insertItem();
  };

  const gridContextValue = {
    itemWidth,
    onDown,
    onUp,
    onMove,
    setSpace,
    getSumOfSpaces,
    gap,
    addItem,
    intermediateElementSpaces: spaces,
    intermediateElementInitialWidth: intermediateElement?.width || 0,
  };

  return (
    <GridContext.Provider value={gridContextValue}>
      <GridContainer>
        {Children.map(children, (child, idx) => {
          //update render  swap elements while mouse move
          const itemIndicesCopy = itemIndices.slice();

          if (traveler != null) {
            itemIndicesCopy.splice(traveler.idx, 1);
            itemIndicesCopy.splice(traveler.targetIdx, 0, traveler.id);
          }

          const id = itemIndicesCopy[idx];
          const itemIdx = itemIndicesCopy.findIndex(
            (itemIndice) => itemIndice == idx
          );
          ///

          const isTraveler = traveler == null ? false : traveler.id == idx;

          const interWidth = getSpace(itemIdx);

          //grid item
          const top = 0;
          const left =
            itemIdx * itemWidth +
            (itemIdx + 1) * gap +
            getSumOfSpaces(itemIdx + 1);

          //spaces items
          const intertTop = 0;
          const intertLeft =
            itemIdx * itemWidth +
            ((2 * itemIdx + 1) * gap) / 2 +
            getSumOfSpaces(itemIdx);

          const nextInterLeft =
            (itemIdx + 1) * itemWidth +
            ((2 * (itemIdx + 1) + 1) * gap) / 2 +
            getSumOfSpaces(itemIdx + 1);

          const gridItemContextValue = {
            traveler,
            left,
            top,
            isTraveler,
            id,
            idx,
            itemIdx,
          };

          return (
            <GridItemContext.Provider value={gridItemContextValue}>
              {intermediateElement && (
                <IntermediateElement
                  config={intermediateElement}
                  left={intertLeft}
                  top={intertTop}
                  width={interWidth}
                >
                  {intermediateElement?.element &&
                    intermediateElement.element()}

                  {intermediateElement.addButton && (
                    <AddButton config={intermediateElement.addButton}>
                      {intermediateElement.addButton.element &&
                        intermediateElement.addButton.element()}
                    </AddButton>
                  )}
                </IntermediateElement>
              )}
              {child}

              {intermediateElement && itemIdx == itemIndices.length - 1 && (
                <IntermediateElement
                  config={intermediateElement}
                  left={nextInterLeft}
                  top={intertTop}
                  width={interWidth}
                >
                  {intermediateElement?.element &&
                    intermediateElement.element()}

                  {intermediateElement.addButton && (
                    <AddButton config={intermediateElement.addButton}>
                      {intermediateElement.addButton.element &&
                        intermediateElement.addButton.element()}
                    </AddButton>
                  )}
                </IntermediateElement>
              )}
            </GridItemContext.Provider>
          );
        })}
      </GridContainer>
    </GridContext.Provider>
  );
};
