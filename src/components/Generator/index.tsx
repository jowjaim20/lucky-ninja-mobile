import React, { useState } from "react";
import { Text, View, Button, Alert } from "react-native";
import useGenerateNumbers from "../../hooks/useGenerateNumbers";
import { addPicksTosaved } from "../../redux/slices/currentGame";
import { toggleAdd } from "../../redux/slices/showAddSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Picks from "../Picks";

const Generator = () => {
  const dispatch = useAppDispatch();
  const picks = useAppSelector((state) => state.picks);

  const { generate } = useGenerateNumbers();
  const [count, setCount] = useState(0);

  const handleCount = () => {
    generate();
    setCount((prev) => prev + 1);
    if (count === 4) {
      dispatch(toggleAdd());
      setCount(0);
    }
  };

  const handleAddSaved = () => {
    dispatch(addPicksTosaved(picks));
    Alert.alert("Alert", "Added to saved numbers", [
      {
        text: "Ok",
      },
    ]);
  };

  return (
    <View>
      <Button title="Generate" onPress={handleCount} />
      <Button title="Add to saved" onPress={handleAddSaved} />

      <Picks numbers={picks} />
      <Text>Generator</Text>
    </View>
  );
};

export default Generator;
