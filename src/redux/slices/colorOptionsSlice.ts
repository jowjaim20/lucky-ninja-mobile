import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string[] = [];
export const ColorOption = createSlice({
  name: "colorOptions",
  initialState,
  reducers: {
    setColorOpt: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
    },
    resetColorOption: () => {
      return [];
    },
  },
});

export default ColorOption.reducer;
export const { setColorOpt, resetColorOption } = ColorOption.actions;
