import styled from "styled-components";
import { Controls } from "./Controls";
import { GridProvider } from "../grid/GridProvider";
import { useContext, useState } from "react";
import { swap } from "../grid/swap";
import { ColorPalete, Fonts } from "../../theme/Theme";
import { GridItemContext } from "../grid/GridItemContext";
import { GridItem } from "../grid/GridItem";
import { useSpring, animated } from "@react-spring/web";

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
const LayerName = () => {
  return <StyledLayerName>Hola</StyledLayerName>;
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

const Layer = () => {
  const { isTraveler } = useContext(GridItemContext);
  return (
    <StyledLayer active={isTraveler}>
      <LayerPreView />
      <LayerName />
    </StyledLayer>
  );
};

const AddButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
`;

const AddButton = () => {
  const [style, set] = useSpring(() => ({
    opacity: 0,
    config: { duration: 100 },
  }));
  const { idx } = useContext(GridItemContext);

  const onClick = () => {
    console.log(idx);
  };

  return (
    <AddButtonContainer
      onMouseOver={() => set({ opacity: 1 })}
      onMouseLeave={() => set({ opacity: 0 })}
    >
      <animated.div
        onClick={onClick}
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
      name: "0",
    },
    {
      name: "1",
    },
    {
      name: "2",
    },
    {
      name: "3",
    },
    {
      name: "4",
    },
    {
      name: "5",
    },
  ]);

  return (
    <StyledLayersContainer>
      <GridProvider
        itemWidth={240}
        intermediateElement={{
          element: () => <AddButton />,
          width: 25,
          onHover: {
            width: 35,
            duration: 50,
          },
        }}
        onChange={(idx, targetIdx) => {
          const newList = swap(layers, idx, targetIdx);
          setLayers(newList);
        }}
      >
        {layers.map(({ name }) => (
          <GridItem key={name}>
            <LayerContainer>
              <Layer />
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
