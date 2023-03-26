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
} from "react-native";
import { Clicked } from "../redux/slices/clickedSlice";

interface BallProps {
  title: number | string;
  hex?: string;
  onClick?: (num: number, hex: string) => void;
  clicked?: boolean;
  ripple?: { color: string; borderless: boolean };
  size?: number;
}

const Ball: React.FunctionComponent<BallProps> = ({
  title,
  hex,
  onClick,
  clicked = false,
  ripple,
  size = 40,
}) => {
  const clickedStyle = {
    bg: {
      width: size,
      height: size,
      borderColor: !clicked ? "#0D3341" : "#0D3341",
      borderTopWidth: 2.5,
      borderLeftWidth: 2.5,
      borderRightWidth: 2.5,
      borderBottomWidth: 2.5,
      borderRadius: 16,

      backgroundColor: clicked ? `#0D3341` : hex,
    },
    text: {
      fontSize: clicked ? 20 : 14,

      color: clicked ? hex : "#0D3341",
    },
  };

  return (
    <Pressable
      android_ripple={ripple}
      onPress={() => {
        onClick &&
          onClick(typeof title === "number" ? title : 0, hex ? hex : "");
      }}
    >
      <View style={[styles.container, { ...clickedStyle.bg }]}>
        <Text style={{ ...styles.text, ...clickedStyle.text }}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "900",
    justifyContent: "center",
    alignItems: "center",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default Ball;
