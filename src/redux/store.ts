import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import clickedReducer from "./slices/clickedSlice";
import currentGameReducer from "./slices/currentGame";
import picksReducer from "./slices/picksSlice";
import frequencySlice from "./slices/frequencySlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import logger from "redux-logger";
import thunk from "redux-thunk";
import activeSetSlice from "./slices/activeSetSlice";
import Color from "./slices/colorSlice";
import showAddSlice from "./slices/showAddSlice";
import allNumbers from "./slices/allNumbersSlice";
import colorOptions from "./slices/colorOptionsSlice";
import colorOptionsEuro from "./slices/colorOptionsEuroSlice";

// ...

const reducers = combineReducers({
  clicked: clickedReducer,
  picks: picksReducer,
  currentGame: currentGameReducer,
  frequency: frequencySlice,
  activeSet: activeSetSlice,
  color: Color,
  showAdd: showAddSlice,
  allNumbers: allNumbers,
  colorOptions: colorOptions,
  colorOptionsEuro: colorOptionsEuro,
});

const persistConfig = {
  key: "currentGame",
  storage: AsyncStorage,
  whitelist: ["currentGame"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

export const persistor = persistStore(store);
export default store;
