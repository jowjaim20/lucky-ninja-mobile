import React, { useState } from "react";

import { Settings } from "react-native";

import {
  Platform,
  Pressable,
  SafeAreaView,
  View,
  StatusBar,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Dimensions,
  Switch,
} from "react-native";
import AddGame from "../../components/AddGame";
import AllNumbersCard from "../../components/AllNumbersCard";
import { Result } from "../../components/enums";
import Picks from "../../components/Picks";
import ResultsCard from "../../components/ResultsCard";
import useCountColor from "../../hooks/useCountColor";
import { setClicked } from "../../redux/slices/clickedSlice";
import { setColor } from "../../redux/slices/colorSlice";
import { deleteResult, updateArray } from "../../redux/slices/currentGame";
import { resetPicks } from "../../redux/slices/picksSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const Main = () => {
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(false);

  const currentFrequency = useAppSelector((state) => state.frequency);
  const color = useAppSelector((state) => state.color);
  const picks = useAppSelector((state) => state.picks);

  const { countColors } = useCountColor();
  const { maxNumber, previousResults, maxCount, name, repeat, id, startZero } =
    useAppSelector((state) => state.currentGame.currentGame);
  console.log("maxNumber", maxNumber);

  const counts = countColors(previousResults);

  const handleDeleteResult = (id: string) => {
    dispatch(deleteResult(id));
  };

  const update = (array: Result[]) => {
    dispatch(updateArray(array));
  };

  const handleSetClicked = (array: number) => {
    dispatch(setClicked(array));
  };
  const allNum = Array.from(
    { length: startZero ? maxNumber + 1 : maxNumber },
    (_, i) => (startZero ? i : i + 1)
  );

  const halfWindowsWidth = Dimensions.get("window").height * 0.1;
  return (
    <>
      <View>
        <View>
          <ScrollView horizontal style={{ flexDirection: "row" }}>
            {currentFrequency.frequency.map((freq) => {
              return (
                <View
                  style={{
                    backgroundColor: freq.hex,
                    width: 40,
                    padding: 3,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  key={freq.id}
                >
                  <Text>
                    {freq.frequency}/{freq.range}
                  </Text>
                </View>
              );
            })}
            <View style={{ backgroundColor: "#999" }}>
              <Text>others</Text>
            </View>
          </ScrollView>
        </View>
        <View>
          <ScrollView horizontal>
            {counts
              .sort((a, b) => b.count - a.count)
              .map((freq) => {
                return (
                  <View
                    style={{
                      backgroundColor: freq.hex,
                      width: 40,
                      padding: 3,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    key={freq.name}
                  >
                    <Text>{freq.count}</Text>
                  </View>
                );
              })}
          </ScrollView>
        </View>
      </View>

      <Button
        color="#1e1e1e"
        title="Show"
        onPress={() => setModalVisible((prev) => !prev)}
      />
      <Button
        color="#1e1e1e"
        title="Edit"
        onPress={() => dispatch(setColor(!color))}
      />
      <AllNumbersCard
        notClick={false}
        results={previousResults}
        allNumbers={allNum}
        currentIndex={-1}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <View style={{ height: 44, paddingVertical: 2, flexDirection: "row" }}>
        <Picks numbers={picks} />
      </View>
      <View>
        <ResultsCard
          allNumbers={allNum}
          results={previousResults}
          edit={true}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    backgroundColor: "#2D2D2D5c",
  },
  text: {
    color: "#fff",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default Main;
