import styled from "styled-components";
import { ColorPalete } from "../../theme/Colors";
import { TimeControl } from "./TimeControl";

export const StyledControls = styled.div`
  grid-area: time_control;
  background-color: ${ColorPalete.dark.dark2};
  display: grid;
  place-content: center;
`;

export const Controls = () => {
  return (
    <StyledControls>
      <TimeControl />
    </StyledControls>
  );
};
