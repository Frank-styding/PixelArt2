import styled from "styled-components";
import { Controls } from "./Controls";
import { GridProvider } from "../grid/GridProvider";
import { ReactNode, useContext, useState } from "react";
import { ColorPalete, Fonts } from "../../theme/Theme";
import { GridItemContext } from "../grid/GridItemContext";
import { GridItem } from "../grid/GridItem";
import { useSpring, animated } from "@react-spring/web";
import { v4 as uuid } from "uuid";
import { swap } from "../grid/swap";

const StyledTimeLine = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas: "time_control" "layers";
  grid-template-rows: 40px auto;
`;

const StyledLayersContainer = styled.div`
  min-width: 100%;
  height: 100%;
`;

const StyledLayerPreview = styled.div`
  grid-row: 1;
  border-radius: 8px;
  background-color: ${ColorPalete.dark.dark3};
`;

const LayerPreView = () => {
  return <StyledLayerPreview></StyledLayerPreview>;
};

const StyledLayerName = styled.div`
  grid-row: 2;
  width: 100%;
  display: grid;
  place-content: center;
  color: ${ColorPalete.white};
  font-family: ${Fonts.roboto};
  font-size: ${Fonts.fontSize[3]};
`;
const LayerName = ({ children }: { children: ReactNode }) => {
  return <StyledLayerName>{children}</StyledLayerName>;
};

const LayerContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  position: relative;
`;

const StyledLayer = styled.div<{ active: boolean }>`
  width: 100%;
  height: 100%;
  padding: 10px 5px;
  border-radius: 8px;
  display: grid;
  grid-template-rows: 2fr 1fr;
  user-select: none;
  background-color: ${(porps) =>
    porps.active ? ColorPalete.dark.dark0 : "none"};
`;

const Layer = ({ name }: { name: string }) => {
  const { isTraveler } = useContext(GridItemContext);
  return (
    <StyledLayer active={isTraveler}>
      <LayerPreView />
      <LayerName>{name}</LayerName>
    </StyledLayer>
  );
};

const AddButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
`;

const AddButton = ({ onClick }: { onClick: (idx: number) => void }) => {
  const { traveler } = useContext(GridItemContext);

  const [style, set] = useSpring(() => ({
    opacity: 0,
    config: { duration: 100 },
  }));
  const { idx } = useContext(GridItemContext);

  const _onClick = () => {
    if (traveler == null) {
      onClick(idx);
    }
  };

  return (
    <AddButtonContainer
      onMouseOver={() => set({ opacity: 1 })}
      onMouseLeave={() => set({ opacity: 0 })}
    >
      <animated.div
        onClick={_onClick}
        style={{
          width: "30px",
          height: "30px",
          backgroundColor: "white",
          borderRadius: "50%",
          ...style,
        }}
      />
    </AddButtonContainer>
  );
};

const LayersContainer = () => {
  const [layers, setLayers] = useState([
    {
      name: "hola",
      id: uuid(),
    },
    {
      name: "hola1",
      id: uuid(),
    },
    {
      name: "hola2",
      id: uuid(),
    },
  ]);

  const onClickAdd = (idx: number) => {
    const n_list = layers.slice();
    n_list.splice(idx, 0, {
      name: "hola3",
      id: uuid(),
    });
    setLayers(n_list);
  };

  return (
    <StyledLayersContainer>
      <GridProvider
        itemWidth={240}
        intermediateElement={{
          element: () => <AddButton onClick={onClickAdd} />,
          width: 25,
          onHover: {
            width: 35,
            duration: 50,
          },
        }}
        onChange={(idx, targetIdx) => {
          const n_list = swap(layers, idx, targetIdx);
          setLayers(n_list);
        }}
      >
        {layers.map(({ name, id }) => (
          <GridItem key={id}>
            <LayerContainer>
              <Layer name={name} />
            </LayerContainer>
          </GridItem>
        ))}
      </GridProvider>
    </StyledLayersContainer>
  );
};

export const TimeLine = () => {
  return (
    <StyledTimeLine>
      <Controls />
      <LayersContainer />
    </StyledTimeLine>
  );
};
