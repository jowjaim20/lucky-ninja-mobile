import React, { useState } from "react";
import { Result } from "../components/enums";
import { addSpecialNumber, setPicks } from "../redux/slices/picksSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import useHandleXDraws from "./useHandleXdraws";
import useModifyArray from "./useModifyArray";

const useGenerateNumbers = () => {
  const dispath = useAppDispatch();
  const { getXDraws } = useHandleXDraws();
  const { maxNumber, specialNumberMax, maxCount, repeat, startZero } =
    useAppSelector((state) => state.currentGame.currentGame);
  const games = useAppSelector((state) => state.currentGame.games);
  const { previousResults } = useAppSelector(
    (state) => state.currentGame.currentGame
  );
  const allNum = Array.from(
    { length: startZero ? maxNumber + 1 : maxNumber },
    (_, i) => (startZero ? i : i + 1)
  );
  const { newArray } = useModifyArray({
    array: previousResults,
    replaceIndex: -1,
    item: { id: "123", numbers: allNum, specialNumber: 0 },
  });

  const currentFrequency = useAppSelector((state) => state.frequency);

  const generate = () => {
    const numArr: { number: number; hex: string }[] = [];
    let specialNumber = 0;

    while (numArr.length !== maxCount) {
      const number = startZero
        ? Math.trunc(Math.random() * (maxNumber + 1))
        : Math.trunc(Math.random() * maxNumber) + 1;

      const getHex = () => {
        console.log("getHex");
        const filteredFrequency = currentFrequency.frequency.find((freq) =>
          getXDraws({
            number,
            prevResults: newArray,
            currentIndex: -1,
            frequency: freq.frequency,
            range: freq.range,
          })
        );
        return filteredFrequency?.hex || "#999999"; //change default once done
      };

      if (!numArr.find((nums) => nums.number === number) && !repeat) {
        const hex = getHex();
        numArr.push({ number: number, hex: hex });
      }

      if (repeat) numArr.push({ number: number, hex: getHex() });
    }

    if (specialNumberMax !== 0) {
      const number = Math.trunc(Math.random() * specialNumberMax) + 1;
      specialNumber = number;
    }

    dispath(setPicks(numArr));
    dispath(addSpecialNumber(specialNumber));
  };
  return { generate };
};

export default useGenerateNumbers;
