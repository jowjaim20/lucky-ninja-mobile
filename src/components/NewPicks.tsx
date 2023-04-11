import React from "react";
import { View, Text } from "react-native";
import { useAppSelector } from "../redux/store";
import Ball from "./Ball";
import { LuckyNinjaLogo } from "../utils/svg";

interface NewPicksProps {
  ninjaTitle: string;
}
const NewPicks: React.FunctionComponent<NewPicksProps> = (props) => {
  const { ninjaTitle } = props;
  const picks = useAppSelector((state) => state.picks);
  const {
    maxNumber,
    previousResults,
    maxCount,
    name,
    repeat,
    id,
    startZero,
    specialNumberMax,
  } = useAppSelector((state) => state.currentGame.currentGame);

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
      {picks?.specialNumber !== 0 && specialNumberMax && (
        <Ball onClick={() => {}} title={picks.specialNumber || 0} hex="#fff" />
      )}
      {picks.numbers.length === 0 && (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LuckyNinjaLogo />
          </View>
          <Text
            style={{
              marginLeft: 4,
              color: "#031E29",
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            {ninjaTitle}
          </Text>
        </View>
      )}
    </View>
  );
};

export default NewPicks;
