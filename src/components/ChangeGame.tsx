import React, { useEffect } from "react";
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

const ChangeGame: React.FunctionComponent<{
  navigation: NavigationProp<any, any>;
}> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { games } = useAppSelector((state) => state.currentGame);
  const currentGame = useAppSelector((state) => state.currentGame.currentGame);

  const handleDeleteGame = (id: string) => {
    dispatch(deleteGame(id));
  };

  const handleChangeGame = (game: Game) => {
    navigation.navigate("Home");
    dispatch(resetPicks());
    dispatch(toggleAdd());
    console.log("game", game.id);
    dispatch(updateGame(currentGame));
    dispatch(changeGame(game));
  };

  return (
    <View>
      <ScrollView
        style={{
          height: 520,
        }}
      >
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
