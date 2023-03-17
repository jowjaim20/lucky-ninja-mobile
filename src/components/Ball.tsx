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
  title: number;
  className?: string;
  hex?: string;
  onClick?: (num: number) => void;
  clicked?: boolean;
  ripple?: { color: string; borderless: boolean };
  activeSet?: boolean;
}

const Ball: React.FunctionComponent<BallProps> = ({
  title,
  hex,
  onClick,
  clicked = true,
  ripple,
  activeSet,
}) => {
  const clickedStyle = {
    bg: {
      borderColor: !clicked ? `${hex}66` : "#fff",
      backgroundColor: clicked || activeSet ? hex : `#00000011`,
    },
    text: {
      color: clicked || activeSet ? "#fff" : hex,
    },
  };

  return (
    <Pressable
      android_ripple={ripple}
      onPress={() => {
        onClick && onClick(title);
      }}
    >
      <View
        style={[styles.container, styles.shadowProp, { ...clickedStyle.bg }]}
      >
        <Text style={{ ...styles.text, ...clickedStyle.text }}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    margin: 1.5,
  },
  text: {
    fontSize: 16,
    color: "#fff",
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
