import React, { useState } from "react";
import { Result } from "../components/enums";
import {
  addSpecialNumber,
  setPicks,
  setPicksEuro,
} from "../redux/slices/picksSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import useHandleXDraws from "./useHandleXdraws";
import useModifyArray from "./useModifyArray";

const useGenerateNumbers = () => {
  const dispath = useAppDispatch();
  const { getXDraws, getXDrawsEuro } = useHandleXDraws();
  const {
    maxNumber,
    specialNumberMax,
    maxCount,
    repeat,
    startZero,
    maxCountEuro,
    maxNumberEuro,
  } = useAppSelector((state) => state.currentGame.currentGame);
  const games = useAppSelector((state) => state.currentGame.games);
  const options = useAppSelector((state) => state.colorOptions);
  const optionsEuro = useAppSelector((state) => state.colorOptionsEuro);

  const { previousResults } = useAppSelector(
    (state) => state.currentGame.currentGame
  );
  const allNum = Array.from(
    { length: startZero ? maxNumber + 1 : maxNumber },
    (_, i) => (startZero ? i : i + 1)
  );

  const numberEuro: number = maxNumberEuro !== undefined ? maxNumberEuro : 0;
  const allNumEuro = Array.from(
    { length: startZero ? numberEuro + 1 : numberEuro },
    (_, i) => (startZero ? i : i + 1)
  );

  const { newArray } = useModifyArray({
    array: previousResults,
    replaceIndex: -1,
    item: { id: "123", numbers: allNum, specialNumber: 0 },
  });

  const { newArray: newArrayEuro } = useModifyArray({
    array: previousResults,
    replaceIndex: -1,
    item: { id: "123", numbers: allNumEuro, specialNumber: 0 },
  });

  const currentFrequency = useAppSelector((state) => state.frequency);

  const generate = () => {
    const numArr: { number: number; hex: string }[] = [];
    const numArrEuro: { number: number; hex: string }[] = [];

    let specialNumber = 0;

    while (numArr.length !== maxCount) {
      const number = startZero
        ? Math.trunc(Math.random() * (maxNumber + 1))
        : Math.trunc(Math.random() * maxNumber) + 1;
      // const number = 6;

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

      const hex = getHex();

      const isHex =
        options[numArr.length] === hex || options[numArr.length] === undefined;

      console.log("isHex", isHex);

      if (!numArr.find((nums) => nums.number === number) && !repeat && isHex) {
        numArr.push({ number: number, hex: hex });
      }

      if (repeat && isHex) numArr.push({ number: number, hex: hex });
    }

    while (maxCountEuro && numArrEuro.length !== maxCountEuro) {
      const number = startZero
        ? Math.trunc(Math.random() * (numberEuro + 1))
        : Math.trunc(Math.random() * numberEuro) + 1;
      // const number = 6;

      const getHex = () => {
        console.log("getHex");
        const filteredFrequency = currentFrequency.frequency.find((freq) =>
          getXDrawsEuro({
            number,
            prevResults: newArrayEuro,
            currentIndex: -1,
            frequency: freq.frequency,
            range: freq.range,
          })
        );
        return filteredFrequency?.hex || "#999999"; //change default once done
      };

      const hex = getHex();

      const isHex =
        optionsEuro[numArrEuro.length] === hex ||
        optionsEuro[numArrEuro.length] === undefined;

      console.log("isHex", isHex);

      if (
        !numArrEuro.find((nums) => nums.number === number) &&
        !repeat &&
        isHex
      ) {
        numArrEuro.push({ number: number, hex: hex });
      }

      if (repeat && isHex) numArrEuro.push({ number: number, hex: hex });
    }

    if (specialNumberMax !== 0) {
      const number = Math.trunc(Math.random() * specialNumberMax) + 1;

      specialNumber = number;
    }
    console.log("specialNumber", specialNumber);

    dispath(setPicks(numArr));
    dispath(setPicksEuro(numArrEuro));

    dispath(addSpecialNumber(specialNumber));
  };
  return { generate };
};

export default useGenerateNumbers;
