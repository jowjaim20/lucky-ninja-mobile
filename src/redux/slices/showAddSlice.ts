import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = false;
export const ShowAdd = createSlice({
  name: "clicked",
  initialState,
  reducers: {
    toggleAdd: (state) => {
      return !state;
    },
  },
});

export default ShowAdd.reducer;
export const { toggleAdd } = ShowAdd.actions;
