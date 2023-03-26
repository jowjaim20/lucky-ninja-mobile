import React from "react";
import useModifyArray from "../hooks/useModifyArray";
import {
  StyleSheet,
  TextInput,
  Alert,
  Button,
  Modal,
  Text,
  View,
  Switch,
  ScrollView,
} from "react-native";
import Ball from "./Ball";
import BallController from "./BallController";
import { Result } from "./enums";
import Picks from "./Picks";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { addGame, addResult } from "../redux/slices/currentGame";
import { resetPicks } from "../redux/slices/picksSlice";
import { useForm, Controller } from "react-hook-form";
import Constants from "expo-constants";

interface AddGameProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormProps {
  maxCount: number;
  maxNumber: number;
  name: string;
  repeat: boolean;
  startZero: boolean;
  specialNumberMax: number;
}

const AddGame: React.FunctionComponent<AddGameProps> = (props) => {
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

  //   const onChange = (arg) => {
  //     return {
  //       value: arg.nativeEvent.text,
  //     };
  //   };

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
          <Text style={styles.label}>Length</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value.toString()}
              />
            )}
            name="maxCount"
            rules={{ required: true, max: 6 }}
          />
          <Text style={styles.label}>Last Number</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value.toString()}
              />
            )}
            name="maxNumber"
            rules={{ required: true, max: 99 }}
          />
          <Text style={styles.label}>Special Number Last Number</Text>

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value.toString()}
              />
            )}
            name="specialNumberMax"
            rules={{ required: true }}
          />
          <Text style={styles.label}>Name</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value.toString()}
              />
            )}
            name="name"
            rules={{ required: true }}
          />
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View
              style={{
                width: 200,
                height: 100,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.label}>Repeat</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => {
                  console.log("value", value);
                  return (
                    <Switch
                      trackColor={{ false: "#767577", true: "#81b0ff" }}
                      thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
                      onValueChange={() => {
                        console.log("est");
                        onChange(!value);
                      }}
                      value={value}
                    />
                  );
                }}
                name="repeat"
              />
            </View>
            <View
              style={{
                width: 200,
                height: 100,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.label}>StartZero</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
                    onValueChange={() => {
                      console.log("est1");
                      onChange(!value);
                    }}
                    value={value}
                  />
                )}
                name="startZero"
              />
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
