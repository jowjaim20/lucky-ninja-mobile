import React, { FunctionComponent, useEffect, useState } from "react";
import useModifyArray from "../hooks/useModifyArray";
import { Alert } from "react-native";
import { Result } from "./enums";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  addPicksTosaved,
  addResult,
  insertResult,
} from "../redux/slices/currentGame";
import { resetPicks } from "../redux/slices/picksSlice";
import useCountColor from "../hooks/useCountColor";
import { AllNumbersCardProps } from "./AllNumbersCard";
import { resetColorOption } from "../redux/slices/colorOptionsSlice";

interface AllNumbersCardControllerProps {
  results: Result[];
  currentIndex: number;
  allNumbers: number[];
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  render: (props: AllNumbersCardProps) => JSX.Element;
}

const AllNumbersCardController = (props: AllNumbersCardControllerProps) => {
  const {
    results,
    currentIndex,
    allNumbers,
    modalVisible,
    setModalVisible,
    render,
  } = props;

  const { newArray } = useModifyArray({
    array: results,
    replaceIndex: currentIndex,
    item: { id: "123", numbers: allNumbers, specialNumber: 0 },
  });

  const dispatch = useAppDispatch();
  const { countColors } = useCountColor();
  const currentFrequency = useAppSelector((state) => state.frequency);
  const [filtered, setfiltered] = useState<number[]>(allNumbers);
  const picks = useAppSelector((state) => state.picks);
  const { previousResults, maxCount, specialNumberMax } = useAppSelector(
    (state) => state.currentGame.currentGame
  );

  useEffect(() => {
    const filteredAllNumbers = allNumbers.filter(
      (num) => num <= specialNumberMax
    );

    if (picks.numbers.length === maxCount && specialNumberMax !== 0)
      setfiltered(filteredAllNumbers);
    if (picks.numbers.length === 0) setfiltered(allNumbers);
  }, [picks, specialNumberMax]);

  const handleAddResult = () => {
    dispatch(resetColorOption());

    if (picks.numbers.length === maxCount) {
      dispatch(
        addResult({
          numbers: picks.numbers.map((obj) => obj.number),
          specialNumber: picks.specialNumber,
        })
      );

      dispatch(resetPicks());
    }
  };
  const counts = countColors(previousResults);

  const handleInsertResult = () => {
    if (picks.numbers.length === maxCount) {
      dispatch(
        insertResult({
          numbers: picks.numbers.map((obj) => obj.number),
          specialNumber: picks.specialNumber,
        })
      );

      dispatch(resetPicks());
    }
  };

  const handleAddSaved = () => {
    const date = new Date();
    dispatch(
      addPicksTosaved({
        numbers: picks.numbers,
        specialNumber: picks.specialNumber,
        date: date.getTime(),
      })
    );
    Alert.alert("Alert", "Added to saved numbers", [
      {
        text: "Ok",
      },
    ]);
  };

  const handleClearPicks = () => {
    dispatch(resetPicks());
  };

  return render({
    modalVisible,
    setModalVisible,
    currentFrequency,
    counts,
    handleAddResult,
    handleAddSaved,
    handleClearPicks,
    handleInsertResult,
    currentIndex,
    filtered,
    newArray,
  });
};

export default AllNumbersCardController;
