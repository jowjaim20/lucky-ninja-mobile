import React, { FunctionComponent } from "react";
import { View, Pressable, Button, Text, Alert } from "react-native";
import { Game } from "./enums";
import { XIcon } from "../utils/svg";

interface GameCardProps {
  games: Game[];
  handleDeleteGame: (id: string) => void;
  handleChangeGame: (game: Game) => void;
  currentGame: Game;
}

const GameCard: FunctionComponent<GameCardProps> = (props) => {
  const { games, handleDeleteGame, handleChangeGame, currentGame } = props;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}
    >
      {games.map((game) => (
        <Card
          key={game.id}
          {...{ currentGame, game, handleChangeGame, handleDeleteGame }}
        />
      ))}
    </View>
  );
};

export default GameCard;

interface CardProps {
  handleDeleteGame: (id: string) => void;
  handleChangeGame: (game: Game) => void;
  currentGame: Game;
  game: Game;
}

const Card: FunctionComponent<CardProps> = (props) => {
  const { currentGame, handleChangeGame, handleDeleteGame, game } = props;
  return (
    <View
      key={game.id}
      style={{
        alignSelf: "stretch",
        flexDirection: "column",
        gap: 10,
        backgroundColor: "#1F5062",
        padding: 10,
        borderRadius: 8,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {game.name}
        </Text>

        {game.id !== currentGame.id && (
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
        )}
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 3,
          backgroundColor: "#0D3341",
        }}
      >
        {game?.previousResults[0]?.numbers?.map((num) => (
          <Text>{num}</Text>
        ))}

        {<Text>{game?.previousResults[0]?.specialNumber}</Text>}
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
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

        {game.id !== currentGame.id ? (
          <Pressable onPress={() => handleChangeGame(game)}>
            <View
              style={{
                backgroundColor: "#fff",
              }}
            >
              <Text
                style={{
                  color: "#000",
                }}
              >
                Play
              </Text>
            </View>
          </Pressable>
        ) : (
          <Button color="#ff89" title="Current" />
        )}
      </View>
    </View>
  );
};
