import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type test = number;
const initialState: test = -1;
export const Clicked = createSlice({
  name: "clicked",
  initialState,
  reducers: {
    setClicked: (state, action: PayloadAction<number>) => {
      return action.payload;
    },
  },
});

export default Clicked.reducer;
export const { setClicked } = Clicked.actions;
