import React, { useEffect, useState } from "react";
import {
  changeGame,
  clear,
  deleteGame,
  updateGame,
} from "../redux/slices/currentGame";
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
  Alert,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Game } from "./enums";
import { XIcon } from "../utils/svg";
import { toggleAdd } from "../redux/slices/showAddSlice";
import { resetPicks, setPicks } from "../redux/slices/picksSlice";
import { NavigationProp } from "@react-navigation/native";
import GameCard from "./GameCard";
import { resetColorOption } from "../redux/slices/colorOptionsSlice";

const ChangeGame: React.FunctionComponent<{
  navigation: NavigationProp<any, any>;
}> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { games } = useAppSelector((state) => state.currentGame);
  const [count, setCount] = useState(0);
  const currentGame = useAppSelector((state) => state.currentGame.currentGame);

  const handleDeleteGame = (id: string) => {
    dispatch(deleteGame(id));
  };

  const handleChangeGame = (game: Game) => {
    dispatch(resetPicks());
    dispatch(updateGame(currentGame));
    dispatch(resetColorOption());

    dispatch(changeGame(game));
    setCount((prev) => prev + 1);
    if (count === 2) {
      dispatch(toggleAdd());
      setCount(0);
      setTimeout(() => {
        navigation.navigate("Home");
      }, 3000);
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <View>
      <ScrollView style={{}}>
        <GameCard
          {...{ currentGame, games, handleChangeGame, handleDeleteGame }}
        />
        {games.length === 0 && (
          <Text
            style={{
              color: "#fff",
            }}
          >
            No Games to Show. Add more games
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ChangeGame;
