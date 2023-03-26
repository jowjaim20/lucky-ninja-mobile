import React from "react";
import { View } from "react-native";
import { useAppSelector } from "../redux/store";
import Ball from "./Ball";

const NewPicks = () => {
  const picks = useAppSelector((state) => state.picks);

  return (
    <View
      style={{
        alignSelf: "stretch",
        height: 62,
        backgroundColor: "#A3B2B8",
        marginTop: 8,
        padding: 12,
        borderRadius: 6,
        marginHorizontal: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {picks.numbers.map((obj, idx) => {
        return <Ball key={idx} title={obj.number} hex={obj.hex} />;
      })}
    </View>
  );
};

export default NewPicks;
