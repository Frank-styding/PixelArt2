import styled from "styled-components";
import { ColorPalete } from "../../theme/Colors";
import { PlayIcon } from "../icons/PlayIcon";
import { useState } from "react";
import { StopIcon } from "../icons/StopIcon";

const StyledControlTime = styled.div`
  display: flex;
  width: min-content;
  gap: 5px;
  background-color: ${ColorPalete.dark.dark3};
  border-radius: 8px;
  padding: 2px;
`;

const StyledButton = styled.div`
  display: grid;
  place-content: center;
  width: 25px;
  height: 25px;

  svg {
    fill: white;
  }
`;

export const TimeControl = () => {
  const [play, setPlay] = useState(false);
  return (
    <StyledControlTime>
      <StyledButton onClick={() => setPlay(!play)}>
        {play ? <PlayIcon size={15} /> : <StopIcon size={15} />}
      </StyledButton>
    </StyledControlTime>
  );
};
