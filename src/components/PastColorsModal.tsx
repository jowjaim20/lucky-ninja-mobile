import React, { FunctionComponent } from "react";
import { Modal, View, Text, ScrollView, Pressable } from "react-native";
import NumberContainer from "./NumberContainer";
import { Result } from "./enums";
import AllNumbersCardController from "./AllNumbersCardController";
import AllNumbersCard from "./AllNumbersCard";
import { useAppSelector } from "../redux/store";
import BallController from "./BallController";
import Ball from "./Ball";
import useModifyArray from "../hooks/useModifyArray";
import { XIcon } from "../utils/svg";

interface PastColorModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  currentIndex: number;
}
const PastColorsModal: FunctionComponent<PastColorModalProps> = (props) => {
  const { modalVisible, setModalVisible, currentIndex } = props;
  const { maxNumber, previousResults, maxCount, name, repeat, id, startZero } =
    useAppSelector((state) => state.currentGame.currentGame);

  const allNum = Array.from(
    { length: startZero ? maxNumber + 1 : maxNumber },
    (_, i) => (startZero ? i : i + 1)
  );
  const { newArray } = useModifyArray({
    array: previousResults,
    replaceIndex: currentIndex,
    item: { id: "123", numbers: allNum, specialNumber: 0 },
  });
  return (
    <Modal
      transparent={false}
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
        }}
      >
        <View
          style={{
            alignSelf: "stretch",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Pressable onPress={() => setModalVisible(false)}>
            <XIcon />
          </Pressable>
        </View>
        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            width: 280,
            backgroundColor: "#1e1e1e",
            padding: 10,
            borderRadius: 6,
          }}
        >
          {previousResults[currentIndex].numbers.map((num, idx) => (
            <BallController
              key={`${num}${idx}`}
              {...{
                currentIndex,
                number: num,
                prevResults: newArray,
              }}
              render={(hex, clicked, onClick) => (
                <Ball
                  ripple={{ color: hex, borderless: false }}
                  title={num}
                  hex={hex}
                />
              )}
            />
          ))}

          {previousResults[currentIndex].specialNumber !== 0 && (
            <Ball
              title={previousResults[currentIndex].specialNumber || 0}
              hex="#fff"
            />
          )}
        </View>
        <ScrollView>
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              width: 280,
              backgroundColor: "#1e1e1e",
              padding: 10,
              borderRadius: 6,
            }}
          >
            {allNum.map((num, idx) => {
              return (
                <BallController
                  key={`${num}${idx}`}
                  {...{
                    currentIndex,
                    number: num,
                    prevResults: newArray,
                  }}
                  render={(hex, clicked, onClick) => (
                    <Ball
                      ripple={{ color: hex, borderless: false }}
                      title={num}
                      hex={hex}
                    />
                  )}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default PastColorsModal;
