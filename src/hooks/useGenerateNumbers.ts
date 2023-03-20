import React, { useState } from "react";
import { Result } from "../components/enums";
import { addSpecialNumber, setPicks } from "../redux/slices/picksSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

const useGenerateNumbers = () => {
  const dispath = useAppDispatch();
  const { maxNumber, specialNumberMax, maxCount } = useAppSelector(
    (state) => state.currentGame.currentGame
  );
  const games = useAppSelector((state) => state.currentGame.games);
  console.log("games", games);

  const generate = () => {
    const numArr: number[] = [];
    let specialNumber = 0;

    while (numArr.length !== maxCount) {
      const number = Math.trunc(Math.random() * maxNumber) + 1;
      if (!numArr.includes(number)) {
        numArr.push(number);
      }
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
