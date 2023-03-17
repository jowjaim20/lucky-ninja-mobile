import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Result } from "../../components/enums";

const initialState: Omit<Result, "id"> = {
  numbers: [],
  specialNumber: 0,
};
export const Picks = createSlice({
  name: "picks",
  initialState,
  reducers: {
    addNumber: (state, action: PayloadAction<number>) => {
      state.numbers.push(action.payload);
    },
    addSpecialNumber: (state, action: PayloadAction<number>) => {
      state.specialNumber = action.payload;
    },
    setPicks: (state, action: PayloadAction<number[]>) => {
      return { numbers: action.payload, specialNumber: 0 };
    },
    resetPicks: () => {
      return { numbers: [], specialNumber: 0 };
    },
  },
});

export default Picks.reducer;
export const { addNumber, resetPicks, setPicks, addSpecialNumber } =
  Picks.actions;
