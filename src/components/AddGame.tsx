import React, { FunctionComponent } from "react";
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
import Constants from "expo-constants";
import InputBox, { InputBoxProps } from "./InputBox";
import NinjaSwitch, { SwitchProps } from "./Switch";
import { LuckyNinjaLogo, XIcon } from "../utils/svg";

export type names = "name" | "maxCount" | "maxNumber" | "specialNumberMax";
export type switchNames = "repeat" | "startZero";

export interface FormProps {
  maxCount: number;
  maxNumber: number;
  name: string;
  repeat: boolean;
  startZero: boolean;
  specialNumberMax: number;
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
    label: "Length",
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
    label: "Game last Number",
    keyboardType: "numeric",
    rules: {
      required: { value: true, message: "Last number is required" },
      max: { value: 99, message: "Number should not be more than 99" },
      min: { value: 1, message: "Number should not be less than 1" },
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
];

interface AddGameProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddGame: FunctionComponent<AddGameProps> = (props) => {
  const { modalVisible, setModalVisible } = props;

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
        <View
          style={{
            display: "flex",
            gap: 5,
          }}
        >
          <View style={styles.button}>
            <Button
              color="#1F5062"
              title="Reset"
              onPress={() => {
                reset({
                  maxCount: 5,
                  maxNumber: 42,
                  name: "",
                  repeat: false,
                  startZero: false,
                });
              }}
            />
          </View>

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
