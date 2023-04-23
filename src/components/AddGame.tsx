import React, { FunctionComponent, useState } from "react";
import {
  StyleSheet,
  Alert,
  Modal,
  View,
  ScrollView,
  Button,
  Text,
  Pressable,
} from "react-native";
import { useAppDispatch } from "../redux/store";
import { addGame } from "../redux/slices/currentGame";
import { useForm } from "react-hook-form";
import InputBox, { InputBoxProps } from "./InputBox";
import NinjaSwitch, { SwitchProps } from "./Switch";
import { LuckyNinjaLogo, XIcon } from "../utils/svg";
import { gamesArray, powerBall } from "./data";
import { Result } from "./enums";

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

interface AddGameProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddGame: FunctionComponent<AddGameProps> = (props) => {
  const { modalVisible, setModalVisible } = props;
  const [prevResult, setPrevResult] = useState<Result[]>([]);

  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormProps>({
    defaultValues: {
      maxCount: 5,
      maxNumber: 42,
      name: "",
      repeat: false,
      startZero: false,
      specialNumberMax: 0,
      maxCountEuro: 0,
      maxNumberEuro: 0,
      link: "",
    },
  });

  const onSubmit = (data: FormProps) => {
    console.log("data", data);
    dispatch(
      addGame({
        maxCount: +data.maxCount,
        maxNumber: +data.maxNumber,
        name: data.name,
        repeat: data.repeat,
        startZero: data.startZero,
        specialNumberMax: +data.specialNumberMax,
        maxCountEuro: +data.maxCountEuro,
        maxNumberEuro: +data.maxNumberEuro,
        link: data.link,
        previousResults: prevResult,
      })
    );
    Alert.alert("Game Added");
    setModalVisible(false);
  };

  return (
    <Modal
      style={{}}
      animationType="fade"
      //   transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.container}>
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
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LuckyNinjaLogo />
          </View>
          <Text
            style={{
              marginLeft: 4,
              color: "#fff",
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            Ninja Create Game
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: "#fff",
            }}
          >
            Presets
          </Text>
          <ScrollView horizontal>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                marginTop: 20,
              }}
            >
              <Pressable
                onPress={() => {
                  reset({
                    maxCount: 6,
                    maxNumber: 42,
                    maxCountEuro: 0,
                    maxNumberEuro: 0,
                    name: "",
                    repeat: false,
                    startZero: false,
                    link: "",
                    specialNumberMax: 0,
                  });
                  setPrevResult([]);
                }}
              >
                <View
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 15,
                    backgroundColor: "#fff",
                    borderRadius: 12,
                  }}
                >
                  <Text style={{}}>RESET</Text>
                </View>
              </Pressable>
              {gamesArray.map((game) => {
                return (
                  <Pressable
                    key={game.id}
                    onPress={() => {
                      reset({
                        maxCount: game.maxCount,
                        maxNumber: game.maxNumber,
                        maxCountEuro: game.maxCountEuro || 0,
                        maxNumberEuro: game.maxNumberEuro || 0,
                        name: game.name,
                        repeat: game.repeat,
                        startZero: game.startZero,
                        link: game.link || "",

                        specialNumberMax: game.specialNumberMax,
                      });
                      setPrevResult(game.previousResults);
                    }}
                  >
                    <View
                      style={{
                        paddingVertical: 5,
                        paddingHorizontal: 15,
                        backgroundColor: "#fff",
                        borderRadius: 12,
                      }}
                    >
                      <Text>{game.name}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </View>
        <ScrollView>
          <View>
            {forms.map((form) => (
              <InputBox
                key={form.name}
                control={control}
                errors={errors}
                {...form}
              />
            ))}

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
          </View>
        </ScrollView>
        <View
          style={{
            display: "flex",
            gap: 5,
          }}
        >
          {/* <View style={styles.button}>
            <Button
              color="#1F5062"
              title="Reset"
              onPress={() => {
                reset({
                  maxCount: 5,
                  maxNumber: 42,
                  name: "Joel",
                  repeat: false,
                  startZero: false,
                  link: "",
                  maxCountEuro: 2,
                  maxNumberEuro: 2,
                  specialNumberMax: 2,
                });
              }}
            />
          </View> */}

          <View style={styles.button}>
            <Button
              color="#1F5062"
              title="Create"
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddGame;

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 8,
    backgroundColor: "#031E29",
  },
});
