import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { v4 as uuid } from "uuid";
import { MockFrequency, mockFrequency } from "../../components/data";
import { Frequency, Game, LuckyGames, Result } from "../../components/enums";

const initialState: MockFrequency = mockFrequency[0];
export const FrequencySlice = createSlice({
  name: "frequency",
  initialState,
  reducers: {
    setFrequency: (state, action: PayloadAction<string>) => {
      const frequency = mockFrequency.find(
        (freq) => freq.id === action.payload
      );

      return frequency;
    },
  },
});

export default FrequencySlice.reducer;
export const { setFrequency } = FrequencySlice.actions;
