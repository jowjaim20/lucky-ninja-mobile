import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type test = {
  number: number;
  hex: string;
};
const initialState: test[] = [];
export const AllNumbers = createSlice({
  name: "clicked",
  initialState,
  reducers: {
    setAllNumbers: (state, action: PayloadAction<test[]>) => {
      return action.payload;
    },
  },
});

export default AllNumbers.reducer;
export const { setAllNumbers } = AllNumbers.actions;
