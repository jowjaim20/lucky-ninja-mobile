import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";
import { Game, LuckyGames, Result, Saved } from "../../components/enums";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface InitState {
  games: Game[];
  currentGame: Game;
}
const initialState: InitState = {
  games: [],
  currentGame: {
    id: "test",
    maxCount: 6,
    maxNumber: 58,
    name: "ExampleGame",
    previousResults: [],
    repeat: false,
    startZero: false,
    specialNumberMax: 26,
    saved: [],
  },
};

export const CurrentGame = createSlice({
  name: "currentGame",
  initialState,
  reducers: {
    addResult: (state, action: PayloadAction<Omit<Result, "id">>) => {
      const newItem: Result = {
        numbers: [...action.payload.numbers],
        id: uuid.v4().toString(),
        specialNumber: action.payload.specialNumber,
      };
      state.currentGame.previousResults.unshift(newItem);
    },
    insertResult: (state, action: PayloadAction<Omit<Result, "id">>) => {
      const newItem: Result = {
        numbers: [...action.payload.numbers],
        id: uuid.v4().toString(),
        specialNumber: action.payload.specialNumber,
      };
      state.currentGame.previousResults.push(newItem);
    },

    deleteResult: (state, action: PayloadAction<string>) => {
      const newResults = state.currentGame.previousResults.filter(
        (result) => result.id !== action.payload
      );

      state.currentGame.previousResults = newResults;
    },
    changeGame: (state, action: PayloadAction<Game>) => {
      console.log("action.payload", action.payload);
      state.currentGame = action.payload;
    },

    updateArray: (state, action: PayloadAction<Result[]>) => {
      state.currentGame.previousResults = action.payload;
    },
    addGame: (
      state,
      action: PayloadAction<Omit<Game, "id" | "previousResults" | "saved">>
    ) => {
      const newGame: Game = {
        id: uuid.v4().toString(),
        maxCount: action.payload.maxCount,
        maxNumber: action.payload.maxNumber,
        name: action.payload.name,
        previousResults: [],
        repeat: action.payload.repeat,
        startZero: action.payload.startZero,
        specialNumberMax: action.payload.specialNumberMax,
        saved: [],
      };
      state.games.push(newGame);
    },

    updateGame: (state, action: PayloadAction<Game>) => {
      const games = state.games.filter((game) => game.id !== action.payload.id);
      state.games = [action.payload, ...games];
    },
    deleteGame: (state, action: PayloadAction<string>) => {
      const games = state.games.filter((game) => game.id !== action.payload);

      const newArray = [...games];
      state.games = newArray;
    },
    addPicksTosaved: (state, action: PayloadAction<Saved>) => {
      state.currentGame.saved.unshift(action.payload);
    },
    deletedSave: (state, action: PayloadAction<number>) => {
      const newSaved = state.currentGame.saved.filter(
        (obj, idx) => idx !== action.payload
      );
      state.currentGame.saved = newSaved;
    },
    clear: (state) => {
      return {
        games: [],
        currentGame: {
          id: uuid.v4().toString(),
          maxCount: 6,
          maxNumber: 58,
          name: "ExampleGame",
          previousResults: [],
          repeat: false,
          startZero: false,
          specialNumberMax: 26,
          saved: [],
        },
      };
    },
  },
});

export default CurrentGame.reducer;
export const {
  addResult,
  insertResult,
  deleteResult,
  updateArray,
  changeGame,
  addGame,
  deleteGame,
  updateGame,
  clear,
  addPicksTosaved,
  deletedSave,
} = CurrentGame.actions;
