import styled from "styled-components";
import { ColorPalete } from "../../theme/Colors";

export const StyledLayerContainer = styled.div<{ selected: boolean }>`
  display: grid;
  grid-template-rows: 1fr 20px;
  grid-template-areas: "preview" "grid_number";
  gap: 6px;
  padding: 6px;
  min-width: 200px;
  height: 100%;
  background-color: ${(props) =>
    props.selected ? ColorPalete.dark.dark4 : "transparent"};
  border-radius: 8px;
  user-select: none;
`;
