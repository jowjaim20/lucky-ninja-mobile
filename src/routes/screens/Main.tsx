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
import Ball from "../../components/Ball";
import { Result } from "../../components/enums";
import Picks from "../../components/Picks";
import ResultsCard from "../../components/ResultsCard";
import ResultsCard2 from "../../components/ResultsCard2";
import useCountColor from "../../hooks/useCountColor";
import { setClicked } from "../../redux/slices/clickedSlice";
import { setColor } from "../../redux/slices/colorSlice";
import { deleteResult, updateArray } from "../../redux/slices/currentGame";
import { resetPicks } from "../../redux/slices/picksSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import NewPicks from "../../components/NewPicks";
import { ChartIcon, RefreshIcon, YoutubeIcon } from "../../utils/svg";
import AllNumbersCardController from "../../components/AllNumbersCardController";
import EditResults from "../../components/EditResults";

const Main = () => {
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [edit, setEdit] = useState(false);

  const currentFrequency = useAppSelector((state) => state.frequency);
  // const picks = useAppSelector((state) => state.picks);

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
    <View>
      <View
        style={{
          padding: 6,
        }}
      >
        {!edit ? (
          <NewPicks />
        ) : (
          <Button title="Done" onPress={() => setEdit(false)} />
        )}

        <AllNumbersCardController
          results={previousResults}
          allNumbers={allNum}
          currentIndex={-1}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          render={(props) => <AllNumbersCard {...props} />}
        />

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignSelf: "stretch",
            gap: 4,
            justifyContent: "space-between",
          }}
        >
          {edit ? (
            <EditResults {...{ edit, setEdit }} />
          ) : (
            <ResultsCard2 allNumbers={allNum} results={previousResults} />
          )}

          {!edit && (
            <View
              style={{
                flex: 1,
              }}
            >
              <View
                style={{
                  height: 52,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                  }}
                >
                  <Pressable
                    onPress={() => setModalVisible((prev) => !prev)}
                    android_ripple={{ color: "#0D3341" }}
                  >
                    <ChartIcon />
                  </Pressable>
                </View>
                <View
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                  }}
                >
                  <Pressable
                    onPress={() => setEdit((prev) => !prev)}
                    android_ripple={{ color: "#0D3341" }}
                  >
                    <RefreshIcon />
                  </Pressable>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  backgroundColor: "#AFBDC2",
                  borderRadius: 8,
                  height: 454,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    width: 46,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingVertical: 12,
                    }}
                  >
                    <Text>Count</Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ScrollView
                      style={{
                        height: 410,
                      }}
                      contentContainerStyle={{
                        gap: 1.2,
                      }}
                    >
                      {counts
                        .sort((a, b) => b.count - a.count)
                        .map((freq) => {
                          return (
                            <View
                              style={{
                                width: 40,
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              key={freq.name}
                            >
                              {/* <Text>{freq.count}</Text> */}
                              <Ball title={freq.count} hex={freq.hex} />
                            </View>
                          );
                        })}
                    </ScrollView>
                  </View>
                </View>
                <View
                  style={{
                    width: 46,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingVertical: 12,
                    }}
                  >
                    <Text>Freq</Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ScrollView
                      style={{
                        height: 410,
                      }}
                      contentContainerStyle={{
                        gap: 1.2,
                      }}
                    >
                      {currentFrequency.frequency.map((freq) => {
                        return (
                          <View
                            style={{
                              width: 40,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            key={freq.id}
                          >
                            <Ball
                              title={`${freq.frequency}/${freq.range}`}
                              hex={freq.hex}
                            />
                          </View>
                        );
                      })}
                      <View>
                        <Ball title="etc" hex="#999" />
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
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
