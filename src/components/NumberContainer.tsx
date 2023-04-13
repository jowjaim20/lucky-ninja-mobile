import React, { FunctionComponent } from "react";
import { View, ScrollView, Text } from "react-native";
import useSetPicks from "../hooks/useSetPicks";
import Ball from "./Ball";
import BallController from "./BallController";
import { Result } from "./enums";
import { useAppSelector } from "../redux/store";

interface NumberContainerProps {
  filtered: number[];
  newArray: Result[];
  currentIndex: number;
}
const NumberContainer: FunctionComponent<NumberContainerProps> = (props) => {
  const { filtered, newArray, currentIndex } = props;
  const picks = useAppSelector((state) => state.picks);
  const { maxCount } = useAppSelector((state) => state.currentGame.currentGame);

  const { handleSetNumbers } = useSetPicks({ notAdd: true, notClick: false });

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: 266,
          width: 270,
          paddingVertical: 15,
          paddingHorizontal: 15,
          backgroundColor: "#1F5062",
          borderRadius: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "800",
            color: "#fff",
          }}
        >
          Future Draw Colors
        </Text>
        <ScrollView>
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            {filtered.map((num, index) => (
              <BallController
                key={`${num}${index}`}
                {...{ currentIndex, number: num, prevResults: newArray }}
                render={(hex, clicked, onClick) => (
                  <Ball
                    ripple={{ color: hex, borderless: true }}
                    onClick={handleSetNumbers}
                    clicked={false}
                    title={num}
                    hex={picks.numbers.length === maxCount ? "#fff" : hex}
                  />
                )}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default NumberContainer;
