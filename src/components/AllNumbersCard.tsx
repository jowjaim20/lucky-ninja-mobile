import React, { useEffect, useState } from "react";
import useModifyArray from "../hooks/useModifyArray";
import { Alert, Button, Modal, ScrollView, Text, View } from "react-native";
import Ball from "./Ball";
import BallController from "./BallController";
import { Result } from "./enums";
import Picks from "./Picks";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { addResult, insertResult } from "../redux/slices/currentGame";
import { resetPicks } from "../redux/slices/picksSlice";
import { Pressable } from "react-native";
import { XIcon } from "../utils/svg";

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
          numbers: picks.numbers,
          specialNumber: picks.specialNumber,
        })
      );

      dispatch(resetPicks());
    }
  };

  const handleInsertResult = () => {
    if (picks.numbers.length === maxCount) {
      dispatch(
        insertResult({
          numbers: picks.numbers,
          specialNumber: picks.specialNumber,
        })
      );

      dispatch(resetPicks());
    }
  };

  const handleClearPicks = () => {
    dispatch(resetPicks());
  };

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

          <View
            style={{
              height: 44,
              paddingVertical: 2,
            }}
          >
            <Picks numbers={picks} />
          </View>
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
            <Button color="#1e1e1e" title="Clear" onPress={handleClearPicks} />
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
                  notClick={notClick}
                  notAdd={notAdd}
                  key={`${num}${index}`}
                  {...{ currentIndex, number: num, prevResults: newArray }}
                  render={(hex, clicked, onClick) => (
                    <Ball
                      ripple={{ color: hex, borderless: false }}
                      onClick={onClick}
                      clicked={false}
                      className="w-10 h-10 "
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
    </Modal>
  );
};

export default AllNumbersCard;
