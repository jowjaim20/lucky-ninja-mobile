import React from "react";
import { View, Pressable, Linking, Text } from "react-native";
import {
  BuyMeACoffeeIcon,
  FacebookIcon,
  PatreonIcon,
  YoutubeIcon,
} from "../utils/svg";

const SocialSites = () => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignSelf: "stretch",
        padding: 20,
        marginTop: 20,
        backgroundColor: "#fff",
      }}
    >
      <Text>Say Thank you on these sites</Text>
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
            Linking.openURL(
              "https://www.facebook.com/profile.php?id=100091299894729"
            );
          }}
          android_ripple={{ color: "#0D3341", borderless: true }}
        >
          <FacebookIcon />
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
            Linking.openURL("https://www.youtube.com/@luckyninjamobile");
          }}
          android_ripple={{ color: "#0D3341", borderless: true }}
        >
          <YoutubeIcon />
        </Pressable>
      </View>
    </View>
  );
};

export default SocialSites;
