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
import {
  BuyMeACoffeeIcon,
  ChevronRightIcon,
  SortIcon,
  XIcon,
} from "../utils/svg";

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
  const colorAll = useAppSelector((state) => state.color);
  const clicked = useAppSelector((state) => state.clicked);

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
            gap: 1,
            backgroundColor: "#AFBDC2",
            paddingHorizontal: 3,
            paddingVertical: 3,
            borderRadius: 12,
          }}
        >
          {item.numbers.map((num, index) => (
            <BallController
              notAdd={false}
              key={`${num}${index}`}
              {...{
                currentIndex: currIndex,
                number: num,
                prevResults: previousResults,
              }}
              render={(hex, clicked, onClick) => (
                <Ball
                  onClick={handleSetClick}
                  title={num}
                  hex={hex}
                  size={35}
                  clicked={clicked || colorAll}
                />
              )}
            />
          ))}

          {specialNumberMax !== 0 && (
            <BallController
              notAdd={false}
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
                  size={35}
                />
              )}
            />
          )}
          <View
            style={{
              borderRadius: 50,
              overflow: "hidden",
              width: 35,
              height: 35,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pressable android_ripple={{ color: "#0D3341", borderless: true }}>
              <ChevronRightIcon />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const ResultsCard2: FunctionComponent<ResultsCardProps> = (props) => {
  const { results, edit } = props;
  const color = useAppSelector((state) => state.color);
  const dispath = useAppDispatch();

  const handleSort = ({ data }: { data: Result[] }) => {
    dispath(updateArray(data));
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 16,
        width: 258,
        justifyContent: "center",
        alignItems: "center",
        height: 510,
        gap: 10,
      }}
    >
      <View
        style={{
          marginVertical: 10,
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
      </View>
      <FlatList
        style={{
          flexDirection: "column",
        }}
        contentContainerStyle={{
          gap: 5,
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

export default ResultsCard2;
