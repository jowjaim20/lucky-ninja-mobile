import React, { FunctionComponent, useState } from "react";
import {
  ScrollView,
  View,
  FlatList,
  Text,
  PanResponder,
  Animated,
  PanResponderInstance,
  TouchableOpacity,
  Touchable,
  Pressable,
  Alert,
} from "react-native";
import Ball from "./Ball";
import BallController from "./BallController";
import { Result } from "./enums";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { updateArray, deleteResult } from "../redux/slices/currentGame";
import { Button } from "react-native";
import { setClicked } from "../redux/slices/clickedSlice";
import { addNumber, setPicks } from "../redux/slices/picksSlice";
import { setActiveSet } from "../redux/slices/activeSetSlice";
import { SortIcon, XIcon } from "../utils/svg";
import useScaling from "../hooks/useScaling";

interface ResultsCardProps {
  results: Result[];
  allNumbers?: number[];
  edit?: boolean;
}

interface RowItemProps {
  item: Result;
  currIndex: number;
}

const RowItem: FunctionComponent<RowItemProps> = (props) => {
  const { item, currIndex } = props;
  const dispatch = useAppDispatch();
  const clicked = useAppSelector((state) => state.clicked);
  const colorAll = useAppSelector((state) => state.color);
  const { previousResults, specialNumberMax } = useAppSelector(
    (state) => state.currentGame.currentGame
  );

  const handleSetClick = (num: number, hex: string) => {
    dispatch(setClicked(num === clicked ? -1 : num));
  };
  return (
    <View key={item.id}>
      <ScrollView horizontal>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 3,
          }}
        >
          {item.numbers.map((num, index) => (
            <BallController
              key={`${num}${index}`}
              {...{
                currentIndex: currIndex,
                number: num,
                prevResults: previousResults,
              }}
              render={(hex, clicked, onClick, activeSet) => (
                <Ball
                  onClick={handleSetClick}
                  title={num}
                  hex={hex}
                  size={37}
                  clicked={clicked || colorAll}
                />
              )}
            />
          ))}

          {item.numbersEuro?.map((num, index) => (
            <BallController
              key={`${num}${index}`}
              {...{
                currentIndex: currIndex,
                number: num,
                prevResults: previousResults,
              }}
              render={(hex, clicked, onClick, activeSet, hexEuro) => (
                <Ball
                  onClick={handleSetClick}
                  title={num}
                  hex={hexEuro}
                  size={37}
                  isEuro
                  clicked={clicked || colorAll}
                />
              )}
            />
          ))}

          {specialNumberMax !== 0 && (
            <BallController
              key={item.id}
              {...{
                currentIndex: currIndex,
                number: item.specialNumber,
                prevResults: previousResults,
              }}
              render={(hex, clicked, onClick, activeSet) => (
                <Ball
                  onClick={handleSetClick}
                  title={item.specialNumber || 0}
                  hex="#fff"
                  size={37}
                />
              )}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const ResultsCard: FunctionComponent<ResultsCardProps> = (props) => {
  const { results, edit } = props;
  console.log("results", results);
  const { scale } = useScaling();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        padding: 9,
        backgroundColor: "#AFBDC2",
        width: 300,
        height: 290,
        gap: 10,
        transform: [{ scale }],
      }}
    >
      <Text
        style={{
          color: "#0D3341",
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        Past Results
      </Text>
      <FlatList
        style={{
          flexDirection: "column",
        }}
        contentContainerStyle={{
          gap: 5,
          marginTop: 10,
        }}
        keyExtractor={(item) => item.id}
        data={results}
        renderItem={({ index, item }) => (
          <RowItem currIndex={index} item={item} />
        )}
      />
    </View>
  );
};

export default ResultsCard;
