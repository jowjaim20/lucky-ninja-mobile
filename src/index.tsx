import React, { useState } from "react";
import {
  Platform,
  Pressable,
  SafeAreaView,
  View,
  StatusBar,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Dimensions,
  Switch,
} from "react-native";
import AddGame from "./components/AddGame";
import AllNumbersCard from "./components/AllNumbersCard";
import Ball from "./components/Ball";
import BallController from "./components/BallController";
import ChangeGame from "./components/ChangeGame";
import { Result } from "./components/enums";
import Picks from "./components/Picks";
import ResultsCard from "./components/ResultsCard";
import useCountColor from "./hooks/useCountColor";
import useModifyArray from "./hooks/useModifyArray";
import { setClicked } from "./redux/slices/clickedSlice";
import {
  addGame,
  addResult,
  deleteResult,
  updateArray,
} from "./redux/slices/currentGame";
import { addNumber, resetPicks } from "./redux/slices/picksSlice";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { ClockIcon, FireIcon, HomeIcon, SettingsIcon } from "./utils/svg";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./routes/screens/Main";
import TestScreen from "./routes/screens/TestScreen";
import Settings from "./routes/screens/Settings";
import Home from "./routes/screens/Home";

const Tab = createBottomTabNavigator();

const NinjaApp = () => {
  return (
    <SafeAreaView
      style={[
        {
          flexDirection: "column",
          flex: 1,
          justifyContent: "space-between",
        },
        styles.container,
      ]}
    >
      <View style={{ height: 70 }}>
        <Text>ads</Text>
      </View>

      <NavigationContainer>
        <Tab.Navigator
          sceneContainerStyle={{
            backgroundColor: "#2D2D2D5c",
          }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                return <HomeIcon />;
              }
              if (route.name === "Analyze") {
                return <FireIcon />;
              }
              if (route.name === "Saved") {
                return <ClockIcon />;
              }
              if (route.name === "Settings") {
                return <SettingsIcon />;
              }

              return <SettingsIcon />;

              // You can return any component that you like here!
            },
            tabBarActiveTintColor: "#58ceb2",
            tabBarInactiveTintColor: "gray",
            //Tab bar styles can be added here
            tabBarStyle: {
              paddingVertical: 20,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              backgroundColor: "#2b2b2b",
              position: "absolute",
              height: 50,
            },
            tabBarLabelStyle: { paddingBottom: 3 },
            headerShown: false,
            tabBarActiveBackgroundColor: "#fff",
          })}
        >
          <Tab.Screen name="Home" options={{ title: "" }} component={Home} />
          <Tab.Screen name="Analyze" options={{ title: "" }} component={Main} />
          <Tab.Screen
            name="Saved"
            options={{ title: "" }}
            component={TestScreen}
          />
          <Tab.Screen
            name="Settings"
            options={{ title: "" }}
            component={Settings}
          />
        </Tab.Navigator>
      </NavigationContainer>

      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginTop: "auto",
          padding: 5,
          backgroundColor: "#2b2b2b",
          borderTopWidth: 0.2,
          borderLeftWidth: 0.2,
          borderRightWidth: 0.2,
          borderColor: "#7b7b7b22",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <Pressable>
          <HomeIcon />
        </Pressable>
        <Pressable>
          <FireIcon />
        </Pressable>
        <ClockIcon />
        <SettingsIcon />
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    backgroundColor: "#2D2D2D5c",
  },
  text: {
    color: "#fff",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
export default NinjaApp;
