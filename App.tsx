import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import NinjaApp from "./src";
import store, { persistor } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "expo-dev-client";

export default function App() {
  return (
    <>
      <StatusBar />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NinjaApp />
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </>
  );
}
