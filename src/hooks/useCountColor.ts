import React from "react";
import { Frequency, Result } from "../components/enums";
import { useAppSelector } from "../redux/store";
import useHandleXDraws from "./useHandleXdraws";
const useCountColor = () => {
  const { getXDraws } = useHandleXDraws();
  const currentFrequency = useAppSelector((state) => state.frequency);

  const countColors = (lastResults: Result[]) => {
    const count: string[] = [];
    lastResults
      .filter((a, b) => b <= 9)
      .forEach((result, index) => {
        result.numbers.forEach((num) => {
          const test: Frequency[] = [];
          currentFrequency.frequency.map((freq) => {
            const truety = getXDraws({
              number: num,
              prevResults: lastResults,
              currentIndex: index,
              frequency: freq.frequency,
              range: freq.range,
            });
            if (truety) test.push(freq);
          });
          count.push(
            test[0]?.frequency
              ? `${test[0].frequency}/${test[0].range}`
              : "others"
          );
        });
      });

    type test = { name: string; hex: string };
    const newArr: test[] = currentFrequency.frequency.map((freq) => {
      return { name: `${freq.frequency}/${freq.range}`, hex: freq.hex };
    });

    newArr.push({ name: "others", hex: "#999" });

    return newArr.map((arr) => {
      const counts = count.filter((count) => count === arr.name);
      return { name: arr.name, count: counts.length, hex: arr.hex };
    });
  };

  return { countColors };
};

export default useCountColor;
