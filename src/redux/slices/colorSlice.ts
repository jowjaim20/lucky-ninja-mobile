import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = false;
export const Color = createSlice({
  name: "clicked",
  initialState,
  reducers: {
    setColor: (state, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export default Color.reducer;
export const { setColor } = Color.actions;
