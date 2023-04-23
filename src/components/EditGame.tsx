import React, { useState, useEffect, FunctionComponent } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Modal,
  Button,
  Alert,
} from "react-native";
import useHandleXDraws from "../hooks/useHandleXdraws";
import { useAppDispatch, useAppSelector } from "../redux/store";
import useModifyArray from "../hooks/useModifyArray";
import Ball from "./Ball";
import {
  resetColorOption,
  setColorOpt,
} from "../redux/slices/colorOptionsSlice";
import { CircleRightIcon, XIcon } from "../utils/svg";
import useScaling from "../hooks/useScaling";
import { Game } from "./enums";
import { useForm } from "react-hook-form";
import NinjaSwitch, { SwitchProps } from "./Switch";
import { InputBoxProps } from "./InputBox";
import InputBox from "./InputBox";
import { updateGame } from "../redux/slices/currentGame";

export type names =
  | "name"
  | "maxCount"
  | "maxNumber"
  | "specialNumberMax"
  | "maxNumberEuro"
  | "maxCountEuro"
  | "link";
export type switchNames = "repeat" | "startZero";

export interface FormProps {
  maxCount: number;
  maxNumber: number;
  maxNumberEuro: number;
  maxCountEuro: number;
  name: string;
  repeat: boolean;
  startZero: boolean;
  specialNumberMax: number;
  link: string;
}

type SwitchArray<T extends switchNames> = Omit<
  SwitchProps<T, FormProps>,
  "errors" | "control" | "keyboardType" | "rules"
>[];

const switchForms: SwitchArray<switchNames> = [
  { label: "Repeat?", name: "repeat" },
  { label: "StartZero?", name: "startZero" },
];

type PropsArray<T extends names> = Omit<
  InputBoxProps<T, FormProps>,
  "errors" | "control"
>[];
const forms: PropsArray<names> = [
  {
    name: "name",
    label: "Game Name",
    rules: {
      required: { value: true, message: "Name is required" },
    },
  },
  {
    label: "Set 1 Length",
    name: "maxCount",
    rules: {
      required: { value: true, message: "Length is required" },
      max: { value: 6, message: "Number should not be more than 6" },
      min: { value: 2, message: "Number should not be less than 2" },
    },
    keyboardType: "numeric",
  },
  {
    name: "maxNumber",
    label: "Set 1 last Number",
    keyboardType: "numeric",
    rules: {
      required: { value: true, message: "Last number is required" },
      max: { value: 99, message: "Number should not be more than 99" },
      min: { value: 1, message: "Number should not be less than 1" },
    },
  },
  {
    name: "maxCountEuro",
    label: "Set 2 Length",
    rules: {
      required: { value: true, message: "Length is required" },
      max: { value: 6, message: "Number should not be more than 6" },
      min: 0,
    },
    keyboardType: "numeric",
  },
  {
    name: "maxNumberEuro",
    label: "Set 2 last Number",
    keyboardType: "numeric",
    rules: {
      required: { value: true, message: "Last number is required" },
      max: { value: 99, message: "Number should not be more than 99" },
      min: 0,
    },
  },
  {
    name: "specialNumberMax",
    label: "Additional Number Last Number",
    keyboardType: "numeric",
    rules: {
      max: { value: 99, message: "Number should not be more than 99" },
    },
  },
  {
    name: "link",
    label: "Game Link",
  },
];

interface ColorMasterProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  game: Game;
  handleDeleteGame: (id: string) => void;
}
const EditGame: FunctionComponent<ColorMasterProps> = (props) => {
  const { modalVisible, setModalVisible, game, handleDeleteGame } = props;
  const { scale } = useScaling();

  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormProps>({
    defaultValues: {
      maxCount: game.maxCount || 0,
      maxNumber: game.maxNumber || 0,
      name: game.name || "",
      repeat: game.repeat || false,
      startZero: game.startZero || false,
      specialNumberMax: game.specialNumberMax || 0,
      maxCountEuro: game.maxCountEuro || 0,
      maxNumberEuro: game.maxNumberEuro || 0,
      link: game.link || "",
    },
  });

  const onSubmit = (data: FormProps) => {
    console.log("data", data);
    dispatch(
      updateGame({
        maxCount: +data.maxCount,
        maxNumber: +data.maxNumber,
        name: data.name,
        repeat: data.repeat,
        startZero: data.startZero,
        specialNumberMax: +data.specialNumberMax,
        previousResults: game.previousResults,
        link: data.link,
        maxCountEuro: data.maxCountEuro,
        maxNumberEuro: data.maxNumberEuro,
        id: game.id,
        saved: game.saved,
      })
    );
    setModalVisible(false);
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            width: 300,
            borderRadius: 16,
            height: 470,
            backgroundColor: "#031E29",
            transform: [{ scale }],
          }}
        >
          <View>
            <View
              style={{
                alignSelf: "flex-end",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                paddingVertical: 10,
                backgroundColor: "#031E29",
                marginRight: 5,
              }}
            >
              <Pressable onPress={() => setModalVisible(false)}>
                <XIcon />
              </Pressable>
            </View>

            <ScrollView>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                {forms.map((form) => (
                  <InputBox
                    key={form.name}
                    control={control}
                    errors={errors}
                    {...form}
                  />
                ))}
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                {switchForms.map((form) => (
                  <NinjaSwitch key={form.name} control={control} {...form} />
                ))}
              </View>
            </ScrollView>

            <View
              style={{
                display: "flex",
                gap: 5,
              }}
            >
              <View>
                <Button
                  color="#1F5062"
                  title="Update"
                  onPress={handleSubmit(onSubmit)}
                />
              </View>
              <View>
                <Button
                  color="#1F5062"
                  title="Delete"
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
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditGame;
