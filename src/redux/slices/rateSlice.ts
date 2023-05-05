import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = false;
export const Rate = createSlice({
  name: "rate",
  initialState,
  reducers: {
    setRate: (state, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export default Rate.reducer;
export const { setRate } = Rate.actions;
