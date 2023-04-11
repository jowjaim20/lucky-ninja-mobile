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
  PatreonIcon,
  RefreshIcon,
  SaveIcon,
  YoutubeIcon,
} from "../../utils/svg";
import NewPicks from "../../components/NewPicks";
import AllNumbersCardController from "../../components/AllNumbersCardController";
import SocialSites from "../../components/SocialSites";

const Home = () => {
  const picks = useAppSelector((state) => state.picks);

  const { maxNumber, previousResults, maxCount, name, repeat, id, startZero } =
    useAppSelector((state) => state.currentGame.currentGame);
  const [modalVisible, setModalVisible] = useState(false);

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
      <View>
        <View
          style={{
            elevation: 20,
          }}
        >
          <View
            style={{
              padding: 12,
              backgroundColor: "#0D3341",
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
          </View>
        </View>
        <View
          style={[
            {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            },
          ]}
        >
          <NewPicks ninjaTitle="Ninja Generator" />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
            justifyContent: "center",
          }}
        >
          <ResultsCard edit={false} results={filtered} />

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
              flexDirection: "column",
              width: 55,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#AFBDC2",
              borderRadius: 8,
              gap: 25,
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
          </View>
        </View>
        <SocialSites />
      </View>
    </>
  );
};

export default Home;
