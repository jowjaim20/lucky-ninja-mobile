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
import { LuckyNinjaLogo, XIcon } from "../utils/svg";
import useScaling from "../hooks/useScaling";

interface PastColorModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  currentIndex: number;
}
const PastColorsModal: FunctionComponent<PastColorModalProps> = (props) => {
  const { modalVisible, setModalVisible, currentIndex } = props;
  const { scale } = useScaling();
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
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: [{ scale }],
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            width: 300,
            borderRadius: 16,
            height: 300,
            backgroundColor: "#D5D9DA",
            overflow: "hidden",
          }}
        >
          <View
            style={{
              alignSelf: "flex-end",
            }}
          >
            <Pressable onPress={() => setModalVisible(false)}>
              <XIcon />
            </Pressable>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              width: 250,
              borderRadius: 16,
              backgroundColor: "#D5D9DA",
            }}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: -30,
              }}
            >
              {previousResults[currentIndex]?.date ? (
                <Text
                  style={{
                    color: "#031E29",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {previousResults[currentIndex]?.date}
                </Text>
              ) : (
                <Text
                  style={{
                    color: "#031E29",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Ninja Time Machine
                </Text>
              )}
            </View>
            <View
              style={{
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
                width: 260,
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
            <View
              style={{
                backgroundColor: "#1F5062",
                width: 270,
                padding: 10,
                borderRadius: 6,
              }}
            >
              <ScrollView
                style={{
                  height: 166,
                }}
              >
                <View
                  style={{
                    flexWrap: "wrap",
                    gap: 2,
                    flexDirection: "row",
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
          </View>
        </View>
        {/* <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              flexDirection: "row",
              padding: 10,
              marginBottom: 20,
              borderRadius: 8,
            }}
          >
            <LuckyNinjaLogo />
            <Text
              style={{
                marginLeft: 4,
                color: "#031E29",
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              Ninja Time Machine
            </Text>
          </View> */}
      </View>
    </Modal>
  );
};

export default PastColorsModal;
