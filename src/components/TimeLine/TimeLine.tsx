import styled from "styled-components";
import { Controls } from "./Controls";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { GridProvider } from "./GridProvider";
import { GridItem } from "./GridItem";

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

const GridContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const LayersContainer = () => {
  const [layers] = useState([
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
      <GridProvider itemWidth={250}>
        <GridContainer>
          {layers.map(({ name }) => (
            <GridItem name={name} key={uuidv4()}>
              {name}
            </GridItem>
          ))}
        </GridContainer>
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
