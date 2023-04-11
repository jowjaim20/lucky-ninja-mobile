import React, { FunctionComponent } from "react";
import { View, Pressable, Button, Text, Alert, StyleSheet } from "react-native";
import { Game } from "./enums";
import { XIcon } from "../utils/svg";
import Ball from "./Ball";

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
        }}
      >
        {game?.previousResults[0]?.numbers?.map((num, idx) => (
          <Ball title={num} hex="#fff" key={`${num}${idx}`} />
        ))}

        {game?.previousResults[0]?.specialNumber ? (
          <Ball title={game?.previousResults[0]?.specialNumber} hex="#fff" />
        ) : null}
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: 100,
          }}
        >
          <Text style={styles.text}>{game.maxCount}</Text>
          <Text style={styles.text}>{game.maxNumber}</Text>
          {game.repeat ? (
            <Text style={styles.text}>R</Text>
          ) : (
            <Text style={styles.text}>X</Text>
          )}
          {game.startZero ? (
            <Text style={styles.text}>Z</Text>
          ) : (
            <Text style={styles.text}>X</Text>
          )}

          <Text style={styles.text}>{game.specialNumberMax}</Text>
        </View>

        {game.id !== currentGame.id ? (
          <Pressable onPress={() => handleChangeGame(game)}>
            <View
              style={{
                backgroundColor: "#fff",
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: "#000",
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                Play
              </Text>
            </View>
          </Pressable>
        ) : (
          <View
            style={{
              backgroundColor: "#031E29",
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              Current
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
});
