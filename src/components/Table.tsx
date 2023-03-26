import React, { FunctionComponent, useEffect, useState } from "react";
import useModifyArray from "../hooks/useModifyArray";
import { Alert, Button, Modal, ScrollView, Text, View } from "react-native";
import Ball from "./Ball";
import BallController from "./BallController";
import { Result } from "./enums";
import Picks from "./Picks";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  addPicksTosaved,
  addResult,
  insertResult,
} from "../redux/slices/currentGame";
import { resetPicks } from "../redux/slices/picksSlice";
import { Pressable } from "react-native";
import { XIcon } from "../utils/svg";
import useCountColor from "../hooks/useCountColor";
import NewPicks from "./NewPicks";
import useSetPicks from "../hooks/useSetPicks";

interface TableProps {
  filtered: number[];
  newArray: {
    id: string;
    numbers: number[];
    specialNumber: number;
  }[];
}
const Table: FunctionComponent<TableProps> = ({ filtered, newArray }) => {
  const { handleSetNumbers } = useSetPicks({ notAdd: true, notClick: false });
  return (
    <View
      style={{
        height: 400,
      }}
    >
      <ScrollView>
        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            width: 280,
            backgroundColor: "#1e1e1e",
            padding: 10,
            borderRadius: 6,
          }}
        >
          {filtered.map((num, index) => (
            <BallController
              key={`${num}${index}`}
              {...{ currentIndex: -1, number: num, prevResults: newArray }}
              render={(hex, clicked, onClick) => (
                <Ball
                  ripple={{ color: hex, borderless: false }}
                  onClick={handleSetNumbers}
                  clicked={false}
                  title={num}
                  hex={hex}
                />
              )}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Table;
