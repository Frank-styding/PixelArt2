import { useRef, useState } from "react";
import { PlayIcon } from "../icons/PlayIcon";
import { StopIcon } from "../icons/StopIcon";
import styled from "styled-components";
import { StyledControls } from "./StyledControls";
import { StyledControlTime } from "./StyledControlTime";
import { StyledButton } from "./StyledButton";
import { StyledLayersScrollContainer } from "./StyledLayersScrollContainer";
import { StyledLayersContainer } from "./StyledLayersContainer";
import { StyledLayerContainer } from "./StyledLayerContainer";
import { StyledPreviewContainer } from "./StyledPreviewContainer";
import { StyledLayerNumber } from "./StyledLayerNumber";

const StyledTimeLine = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas: "time_control" "layers";
  grid-template-rows: 40px auto;
`;

export const Layer = ({
  idx,
  activeLayer,
  onClick,
}: {
  idx: number;
  activeLayer: number;
  onClick: () => void;
}) => {
  const ref = useRef(null);
  return (
    <StyledLayerContainer
      selected={activeLayer == idx}
      onClick={() => onClick()}
      key={idx}
    >
      <StyledPreviewContainer />
      <StyledLayerNumber>{idx}</StyledLayerNumber>
    </StyledLayerContainer>
  );
};

export const TimeLine = () => {
  const [play, setPlay] = useState(true);
  const [activeLayer, setActiveLayer] = useState(0);

  const onClick = (idx: number) => {
    setActiveLayer(idx);
  };

  const layers = new Array(2)
    .fill(null)
    .map((_, idx) => (
      <Layer activeLayer={activeLayer} idx={idx} onClick={() => onClick(idx)} />
    ));

  return (
    <StyledTimeLine>
      <StyledControls>
        <StyledControlTime>
          <StyledButton onClick={() => setPlay(!play)}>
            {play ? <PlayIcon size={15} /> : <StopIcon size={15} />}
          </StyledButton>
        </StyledControlTime>
      </StyledControls>
      <StyledLayersScrollContainer>
        <StyledLayersContainer>{layers}</StyledLayersContainer>
      </StyledLayersScrollContainer>
    </StyledTimeLine>
  );
};
