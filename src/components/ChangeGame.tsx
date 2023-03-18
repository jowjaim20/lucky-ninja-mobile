import React from "react";
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
} from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Game } from "./enums";
import { XIcon } from "../utils/svg";
import { toggleAdd } from "../redux/slices/showAddSlice";

const ChangeGame = () => {
  const dispatch = useAppDispatch();
  const { games } = useAppSelector((state) => state.currentGame);
  const currenGame = useAppSelector((state) => state.currentGame.currentGame);

  const handleDeleteGame = (id: string) => {
    dispatch(deleteGame(id));
  };
  // const handleClear = () => {
  //   dispatch(clear());
  // };
  const handleChangeGame = (game: Game) => {
    dispatch(toggleAdd());
    console.log("game", game.id);
    dispatch(updateGame(currenGame));
    dispatch(changeGame(game));
  };
  const filteredGames: Game[] = games.filter(
    (game) => game.id !== currenGame.id
  );

  return (
    <View>
      <View>
        {filteredGames.map((game) => (
          <View
            key={game.id}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Button
              color="#1e1e1e"
              title="Change"
              onPress={() => handleChangeGame(game)}
            />
            <Text
              style={{
                color: "#fff",
              }}
            >
              {game.name}
            </Text>
            <Pressable onPress={() => handleDeleteGame(game.id)}>
              <View>
                <XIcon />
              </View>
            </Pressable>
          </View>
        ))}
        {filteredGames.length === 0 && (
          <Text
            style={{
              color: "#fff",
            }}
          >
            No Games to Show. Add more games
          </Text>
        )}
      </View>
    </View>
  );
};

export default ChangeGame;
