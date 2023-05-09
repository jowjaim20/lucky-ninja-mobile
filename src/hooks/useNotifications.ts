import React from "react";
import { Linking, Platform, AppState } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useAppSelector } from "../redux/store";
import useUpdateToken from "./useUpdateToken";

const useNotifications = () => {
  const { updateToken, token } = useUpdateToken();

  const registerForPushNotificationsAsync = async () => {
    await updateToken();
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default123", {
        name: "default123",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  const handleNotification = async (
    notification: Notifications.Notification
  ) => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
      handleSuccess: (re) => {
        console.log("re", re);
      },
    });
  };

  const handleNotificationResponse = (
    response: Notifications.NotificationResponse
  ) => {
    const data: { url?: string } = response.notification.request.content.data;

    if (data.url) Linking.openURL(data.url);
  };

  return {
    registerForPushNotificationsAsync,
    handleNotificationResponse,
    handleNotification,
  };
};

export default useNotifications;
