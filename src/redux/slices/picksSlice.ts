import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Result } from "../../components/enums";

interface Pick {
  number: number;
  hex: string;
}

interface PicksProps {
  numbers: Pick[];
  numbersEuro?: Pick[];
  specialNumber: number;
}
const initialState: PicksProps = {
  numbers: [],
  numbersEuro: [],
  specialNumber: 0,
};
export const Picks = createSlice({
  name: "picks",
  initialState,
  reducers: {
    addNumber: (state, action: PayloadAction<Pick>) => {
      state.numbers.push(action.payload);
    },
    addNumberEuro: (state, action: PayloadAction<Pick>) => {
      if (state.numbersEuro) state.numbersEuro.push(action.payload);
    },
    addSpecialNumber: (state, action: PayloadAction<number>) => {
      state.specialNumber = action.payload;
    },
    setPicks: (state, action: PayloadAction<Pick[]>) => {
      console.log("action.payload", action.payload);
      return { ...state, numbers: action.payload, specialNumber: 0 };
    },
    setPicksEuro: (state, action: PayloadAction<Pick[]>) => {
      console.log("action.payload", action.payload);
      return { ...state, numbersEuro: action.payload, specialNumber: 0 };
    },
    resetPicks: () => {
      return { numbers: [], numbersEuro: [], specialNumber: 0 };
    },
  },
});

export default Picks.reducer;
export const {
  addNumber,
  resetPicks,
  setPicks,
  addSpecialNumber,
  addNumberEuro,
  setPicksEuro,
} = Picks.actions;
