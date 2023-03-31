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

  return (
    <Modal
      transparent={false}
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          backgroundColor: "#D5D9DA",
        }}
      >
        <View
          style={{
            alignSelf: "flex-end",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingVertical: 10,
            marginRight: 5,
          }}
        >
          <Pressable onPress={() => setModalVisible(false)}>
            <XIcon />
          </Pressable>
        </View>
        <NewPicks />

        <Frequency currentFrequency={currentFrequency} />

        <Count counts={counts} />

        <View
          style={{
            display: "flex",
            flexDirection: "row",
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
    </Modal>
  );
};

export default AllNumbersCard;
