import { useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import Ball from "../../components/Ball";
import { Result } from "../../components/enums";
import Picks from "../../components/Picks";
import { deletedSave } from "../../redux/slices/currentGame";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const TestScreen = () => {
  const dispath = useAppDispatch();
  const saved = useAppSelector((state) => state.currentGame.currentGame.saved);
  const handleDeleteSaved = (index: number) => {
    dispath(deletedSave(index));
  };
  return (
    <View>
      {saved?.map((obj, index) => (
        <View
          key={index}
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {obj.numbers.map((num, idx) => (
            <Ball key={idx} title={num.number} hex={num.hex} />
          ))}
          <Button
            title="delete"
            onPress={() =>
              Alert.alert("Alert", "Delete Saved?", [
                {
                  text: "Delete",
                  onPress: () => {
                    handleDeleteSaved(index);
                  },
                },
                {
                  text: "Cancel",
                  onPress: () => {},
                },
              ])
            }
          />
        </View>
      ))}
    </View>
  );
};

export default TestScreen;
