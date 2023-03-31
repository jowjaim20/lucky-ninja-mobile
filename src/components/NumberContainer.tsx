import React, { FunctionComponent } from "react";
import { View, ScrollView, Text } from "react-native";
import useSetPicks from "../hooks/useSetPicks";
import Ball from "./Ball";
import BallController from "./BallController";
import { Result } from "./enums";

interface NumberContainerProps {
  filtered: number[];
  newArray: Result[];
  currentIndex: number;
}
const NumberContainer: FunctionComponent<NumberContainerProps> = (props) => {
  const { filtered, newArray, currentIndex } = props;
  const { handleSetNumbers } = useSetPicks({ notAdd: true, notClick: false });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      }}
    >
      <Text>Next Draw Colors</Text>
      <View
        style={{
          height: 400,
        }}
      >
        <ScrollView>
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              width: 280,
              backgroundColor: "#1e1e1e",
              padding: 10,
              borderRadius: 6,
            }}
          >
            {filtered.map((num, index) => (
              <BallController
                key={`${num}${index}`}
                {...{ currentIndex, number: num, prevResults: newArray }}
                render={(hex, clicked, onClick) => (
                  <Ball
                    ripple={{ color: hex, borderless: false }}
                    onClick={handleSetNumbers}
                    clicked={false}
                    title={num}
                    hex={hex}
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
