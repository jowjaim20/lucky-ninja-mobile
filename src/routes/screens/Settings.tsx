import React, { useState } from "react";
import { Button } from "react-native";
import { Text, View } from "react-native";
import AddGame from "../../components/AddGame";
import ChangeGame from "../../components/ChangeGame";

const Settings = () => {
  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);

  return (
    <View>
      <Text>Settings</Text>
      <Button
        color="#1e1e1e"
        title="Show Add Game"
        onPress={() => setModalVisibleAdd((prev) => !prev)}
      />
      <AddGame
        modalVisible={modalVisibleAdd}
        setModalVisible={setModalVisibleAdd}
      />
      <ChangeGame />
    </View>
  );
};

export default Settings;
