import { createSlice } from "@reduxjs/toolkit";

type Layer = {
  color: number;
  opacity: number;
}[];

interface EditorState {
  lineColor: number;
  lineWidth: number;
  backgroundColors: [number, number];
  gridDim: [number, number];
  showBackground: boolean;
  showGrid: boolean;
  layers: Layer[];
  activeLayer: number;
}

const initialState: EditorState = {
  lineColor: 0xffffff,
  lineWidth: 1.5,
  backgroundColors: [0x101010, 0x808080],
  gridDim: [16, 16],
  showBackground: true,
  showGrid: true,
  layers: [
    new Array(16 * 16).fill(null).map(() => ({ color: 0xff0000, opacity: 0 })),
  ],
  activeLayer: 0,
};

export const EditorSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setLineColor: (state, action) => {
      state.lineColor = action.payload;
    },
    setLineWidth: (state, action) => {
      state.lineWidth = action.payload;
    },
    setBackgroundColors: (state, action) => {
      state.backgroundColors = action.payload;
    },
    setGridDim: (state, action) => {
      state.gridDim = action.payload;
      state.layers = [
        new Array(state.gridDim[0] * state.gridDim[1])
          .fill(null)
          .map(() => ({ color: 0x000000, opacity: 0 })),
      ];
    },
    showGrid: (state) => {
      state.showGrid = true;
    },
    hideGrid: (state) => {
      state.showGrid = false;
    },
    showBackground: (state) => {
      state.showBackground = true;
    },
    hideBackground: (state) => {
      state.showBackground = false;
    },
    setCeldColor: (state, action) => {
      state.layers[state.activeLayer][action.payload.idx].color =
        action.payload.color;
      state.layers[state.activeLayer][action.payload.idx].opacity =
        action.payload.opacity;
    },
    setActiveLayer: (state, action) => {
      state.activeLayer = action.payload.activeLayer;
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
  setActiveLayer,
} = EditorSlice.actions;

export default EditorSlice.reducer;
