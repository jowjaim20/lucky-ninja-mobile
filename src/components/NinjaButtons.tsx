import React, { FunctionComponent } from "react";
import { View, Pressable, Button, Text } from "react-native";
import { XIcon } from "../utils/svg";

interface NinjaButtonsProps {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleInsertResult: () => void;
  handleAddResult: () => void;
  handleAddSaved: () => void;
  handleClearPicks: () => void;
}

const NinjaButtons: FunctionComponent<NinjaButtonsProps> = (props) => {
  const {
    setModalVisible,
    handleAddResult,
    handleAddSaved,
    handleClearPicks,
    handleInsertResult,
  } = props;
  return (
    <View
      style={{
        backgroundColor: "#1e1e1e",
        padding: 20,
        width: 400,
        borderRadius: 6,
        marginBottom: 4,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable onPress={() => setModalVisible(false)}>
        <XIcon />
      </Pressable>
      <Text style={{ color: "white" }}>All Numbers</Text>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Button color="#1e1e1e" title="Add picks" onPress={handleAddResult} />
        <Button
          color="#1e1e1e"
          title="Insert picks"
          onPress={handleInsertResult}
        />
        <Button color="#1e1e1e" title="Clear" onPress={handleClearPicks} />
        <Button color="#1e1e1e" title="Save" onPress={handleAddSaved} />
      </View>
    </View>
  );
};

export default NinjaButtons;
