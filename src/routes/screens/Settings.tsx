import React, { useState } from "react";
import { Button } from "react-native";
import { Text, View } from "react-native";
import AddGame from "../../components/AddGame";
import ChangeGame from "../../components/ChangeGame";
import { NavigationProp } from "@react-navigation/native";

const Settings: React.FunctionComponent<{
  navigation: NavigationProp<any, any>;
}> = ({ navigation }) => {
  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);

  return (
    <View>
      <Button
        color="#1e1e1e"
        title="Show Add Game"
        onPress={() => setModalVisibleAdd((prev) => !prev)}
      />
      <AddGame
        modalVisible={modalVisibleAdd}
        setModalVisible={setModalVisibleAdd}
      />
      <ChangeGame navigation={navigation} />
    </View>
  );
};

export default Settings;
