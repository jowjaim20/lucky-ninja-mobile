import React, { useEffect, useState } from "react";
import { Button, Linking, View } from "react-native";
import { Text, Alert } from "react-native";
import ResultsCard from "../../components/ResultsCard";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  AppOpenAd,
  AdEventType,
  BannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
} from "react-native-google-mobile-ads";
import { toggleAdd } from "../../redux/slices/showAddSlice";
import AllNumbersCard from "../../components/AllNumbersCard";
import useGenerateNumbers from "../../hooks/useGenerateNumbers";
import { resetPicks } from "../../redux/slices/picksSlice";
import { addPicksTosaved } from "../../redux/slices/currentGame";
import { Pressable } from "react-native";
import {
  BuyMeACoffeeIcon,
  ChartIcon,
  CircleRightIcon,
  FacebookIcon,
  FireIcon,
  InfoICon,
  PatreonIcon,
  RefreshIcon,
  SaveIcon,
  SettingsIcon,
  YoutubeIcon,
} from "../../utils/svg";
import NewPicks from "../../components/NewPicks";
import AllNumbersCardController from "../../components/AllNumbersCardController";
import SocialSites from "../../components/SocialSites";
import ColorMaster from "../../components/ColorMaster";
import useScaling from "../../hooks/useScaling";
import Instructions from "../../components/Instructions";

const Home = () => {
  const picks = useAppSelector((state) => state.picks);
  const { scale } = useScaling();

  const { maxNumber, previousResults, maxCount, name, repeat, id, startZero } =
    useAppSelector((state) => state.currentGame.currentGame);
  const [modalVisible, setModalVisible] = useState(false);
  const [instructonModal, setInstructonModal] = useState(false);

  const [colorModalVisible, setColorModalVisible] = useState(false);

  const allNum = Array.from(
    { length: startZero ? maxNumber + 1 : maxNumber },
    (_, i) => (startZero ? i : i + 1)
  );
  const dispatch = useAppDispatch();

  const { generate } = useGenerateNumbers();
  const [count, setCount] = useState(0);

  const handleCount = () => {
    generate();
    setCount((prev) => prev + 1);
    if (count === 9) {
      dispatch(toggleAdd());
      setCount(0);
    }
  };

  const handleAddSaved = () => {
    const date = new Date();
    dispatch(
      addPicksTosaved({
        numbers: picks.numbers,
        numbersEuro: picks.numbersEuro,
        specialNumber: picks.specialNumber,
        date: date.getTime(),
      })
    );
    Alert.alert("Alert", "Added to saved numbers", [
      {
        text: "Ok",
      },
    ]);
  };
  const handleClearPicks = () => {
    dispatch(resetPicks());
  };

  const filtered = previousResults.filter((_, index) => index <= 4);
  return (
    <>
      <View
        style={{
          flex: 1,
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
            <Pressable onPress={() => setInstructonModal(true)}>
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <InfoICon />
                <Text
                  style={{
                    color: "#fff",
                  }}
                >
                  Instructions
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            flex: 0.9,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <NewPicks ninjaTitle="Ninja Generator" />

          <View
            style={{
              flex: 0.9,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 0.8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ResultsCard edit={false} results={filtered} />
            </View>
            <Instructions
              modalVisible={instructonModal}
              setModalVisible={setInstructonModal}
            />
            <AllNumbersCardController
              results={previousResults}
              allNumbers={allNum}
              currentIndex={-1}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              render={(props) => <AllNumbersCard {...props} />}
            />
            <ColorMaster
              modalVisible={colorModalVisible}
              setModalVisible={setColorModalVisible}
            />
            <View
              style={{
                flex: 0.2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  paddingVertical: 30,
                  flexDirection: "column",
                  width: 55,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#AFBDC2",
                  borderRadius: 8,
                  gap: 16,
                  transform: [{ scale }],
                }}
              >
                <View
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                  }}
                >
                  <Pressable
                    onPress={handleCount}
                    android_ripple={{ color: "#0D3341" }}
                  >
                    <RefreshIcon />
                  </Pressable>
                </View>
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
                    onPress={handleClearPicks}
                    android_ripple={{ color: "#0D3341" }}
                  >
                    <CircleRightIcon />
                  </Pressable>
                </View>
                <View
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                  }}
                >
                  <Pressable
                    onPress={handleAddSaved}
                    android_ripple={{ color: "#0D3341" }}
                  >
                    <SaveIcon />
                  </Pressable>
                </View>
                <View
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                  }}
                >
                  <Pressable
                    onPress={() => setColorModalVisible(true)}
                    android_ripple={{ color: "#0D3341" }}
                  >
                    <SettingsIcon color="#315968" />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <SocialSites />
          </View>
        </View>
      </View>
    </>
  );
};

export default Home;
