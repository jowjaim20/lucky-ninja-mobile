import React, { useEffect } from "react";
import {
  Platform,
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  Alert,
} from "react-native";
import * as Notifications from "expo-notifications";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { ClockIcon, FireIcon, HomeIcon, SettingsIcon } from "./utils/svg";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./routes/screens/Main";
import TestScreen from "./routes/screens/TestScreen";
import Settings from "./routes/screens/Settings";
import Home from "./routes/screens/Home";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
  AdEventType,
} from "react-native-google-mobile-ads";
import useNotifications from "./hooks/useNotifications";
import { changeGame, updateGame } from "./redux/slices/currentGame";
import { resetColorOption } from "./redux/slices/colorOptionsSlice";
import { resetPicks } from "./redux/slices/picksSlice";
import { fetchData } from "./utils/fetch";

const adUnitId = __DEV__
  ? TestIds.BANNER
  : "ca-app-pub-7636907857588942/6591921320";

const adUnitId1 = __DEV__
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-7636907857588942/8260489543";

const interstitial = InterstitialAd.createForAdRequest(adUnitId1, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ["fashion", "clothing"],
});

const Tab = createBottomTabNavigator();

const NinjaApp = () => {
  const dispatch = useAppDispatch();
  const showAdd = useAppSelector((state) => state.showAdd);
  const games = useAppSelector((state) => state.currentGame.games);
  const currentGame = useAppSelector((state) => state.currentGame.currentGame);

  const { handleNotification, registerForPushNotificationsAsync } =
    useNotifications();

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial.show();
      }
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, [showAdd]);

  useEffect(() => {
    if (currentGame.key !== "") fetchData(currentGame.key || "", dispatch);
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync();

    const handleNotificationListener =
      Notifications.addNotificationReceivedListener(handleNotification);

    const responseListener =
      Notifications.addNotificationResponseReceivedListener(
        (response: Notifications.NotificationResponse) => {
          const data: { key?: string } =
            response.notification.request.content.data;
          console.log("data", data);
          const game = games.find((game) => game.key === data.key);

          if (game) {
            dispatch(resetPicks());
            dispatch(updateGame(currentGame));
            dispatch(resetColorOption());
            dispatch(changeGame(game || games[0]));
            fetchData(data.key || "", dispatch);
          }
        }
      );

    return () => {
      if (responseListener)
        Notifications.removeNotificationSubscription(responseListener);
      if (handleNotificationListener)
        Notifications.removeNotificationSubscription(
          handleNotificationListener
        );
    };
  }, [games]);
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
      <View style={{ height: 60, backgroundColor: "#031E29" }}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
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
                return (
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor:
                        color === "#AFBDC2" ? "#ffffff00" : "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 50,
                    }}
                  >
                    <HomeIcon color={color} />
                  </View>
                );
              }
              if (route.name === "Analyze") {
                return (
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor:
                        color === "#AFBDC2" ? "#ffffff00" : "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 50,
                    }}
                  >
                    <FireIcon color={color} />
                  </View>
                );
              }
              if (route.name === "Saved") {
                return (
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor:
                        color === "#AFBDC2" ? "#ffffff00" : "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 50,
                    }}
                  >
                    <ClockIcon color={color} />
                  </View>
                );
              }
              if (route.name === "Settings") {
                return (
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor:
                        color === "#AFBDC2" ? "#ffffff00" : "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 50,
                    }}
                  >
                    <SettingsIcon color={color} />
                  </View>
                );
              }

              return <SettingsIcon />;

              // You can return any component that you like here!
            },
            tabBarActiveTintColor: "#0D3341",
            tabBarInactiveTintColor: "#AFBDC2",
            //Tab bar styles can be added here
            tabBarStyle: {
              paddingVertical: 20,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              backgroundColor: "#031E29",
              position: "absolute",
              height: 60,
            },
            tabBarLabelStyle: { paddingBottom: 4 },
            headerShown: false,
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    backgroundColor: "#D5D9DA",
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
