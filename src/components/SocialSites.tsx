import React from "react";
import { View, Pressable, Linking, Text, Alert } from "react-native";
import { BuyMeACoffeeIcon, PatreonIcon, StarIcon } from "../utils/svg";
import useScaling from "../hooks/useScaling";

const GOOGLE_PACKAGE_NAME = "com.jowjaim20.luckyNinja";

const SocialSites = () => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: 210,
        alignSelf: "stretch",
        borderTopEndRadius: 8,
        borderBottomEndRadius: 8,
        padding: 10,
        marginTop: 30,
        marginBottom: 20,
        backgroundColor: "#fff",
      }}
    >
      <Text>You like our App? Support us!</Text>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          gap: 10,
        }}
      >
        <View
          style={{
            borderRadius: 50,
            overflow: "hidden",
            width: 38,
            height: 38,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#8A9EA5",
            elevation: 10,
          }}
        >
          <Pressable
            onPress={() => {
              Linking.openURL("https://www.patreon.com/luckyninja");
            }}
            android_ripple={{ color: "#0D3341", borderless: true }}
          >
            <PatreonIcon />
          </Pressable>
        </View>
        <View
          style={{
            borderRadius: 50,
            overflow: "hidden",
            width: 38,
            height: 38,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#8A9EA5",
            elevation: 10,
          }}
        >
          <Pressable
            onPress={() => {
              Linking.openURL("https://www.buymeacoffee.com/luckyninja");
            }}
            android_ripple={{ color: "#0D3341", borderless: true }}
          >
            <BuyMeACoffeeIcon />
          </Pressable>
        </View>

        <View
          style={{
            borderRadius: 50,
            overflow: "hidden",
            width: 38,
            height: 38,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#8A9EA5",
            elevation: 10,
          }}
        >
          <Pressable
            onPress={() => {
              Alert.alert(
                "Rate us",
                "Would you like to share your review with us?",
                [
                  {
                    text: "Sure",
                    onPress: () => {
                      Linking.openURL(
                        `https://play.google.com/store/apps/details?id=${GOOGLE_PACKAGE_NAME}`
                      ).catch((err) =>
                        alert("Please check for Google Play Store")
                      );
                    },
                  },
                  { text: "No Thanks!", onPress: () => {} },
                ]
              );
            }}
            android_ripple={{ color: "#0D3341", borderless: true }}
          >
            <StarIcon />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SocialSites;
