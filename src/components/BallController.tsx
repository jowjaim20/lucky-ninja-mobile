import React, { useCallback } from "react";
import useHandleXDraws from "../hooks/useHandleXdraws";
import { setClicked } from "../redux/slices/clickedSlice";
import { addNumber, addSpecialNumber } from "../redux/slices/picksSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { mockFrequency } from "./data";
import { Result } from "./enums";

interface BallControllerProps {
  number: number;
  prevResults: Result[];
  currentIndex: number;
  render: (
    hex: string,
    clicked: boolean,
    onClick: (num: number) => void,
    activeSet: boolean
  ) => JSX.Element;
  notAdd?: boolean;
  notClick?: boolean;
}
const BallController: React.FunctionComponent<BallControllerProps> = (
  props
) => {
  const {
    number,
    prevResults,
    currentIndex,
    render,
    notAdd = true,
    notClick = true,
  } = props;
  const dispatch = useAppDispatch();
  const picks = useAppSelector((state) => state.picks);
  const clicked = useAppSelector((state) => state.clicked);
  const activeSetIndex = useAppSelector((state) => state.activeSet);

  const currentFrequency = useAppSelector((state) => state.frequency);
  const currentGame = useAppSelector((state) => state.currentGame.currentGame);
  const { getXDraws } = useHandleXDraws();
  const isClicked = clicked === number;
  const activeSet = activeSetIndex === prevResults[currentIndex]?.id;

  const handleSetNumbers = (num: number) => {
    if (currentGame.repeat && currentGame.maxCount !== picks.numbers.length) {
      notAdd && dispatch(addNumber(num));
    } else {
      const includes = picks.numbers.includes(num);
      if (!includes && currentGame.maxCount !== picks.numbers.length) {
        notAdd && dispatch(addNumber(num));
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

  const getHex = () => {
    const filteredFrequency = currentFrequency.frequency.find((freq) =>
      getXDraws({
        number,
        prevResults,
        currentIndex,
        frequency: freq.frequency,
        range: freq.range,
      })
    );

    return filteredFrequency?.hex || "#999999"; //change default once done
  };

  const hex = getHex();

  return render(hex, isClicked, handleSetNumbers, activeSet);
};

export default BallController;
