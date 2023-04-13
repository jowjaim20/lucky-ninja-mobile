import React from "react";
import { View, Text } from "react-native";
import { useAppSelector } from "../redux/store";
import Ball from "./Ball";
import { LuckyNinjaLogo } from "../utils/svg";
import useScaling from "../hooks/useScaling";

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
  const colorOptions = useAppSelector((state) => state.colorOptions);
  const { scale } = useScaling();

  return (
    <View
      style={{
        backgroundColor: "#A3B2B8",
        marginTop: 8,
        padding: 12,
        borderRadius: 6,

        marginHorizontal: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 5,
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {picks.numbers.map((obj, idx) => {
          return (
            <Ball scale={scale} key={idx} title={obj.number} hex={obj.hex} />
          );
        })}
        {picks?.specialNumber !== 0 && specialNumberMax && (
          <Ball
            scale={scale}
            onClick={() => {}}
            title={picks.specialNumber || 0}
            hex="#fff"
          />
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
              <LuckyNinjaLogo scale={scale} />
            </View>
            <Text
              style={{
                marginLeft: 4,
                color: "#031E29",
                fontSize: 24 * scale,
                fontWeight: "bold",
              }}
            >
              {ninjaTitle}
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          height: 10,
          gap: 5,
        }}
      >
        {colorOptions.map((hex, idx) => (
          <View
            key={`${hex}${idx}`}
            style={{
              width: 10 * scale,
              height: 10 * scale,
              borderRadius: 50,
              backgroundColor: hex,
            }}
          ></View>
        ))}
      </View>
    </View>
  );
};

export default NewPicks;
