import React, { FunctionComponent, useState } from "react";
import { View, Pressable, Button, Text, Alert, StyleSheet } from "react-native";
import { Game } from "./enums";
import { BuyMeACoffeeIcon, ExternalLink, PenIcon, XIcon } from "../utils/svg";
import Ball from "./Ball";
import EditGame from "./EditGame";
import { Linking } from "react-native";

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
  console.log("game", game);
  const [edit, setEdit] = useState(false);
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
      <EditGame
        modalVisible={edit}
        setModalVisible={setEdit}
        game={game}
        handleDeleteGame={handleDeleteGame}
      />
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
          <Pressable onPress={() => setEdit(true)}>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PenIcon size={30} color="#fff" />
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

        {game?.previousResults[0]?.numbersEuro?.map((num, idx) => (
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
            alignItems: "center",
            justifyContent: "space-between",
            width: 160,
          }}
        >
          <Text style={styles.text}>{game.maxCount}</Text>
          <Text style={styles.text}>{game.maxNumber}</Text>

          <Text style={styles.text}>{game.maxCountEuro}</Text>
          <Text style={styles.text}>{game.maxNumberEuro}</Text>

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

          <View
            style={{
              width: 38,
              height: 38,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pressable
              onPress={() => {
                Linking.openURL(
                  game.link || `https://google.com/search?q=${game.name}`
                );
              }}
              android_ripple={{ color: "#0D3341", borderless: true }}
            >
              <ExternalLink />
            </Pressable>
          </View>
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
