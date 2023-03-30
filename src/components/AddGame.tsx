import React, { FunctionComponent } from "react";
import {
  StyleSheet,
  Alert,
  Modal,
  View,
  ScrollView,
  Button,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { addGame, addResult } from "../redux/slices/currentGame";
import { FieldValues, useForm } from "react-hook-form";
import Constants from "expo-constants";
import InputBox, { InputBoxProps } from "./InputBox";
import NinjaSwitch, { SwitchProps } from "./Switch";

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
  { label: "Reapet?", name: "repeat" },
  { label: "StartZero?", name: "startZero" },
];

type PropsArray<T extends names> = Omit<
  InputBoxProps<T, FormProps>,
  "errors" | "control"
>[];
const forms: PropsArray<names> = [
  {
    name: "name",
    label: "Name",
    rules: {
      required: { value: true, message: "required" },
    },
  },
  {
    label: "Length",
    name: "maxCount",
    rules: {
      required: { value: true, message: "required" },
      max: { value: 6, message: "max should not be more than 6" },
      min: { value: 2, message: "min should not be less than 2" },
    },
    keyboardType: "numeric",
  },
  {
    name: "maxNumber",
    label: "last Number",
    keyboardType: "numeric",
    rules: {
      required: { value: true, message: "required" },
      max: { value: 99, message: "max should not be more than 99" },
      min: { value: 1, message: "min should not be less than 1" },
    },
  },
  {
    name: "specialNumberMax",
    label: "special number",
    keyboardType: "numeric",
    rules: {
      max: { value: 99, message: "max should not be more than 99" },
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
    register,
    setValue,
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

  useAppSelector((state) => state.currentGame.currentGame);

  return (
    <Modal
      animationType="fade"
      //   transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <ScrollView>
        <View style={styles.container}>
          {forms.map((form) => (
            <InputBox control={control} errors={errors} {...form} />
          ))}
          <View style={{ display: "flex", flexDirection: "row" }}>
            {switchForms.map((form) => (
              <NinjaSwitch control={control} {...form} />
            ))}
          </View>
        </View>

        <View style={styles.button}>
          <Button
            color="#1e1e1e"
            title="Reset"
            onPress={() => {
              reset({
                maxCount: 6,
                maxNumber: 42,
                name: "test",
                repeat: false,
                startZero: false,
              });
            }}
          />
        </View>

        <View style={styles.button}>
          <Button
            color="#1e1e1e"
            title="Add"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </Modal>
  );
};

export default AddGame;

const styles = StyleSheet.create({
  label: {
    color: "white",
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: "white",
    height: 40,
    backgroundColor: "#ec5990",
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: "#0e101c",
  },
  input: {
    backgroundColor: "#fff",
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});
