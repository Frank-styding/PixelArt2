import styled from "styled-components";
import { TimeLine } from "../components/TimeLine/TimeLine";
import { ColorPalete } from "../theme/Theme";
import { Display } from "../components/Display/Display";

const StyledEditor = styled.section`
  display: grid;
  grid-template-areas:
    "display display controls"
    "display display controls"
    "time_line time_line time_line";
  grid-template-columns: 2fr 2fr 200px;
  grid-template-rows: 2fr 2fr 250px;
  width: 100vw;
  height: 100vh;
  background-color: ${ColorPalete.dark.dark0};
  gap: 12px;
  padding: 12px;
`;

const StyledPanel = styled.div`
  background-color: ${ColorPalete.dark.dark1};
  border-radius: 8px;
  overflow: hidden;
`;

const StyledControls = styled(StyledPanel)`
  grid-area: controls;
`;

const StyledDisplay = styled(StyledPanel)`
  grid-area: display;
  display: flex;
`;
const StyledTimeLine = styled(StyledPanel)`
  grid-area: time_line;
`;

export const Editor = () => {
  return (
    <StyledEditor>
      <StyledControls></StyledControls>
      <StyledDisplay>
        <Display />
      </StyledDisplay>
      <StyledTimeLine>
        <TimeLine />
      </StyledTimeLine>
    </StyledEditor>
  );
};
