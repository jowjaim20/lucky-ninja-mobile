import React, { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Result } from "./enums";
import { deleteResult, updateArray } from "../redux/slices/currentGame";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { SortIcon, XIcon } from "../utils/svg";
import {
  TouchableOpacity,
  Pressable,
  View,
  Alert,
  ScrollView,
} from "react-native";
import BallController from "./BallController";
import Ball from "./Ball";
import { Modal } from "react-native";

interface RowItemProps {
  item: Result;
  currIndex: number;
}

const RowItem: FunctionComponent<RowItemProps> = (props) => {
  const { item, currIndex } = props;
  const colorAll = useAppSelector((state) => state.color);
  const { previousResults, specialNumberMax } = useAppSelector(
    (state) => state.currentGame.currentGame
  );

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
                  onClick={() => {}}
                  title={num}
                  hex={hex}
                  size={40}
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
                  onClick={() => {}}
                  title={item.specialNumber || 0}
                  hex="#fff"
                  size={40}
                />
              )}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const renderItem = ({
  drag,
  getIndex,
  isActive,
  item,
}: RenderItemParams<Result>) => {
  const currIndex = getIndex() || 0;
  const dispath = useAppDispatch();

  return (
    <ScaleDecorator>
      <TouchableOpacity
        onPress={() => {
          console.log("pressing");
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
              padding: 3,
            }}
          >
            <SortIcon />
          </View>

          <RowItem currIndex={currIndex} item={item} />

          <Pressable
            android_ripple={{ color: "#fff" }}
            onPress={() =>
              Alert.alert("Alert", "Delete Picks?", [
                {
                  text: "Delete",
                  onPress: () => dispath(deleteResult(item.id)),
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
      </TouchableOpacity>
    </ScaleDecorator>
  );
};

interface EditResultProps {}

const EditResults: FunctionComponent<EditResultProps> = (props) => {
  const results = useAppSelector(
    (state) => state.currentGame.currentGame.previousResults
  );

  const dispath = useAppDispatch();

  const handleSort = ({ data }: { data: Result[] }) => {
    console.log("data", data);
    dispath(updateArray(data));
  };
  return (
    <View>
      <DraggableFlatList
        style={{
          height: 430,
          flexDirection: "column",
        }}
        onDragEnd={handleSort}
        keyExtractor={(item) => item.id}
        data={results}
        renderItem={(props) => renderItem(props)}
      />
    </View>
  );
};

export default EditResults;
