import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string[] = [];
export const ColorOptionEuro = createSlice({
  name: "colorOptions2",
  initialState,
  reducers: {
    setColorOptEuro: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
    },
    resetColorOptionEuro: () => {
      return [];
    },
  },
});

export default ColorOptionEuro.reducer;
export const { setColorOptEuro, resetColorOptionEuro } =
  ColorOptionEuro.actions;
