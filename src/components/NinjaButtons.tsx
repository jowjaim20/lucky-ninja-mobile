import React, { FunctionComponent } from "react";
import { View, Pressable, Button, Text } from "react-native";
import { XIcon } from "../utils/svg";

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
    <View style={{ display: "flex", flexDirection: "column" }}>
      <Button color="#1e1e1e" title="Add picks" onPress={handleAddResult} />
      <Button
        color="#1e1e1e"
        title="Insert picks"
        onPress={handleInsertResult}
      />
      <Button color="#1e1e1e" title="Clear" onPress={handleClearPicks} />
      <Button color="#1e1e1e" title="Save" onPress={handleAddSaved} />
    </View>
  );
};

export default NinjaButtons;
