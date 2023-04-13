import React, { FunctionComponent } from "react";
import { Modal, View } from "react-native";
import { Result } from "./enums";
import NewPicks from "./NewPicks";
import NumberContainer from "./NumberContainer";
import NinjaButtons from "./NinjaButtons";
import Frequency from "./Frequency";
import Count from "./Count";
import { MockFrequency } from "./data";
import { Pressable } from "react-native";
import { XIcon } from "../utils/svg";
import useScaling from "../hooks/useScaling";

export interface AllNumbersCardProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  currentFrequency: MockFrequency;
  counts: {
    name: string;
    count: number;
    hex: string;
  }[];
  newArray: Result[];
  handleInsertResult: () => void;
  handleAddResult: () => void;
  handleAddSaved: () => void;
  handleClearPicks: () => void;
  currentIndex: number;
  filtered: number[];
}

const AllNumbersCard: FunctionComponent<AllNumbersCardProps> = (props) => {
  const {
    counts,
    currentFrequency,
    currentIndex,
    filtered,
    handleAddResult,
    handleAddSaved,
    handleClearPicks,
    handleInsertResult,
    modalVisible,
    newArray,
    setModalVisible,
  } = props;
  const { scale } = useScaling();

  return (
    <Modal
      transparent={true}
      animationType="fade"
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
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            width: 336,
            borderRadius: 16,
            height: 400,
            backgroundColor: "#D5D9DA",
            marginTop: 120,
            overflow: "hidden",
            transform: [{ scale }],
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

          {/* <View
            style={{
              backgroundColor: "#1F5062",
              marginHorizontal: 10,
              borderRadius: 8,
              paddingVertical: 8,
            }}
          >
            <NewPicks ninjaTitle="Ninja Picker" />
            <Frequency currentFrequency={currentFrequency} />

            <Count counts={counts} />
          </View> */}

          <View
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              gap: 10,
              marginHorizontal: 10,
              marginVertical: 15,
            }}
          >
            <NumberContainer {...{ currentIndex, filtered, newArray }} />
            <NinjaButtons
              {...{
                handleAddResult,
                handleAddSaved,
                handleClearPicks,
                handleInsertResult,
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AllNumbersCard;
