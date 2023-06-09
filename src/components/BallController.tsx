import React, { useCallback, useMemo } from "react";
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
    activeSet: boolean,
    hexEuro?: string
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
  const clicked = useAppSelector((state) => state.clicked);
  const activeSetIndex = useAppSelector((state) => state.activeSet);

  const currentFrequency = useAppSelector((state) => state.frequency);
  const { getXDraws, getXDrawsEuro } = useHandleXDraws();
  const isClicked = clicked === number;
  const activeSet = activeSetIndex === prevResults[currentIndex]?.id;

  const getHex = useMemo(() => {
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
  }, [prevResults]);

  const getHexEuro = useMemo(() => {
    const filteredFrequency = currentFrequency.frequency.find((freq) =>
      getXDrawsEuro({
        number,
        prevResults,
        currentIndex,
        frequency: freq.frequency,
        range: freq.range,
      })
    );

    return filteredFrequency?.hex || "#999999"; //change default once done
  }, [prevResults]);

  const hex = getHex;
  const hexEuro = getHexEuro;

  return render(hex, isClicked, () => {}, activeSet, hexEuro);
};

export default BallController;
