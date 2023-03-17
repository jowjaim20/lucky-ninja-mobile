import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type test = string;
const initialState: test = "";
export const ActiveSet = createSlice({
  name: "clicked",
  initialState,
  reducers: {
    setActiveSet: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export default ActiveSet.reducer;
export const { setActiveSet } = ActiveSet.actions;
