import React, { FunctionComponent } from "react";
import { View, Pressable, Button, Text } from "react-native";
import { AddPicksIcon, SaveIcon, SortIcon, XIcon } from "../utils/svg";
import { RefreshIcon } from "../utils/svg";
import { CircleRightIcon } from "../utils/svg";

interface NinjaButtonsProps {
  handleInsertResult: () => void;
  handleAddResult: () => void;
  handleAddSaved: () => void;
  handleClearPicks: () => void;
}

const NinjaButtons: FunctionComponent<NinjaButtonsProps> = (props) => {
  const {
    handleAddResult,
    handleAddSaved,
    handleClearPicks,
    handleInsertResult,
  } = props;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: 270,
        height: 55,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#AFBDC2",
        borderRadius: 8,
        gap: 25,
      }}
    >
      <NinjaButton onPress={handleAddResult} icon={<AddPicksIcon />} />
      <NinjaButton
        onPress={handleInsertResult}
        icon={
          <AddPicksIcon
            style={{
              transform: [{ rotateZ: "180deg" }],
            }}
          />
        }
      />
      <NinjaButton onPress={handleClearPicks} icon={<CircleRightIcon />} />
      <NinjaButton onPress={handleAddSaved} icon={<SaveIcon />} />
    </View>
  );
};

interface NinjaButtonProps {
  icon: JSX.Element;
  onPress: () => void;
}
const NinjaButton: FunctionComponent<NinjaButtonProps> = (props) => {
  const { onPress, icon } = props;
  return (
    <Pressable android_ripple={{ color: "#fff" }} onPress={onPress}>
      {icon}
    </Pressable>
  );
};

export default NinjaButtons;
