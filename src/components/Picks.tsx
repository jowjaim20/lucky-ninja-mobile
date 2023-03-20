import React from "react";
import { View } from "react-native";
import useModifyArray from "../hooks/useModifyArray";
import { useAppSelector } from "../redux/store";
import Ball from "./Ball";
import BallController from "./BallController";
import { Result } from "./enums";

const Picks = ({ numbers }: { numbers: Omit<Result, "id"> }) => {
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
      }}
    >
      {numbers.numbers.map((num, index) => (
        <BallController
          key={`${num}${index}`}
          currentIndex={-1}
          number={num}
          prevResults={newArray}
          render={(hex) => (
            <Ball className=" w-20 h-20" hex={hex} title={num} />
          )}
        />
      ))}
      {numbers?.specialNumber !== 0 && specialNumberMax && (
        <BallController
          key={999}
          notAdd={false}
          {...{
            currentIndex: -1,
            number: numbers.specialNumber,
            prevResults: previousResults,
          }}
          render={(hex, clicked, onClick, activeSet) => (
            <Ball
              onClick={onClick}
              className="w-10 h-10 text-3xl rounded"
              title={numbers.specialNumber || 0}
              hex="#454545"
              clicked={true}
              activeSet={activeSet}
            />
          )}
        />
      )}
    </View>
  );
};

export default Picks;
