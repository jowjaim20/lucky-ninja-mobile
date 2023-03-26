import React, { useEffect, useState } from "react";
import useModifyArray from "../hooks/useModifyArray";
import { Alert, Button, Modal, ScrollView, Text, View } from "react-native";
import Ball from "./Ball";
import BallController from "./BallController";
import { Result } from "./enums";
import Picks from "./Picks";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  addPicksTosaved,
  addResult,
  insertResult,
} from "../redux/slices/currentGame";
import { resetPicks } from "../redux/slices/picksSlice";
import { Pressable } from "react-native";
import { XIcon } from "../utils/svg";
import useCountColor from "../hooks/useCountColor";
import NewPicks from "./NewPicks";
import Table from "./Table";
import useSetPicks from "../hooks/useSetPicks";

interface AllNumbersProps {
  results: Result[];
  currentIndex: number;
  allNumbers: number[];
  notAdd?: boolean;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  notClick: boolean;
}

const AllNumbersCard: React.FunctionComponent<AllNumbersProps> = (props) => {
  const {
    results,
    currentIndex,
    allNumbers,
    notAdd,
    modalVisible,
    setModalVisible,
    notClick,
  } = props;
  const { newArray } = useModifyArray({
    array: results,
    replaceIndex: currentIndex,
    item: { id: "123", numbers: allNumbers, specialNumber: 0 },
  });
  const dispatch = useAppDispatch();
  const { handleSetNumbers } = useSetPicks({ notAdd: true, notClick: false });
  const { countColors } = useCountColor();
  const currentFrequency = useAppSelector((state) => state.frequency);
  const [filtered, setfiltered] = useState<number[]>(allNumbers);
  const picks = useAppSelector((state) => state.picks);
  const {
    maxNumber,
    previousResults,
    maxCount,
    name,
    repeat,
    id,
    startZero,
    specialNumberMax,
  } = useAppSelector((state) => state.currentGame.currentGame);

  useEffect(() => {
    const filteredAllNumbers = allNumbers.filter(
      (num) => num <= specialNumberMax
    );

    if (picks.numbers.length === maxCount && specialNumberMax !== 0)
      setfiltered(filteredAllNumbers);
    if (picks.numbers.length === 0) setfiltered(allNumbers);
  }, [picks, specialNumberMax]);

  const handleAddResult = () => {
    if (picks.numbers.length === maxCount) {
      dispatch(
        addResult({
          numbers: picks.numbers.map((obj) => obj.number),
          specialNumber: picks.specialNumber,
        })
      );

      dispatch(resetPicks());
    }
  };
  const counts = countColors(previousResults);

  const handleInsertResult = () => {
    if (picks.numbers.length === maxCount) {
      dispatch(
        insertResult({
          numbers: picks.numbers.map((obj) => obj.number),
          specialNumber: picks.specialNumber,
        })
      );

      dispatch(resetPicks());
    }
  };

  const handleAddSaved = () => {
    // dispatch(addPicksTosaved(picks));
    Alert.alert("Alert", "Added to saved numbers", [
      {
        text: "Ok",
      },
    ]);
  };

  const handleClearPicks = () => {
    dispatch(resetPicks());
  };

  return (
    <Modal
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
          backgroundColor: "#1e1e1e",
        }}
      >
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
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
          }}
        >
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

            <NewPicks />
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Button
                color="#1e1e1e"
                title="Add picks"
                onPress={handleAddResult}
              />
              <Button
                color="#1e1e1e"
                title="Insert picks"
                onPress={handleInsertResult}
              />
              <Button
                color="#1e1e1e"
                title="Clear"
                onPress={handleClearPicks}
              />
              <Button color="#1e1e1e" title="Save" onPress={handleAddSaved} />
            </View>
          </View>
          <View
            style={{
              height: 400,
            }}
          >
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
                {filtered.map((num, index) => (
                  <BallController
                    key={`${num}${index}`}
                    {...{ currentIndex, number: num, prevResults: newArray }}
                    render={(hex, clicked, onClick) => (
                      <Ball
                        ripple={{ color: hex, borderless: false }}
                        onClick={handleSetNumbers}
                        clicked={false}
                        title={num}
                        hex={hex}
                      />
                    )}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AllNumbersCard;
