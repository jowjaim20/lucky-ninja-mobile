import React from "react";
import { setClicked } from "../redux/slices/clickedSlice";
import {
  addNumber,
  addNumberEuro,
  addSpecialNumber,
} from "../redux/slices/picksSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

const useSetPicks = ({
  notAdd,
  notClick,
}: {
  notAdd: boolean;
  notClick: boolean;
}) => {
  const dispatch = useAppDispatch();
  const picks = useAppSelector((state) => state.picks);
  const clicked = useAppSelector((state) => state.clicked);
  const activeSetIndex = useAppSelector((state) => state.activeSet);

  const currentFrequency = useAppSelector((state) => state.frequency);
  const currentGame = useAppSelector((state) => state.currentGame.currentGame);

  const handleSetNumbers = (num: number, hex: string) => {
    if (currentGame.repeat && currentGame.maxCount !== picks.numbers.length) {
      notAdd && dispatch(addNumber({ number: num, hex }));
    } else {
      const includes = picks.numbers.find((nums) => nums.number === num);
      const includesEuro = picks.numbersEuro?.find(
        (nums) => nums.number === num
      );

      console.log("currentGame.maxCountEuro", currentGame.maxCountEuro);

      if (!includes && currentGame.maxCount !== picks.numbers.length) {
        notAdd && dispatch(addNumber({ number: num, hex }));
      }

      if (
        currentGame.maxCount === picks.numbers.length &&
        !includesEuro &&
        currentGame.maxCountEuro !== picks.numbersEuro?.length &&
        currentGame.maxCountEuro
      ) {
        notAdd && dispatch(addNumberEuro({ number: num, hex }));
      }
    }

    if (
      currentGame.maxCount === picks.numbers.length &&
      currentGame.specialNumberMax &&
      !picks.specialNumber
    ) {
      if (num <= currentGame.specialNumberMax)
        notAdd && dispatch(addSpecialNumber(num));
    }

    notClick && dispatch(setClicked(num === clicked ? -1 : num));
  };
  return { handleSetNumbers };
};

export default useSetPicks;
