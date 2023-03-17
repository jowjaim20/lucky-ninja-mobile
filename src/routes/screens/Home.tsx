import React from "react";
import { View } from "react-native";
import { Text } from "react-native";
import ResultsCard from "../../components/ResultsCard";
import { useAppSelector } from "../../redux/store";

const Home = () => {
  const { maxNumber, previousResults, maxCount, name, repeat, id, startZero } =
    useAppSelector((state) => state.currentGame.currentGame);

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
        <Text>Generator</Text>
        <ResultsCard edit={false} results={filtered} />
        <Text>Social Media</Text>
      </View>
    </>
  );
};

export default Home;
