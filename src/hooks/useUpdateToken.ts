import React, { useEffect, useState } from "react";
import base64 from "react-native-base64";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import axios from "axios";
import { useAppSelector } from "../redux/store";

const useUpdateToken = () => {
  const games = useAppSelector((state) => state.currentGame.games);
  let token;
  const keys = games.map((game) => {
    return {
      key: game.key,
      allowed: true,
    };
  });

  const updateToken = async () => {
    const username = "thiistheway";
    const password = "winteriscoming";
    try {
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        const data = await axios.post(
          "https://dull-gray-chick-tam.cyclic.app/tokens",
          { token, games: keys },
          {
            headers: {
              "Cache-Control": "no-cache",
              Authorization:
                "Basic " + base64.encode(username + ":" + password),
            },
          }
        );
        console.log("token", token);
      } else {
        alert("Must use physical device for Push Notifications");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    updateToken,
    token,
  };
};

export default useUpdateToken;
