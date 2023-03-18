import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { Text } from "react-native";
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

const Home = () => {
  const dispatch = useAppDispatch();

  const { maxNumber, previousResults, maxCount, name, repeat, id, startZero } =
    useAppSelector((state) => state.currentGame.currentGame);

  const [count, setCount] = useState(0);

  const handleCount = () => {
    setCount((prev) => prev + 1);
    if (count === 4) {
      dispatch(toggleAdd());
      setCount(0);
    }
  };

  const filtered = previousResults.filter((_, index) => index <= 4);
  return (
    <>
      <View>
        <Text
          style={{
            fontSize: 30,
            color: "#555",
          }}
        >
          {name}
        </Text>
        <Text>{count}</Text>
        <Button title="Count" onPress={handleCount} />
        <ResultsCard edit={false} results={filtered} />
        <Text>Social Media</Text>
      </View>
    </>
  );
};

export default Home;
