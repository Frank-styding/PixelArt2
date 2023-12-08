import styled from "styled-components";
import { ColorPalete } from "../../theme/Colors";

export const StyledLayersContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: scroll;
  width: calc(100vw - 25px * 2);
  padding-bottom: 5px;
  &::-webkit-scrollbar {
    height: 10px;
  }
  &::-webkit-scrollbar-track {
    background: ${ColorPalete.dark.dark1};
  }
  &::-webkit-scrollbar-thumb {
    background: ${ColorPalete.dark.dark2};
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
