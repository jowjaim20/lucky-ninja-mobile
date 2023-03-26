import React from "react";
import { View } from "react-native";
import useModifyArray from "../hooks/useModifyArray";
import { useAppSelector } from "../redux/store";
import Ball from "./Ball";
import BallController from "./BallController";
import { Result } from "./enums";

const Picks = ({
  numbers,
  overRideHex,
}: {
  numbers: Omit<Result, "id">;
  overRideHex?: string;
}) => {
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
  const { newArray } = useModifyArray({
    array: previousResults,
    replaceIndex: -1,
    item: {
      id: "test",
      numbers: numbers.numbers,
      specialNumber: numbers.specialNumber,
    },
  });

  return (
    <View
      style={{
        flexDirection: "row",
        display: "flex",
        gap: 3,
      }}
    >
      {numbers.numbers.map((num, index) => (
        <BallController
          key={`${num}${index}`}
          currentIndex={-1}
          number={num}
          prevResults={newArray}
          render={(hex) => <Ball hex={overRideHex || hex} title={num} />}
        />
      ))}
      {numbers?.specialNumber !== 0 && specialNumberMax && (
        <BallController
          key={999}
          {...{
            currentIndex: -1,
            number: numbers.specialNumber,
            prevResults: previousResults,
          }}
          render={(hex, clicked, onClick, activeSet) => (
            <Ball
              onClick={onClick}
              title={numbers.specialNumber || 0}
              hex="#454545"
              clicked={true}
            />
          )}
        />
      )}
    </View>
  );
};

export default Picks;
