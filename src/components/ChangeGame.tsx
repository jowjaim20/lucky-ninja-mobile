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

const ChangeGame: React.FunctionComponent<{
  navigation: NavigationProp<any, any>;
}> = ({ navigation }) => {
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
    navigation.navigate("Home");
    dispatch(resetPicks());
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
            <Text
              style={{
                color: "#fff",
              }}
            >
              {game.specialNumberMax}
            </Text>
            <Text
              style={{
                color: "#fff",
              }}
            >
              {game.maxNumber}
            </Text>
            <Pressable
              onPress={() =>
                Alert.alert("Alert", `Delete ${game.name}?`, [
                  {
                    text: "Delete",
                    onPress: () => handleDeleteGame(game.id),
                  },
                  {
                    text: "Cancel",
                    onPress: () => {},
                  },
                ])
              }
            >
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
