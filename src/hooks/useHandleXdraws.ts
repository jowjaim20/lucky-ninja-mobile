import React from "react";
import { Result } from "../components/enums";

type handleXDraw = (params: {
  number: number;
  currentIndex: number;
  prevResults: Result[];
  range: number;
  frequency: number;
}) => boolean;

Array.prototype.unique = function () {
  var a = this.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }

  return a;
};

const useHandleXDraws = () => {
  const getXDraws: handleXDraw = ({
    currentIndex,
    frequency,
    number,
    prevResults,
    range,
  }) => {
    const currIndex = currentIndex === -1 ? 0 : currentIndex;
    const data = prevResults.filter(
      (res, index) => index >= currIndex && index < range + currIndex
    );

    const count = data
      .map((data) => data.numbers.unique().filter((num) => num === number))
      .flat().length;

    return count === frequency;
  };

  const getXDrawsEuro: handleXDraw = ({
    currentIndex,
    frequency,
    number,
    prevResults,
    range,
  }) => {
    const currIndex = currentIndex === -1 ? 0 : currentIndex;
    const data = prevResults.filter(
      (res, index) => index >= currIndex && index < range + currIndex
    );

    const count = data
      .map((data) => data.numbersEuro?.unique().filter((num) => num === number))
      .flat().length;

    return count === frequency;
  };

  return {
    getXDraws,
    getXDrawsEuro,
  };
};

export default useHandleXDraws;
