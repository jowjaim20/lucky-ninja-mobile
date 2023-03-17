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

interface ResultsCardProps {
  results: Result[];
  allNumbers?: number[];
  edit?: boolean;
}

const renderItem = ({
  drag,
  getIndex,
  isActive,
  item,
}: RenderItemParams<Result>) => {
  const { previousResults, specialNumberMax } = useAppSelector(
    (state) => state.currentGame.currentGame
  );
  const activeIndex = useAppSelector((state) => state.activeSet);
  const colorAll = useAppSelector((state) => state.color);

  const currIndex = getIndex() || 0;
  const dispath = useAppDispatch();

  return (
    <ScaleDecorator>
      <TouchableOpacity
        onPress={() => {
          dispath(setActiveSet(item.id === activeIndex ? "" : item.id));
        }}
        onLongPress={drag}
        disabled={isActive}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              padding: 10,
            }}
          >
            <SortIcon />
          </View>

          <View key={item.id}>
            <ScrollView horizontal style={{ width: 290 }}>
              {item.numbers.map((num, index) => (
                <BallController
                  notAdd={false}
                  key={`${num}${index}`}
                  {...{
                    currentIndex: currIndex,
                    number: num,
                    prevResults: previousResults,
                  }}
                  render={(hex, clicked, onClick, activeSet) => (
                    <Ball
                      onClick={onClick}
                      className="w-10 h-10 text-3xl rounded"
                      title={num}
                      hex={hex}
                      clicked={clicked || colorAll}
                      activeSet={activeSet}
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
                      onClick={onClick}
                      className="w-10 h-10 text-3xl rounded"
                      title={item.specialNumber || 0}
                      hex="#454545"
                      clicked={true}
                      activeSet={activeSet}
                    />
                  )}
                />
              )}
            </ScrollView>
          </View>
          <Pressable
            android_ripple={{ color: "#fff" }}
            onPress={() => dispath(deleteResult(item.id))}
          >
            <View>
              <XIcon />
            </View>
          </Pressable>
        </View>
      </TouchableOpacity>
    </ScaleDecorator>
  );
};

const ResultsCard: FunctionComponent<ResultsCardProps> = (props) => {
  const { results, edit } = props;
  const dispath = useAppDispatch();

  const handleSort = ({ data }: { data: Result[] }) => {
    dispath(updateArray(data));
  };

  return (
    <View>
      <DraggableFlatList
        style={{
          height: 430,
          flexDirection: "column",
          gap: 2,
        }}
        onDragEnd={handleSort}
        keyExtractor={(item) => item.id}
        data={results}
        renderItem={(props) => renderItem(props)}
      />
    </View>
  );
};

export default ResultsCard;
