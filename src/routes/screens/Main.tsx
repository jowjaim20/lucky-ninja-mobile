import React, { useState } from "react";

import { Alert, Settings } from "react-native";

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
  Linking,
} from "react-native";
import AddGame from "../../components/AddGame";
import base64 from "react-native-base64";
import AllNumbersCard from "../../components/AllNumbersCard";
import Ball from "../../components/Ball";
import { Result, gameKeys } from "../../components/enums";
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
import {
  ChartIcon,
  ExternalLink,
  InfoICon,
  LuckyNinjaLogo,
  PenIcon,
  RefreshIcon,
  YoutubeIcon,
} from "../../utils/svg";
import AllNumbersCardController from "../../components/AllNumbersCardController";
import EditResults from "../../components/EditResults";
import PastColorsModal from "../../components/PastColorsModal";
import useScaling from "../../hooks/useScaling";
import axios from "axios";

const Main = () => {
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [disable, setDisable] = useState(false);

  const currentFrequency = useAppSelector((state) => state.frequency);
  const { scale } = useScaling();
  // const picks = useAppSelector((state) => state.picks);

  const { countColors } = useCountColor();
  const {
    maxNumber,
    previousResults,
    maxCount,
    name,
    repeat,
    id,
    startZero,
    link,
    key,
  } = useAppSelector((state) => state.currentGame.currentGame);
  console.log("maxNumber", maxNumber);

  const counts = countColors(previousResults);
  const isKeyAvailable = gameKeys.find((thisKey) => thisKey === key);

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

  const fetchData = async () => {
    const username = "thiistheway";
    const password = "winteriscoming";

    try {
      const data = await axios.get(
        `https://dull-gray-chick-tam.cyclic.app/games/${key}`,
        {
          headers: {
            "Cache-Control": "no-cache",
            Authorization: "Basic " + base64.encode(username + ":" + password),
          },
        }
      );
      const gameFetch = data.data;

      gameFetch && dispatch(updateArray(gameFetch.previousResults));
      Alert.alert("Game is updated!");
      setDisable(false);
    } catch (error) {
      console.log("error", error);
      Alert.alert("Something went wrong!. Please contact support");

      setDisable(false);
      console.log("error", error);
    }
  };

  const handleUpdateArray = () => {
    setDisable(true);
    fetchData();
  };

  const halfWindowsWidth = Dimensions.get("window").height * 0.1;
  return (
    <View
      style={{
        flex: 0.9,
      }}
    >
      <View
        style={{
          elevation: 20,
        }}
      >
        <View
          style={{
            padding: 12,
            backgroundColor: "#0D3341",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "#AFBDC2",
            }}
          >
            {name}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 20,
            }}
          >
            {isKeyAvailable && (
              <View
                style={{
                  width: 38,
                  height: 38,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Pressable
                  onPress={() => {
                    handleUpdateArray();
                  }}
                  disabled={disable}
                  android_ripple={{ color: "#0D3341", borderless: true }}
                >
                  <View
                    style={{
                      width: 80,
                      backgroundColor: disable ? "#AFBDC2" : "#fff",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 12,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "500",
                        color: disable ? "#fff" : "#0D3341",
                      }}
                    >
                      Update
                    </Text>
                  </View>
                </Pressable>
              </View>
            )}
            <View
              style={{
                width: 38,
                height: 38,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pressable
                onPress={() => {
                  Linking.openURL(
                    link || `https://google.com/search?q=${name}`
                  );
                }}
                android_ripple={{ color: "#0D3341", borderless: true }}
              >
                <ExternalLink />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      {!edit ? (
        <View>
          <NewPicks ninjaTitle="Ninja Analyzer" />
        </View>
      ) : (
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Button title="Done" color="#031E29" onPress={() => setEdit(false)} />

          <View
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LuckyNinjaLogo />
            </View>
            <Text
              style={{
                marginLeft: 4,
                color: "#031E29",
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              Ninja Past Result Editor
            </Text>
          </View>
        </View>
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
          flex: 1,
          display: "flex",
          flexDirection: "row",
          gap: 4,
          justifyContent: "space-between",
        }}
      >
        {!edit && (
          <View
            style={{
              flex: 0.7,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10 * scale,
              marginHorizontal: 10 * scale,
              borderRadius: 20 * scale,
            }}
          >
            <ResultsCard2 allNumbers={allNum} results={previousResults} />
          </View>
        )}
        {edit && (
          <View
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10 * scale,
              marginHorizontal: 10 * scale,
              borderRadius: 20 * scale,
            }}
          >
            <EditResults {...{ edit, setEdit }} />
          </View>
        )}

        {!edit && (
          <View
            style={{
              flex: 0.3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10 * scale,
              marginHorizontal: 10 * scale,
              borderRadius: 20 * scale,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                transform: [{ scale }],
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                gap: 10,
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
                    <PenIcon />
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
                  height: 332,
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
                    <Text
                      style={{
                        color: "#031E29",
                        fontSize: 10,
                        fontWeight: "700",
                      }}
                    >
                      COUNT
                    </Text>
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
                        height: 290,
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
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#031E29",
                        fontWeight: "700",
                      }}
                    >
                      FREQ
                    </Text>
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
                        height: 290,
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
          </View>
        )}
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
