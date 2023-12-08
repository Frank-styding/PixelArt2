import { createSlice } from "@reduxjs/toolkit";

interface EditorState {
  lineColorHEX: number;
  lineWidth: number;
  backgroundColorsHEX: [number, number];
  gridDim: [number, number];
  showBackground: number;
  showGrid: number;
  gridColorData: { colorHEX: number; opacity: number }[][];
  layerIdx: number;
}

const initialState: EditorState = {
  lineColorHEX: 0xffffff,
  lineWidth: 1.5,
  backgroundColorsHEX: [0x101010, 0x808080],
  gridDim: [16, 16],
  showBackground: 1,
  showGrid: 1,
  gridColorData: [
    new Array(16 * 16)
      .fill(null)
      .map(() => ({ colorHEX: 0xff0000, opacity: 0 })),
  ],
  layerIdx: 0,
};

export const EditorSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setLineColor: (state, action) => {
      state.lineColorHEX = action.payload;
    },
    setLineWidth: (state, action) => {
      state.lineWidth = action.payload;
    },
    setBackgroundColors: (state, action) => {
      state.backgroundColorsHEX = action.payload;
    },
    setGridDim: (state, action) => {
      state.gridDim = action.payload;
      state.gridColorData = [
        new Array(state.gridDim[0] * state.gridDim[1])
          .fill(null)
          .map(() => ({ colorHEX: 0x000000, opacity: 0 })),
      ];
    },
    showGrid: (state) => {
      state.showGrid = 1;
    },
    hideGrid: (state) => {
      state.showGrid = 0;
    },
    showBackground: (state) => {
      state.showBackground = 1;
    },
    hideBackground: (state) => {
      state.showBackground = 0;
    },
    setCeldColor: (state, action) => {
      state.gridColorData[state.layerIdx][action.payload.idx].colorHEX =
        action.payload.color;
      state.gridColorData[state.layerIdx][action.payload.idx].opacity =
        action.payload.opacity;
    },
  },
});

export const {
  setLineColor,
  setLineWidth,
  setBackgroundColors,
  showBackground,
  showGrid,
  hideBackground,
  hideGrid,
  setCeldColor,
} = EditorSlice.actions;

export default EditorSlice.reducer;
