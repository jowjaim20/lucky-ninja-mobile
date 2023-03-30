import React from "react";
import {
  TextInput,
  Text,
  View,
  KeyboardTypeOptions,
  StyleSheet,
  Switch,
} from "react-native";
import {
  Controller,
  Control,
  RegisterOptions,
  FieldErrors,
} from "react-hook-form";

export interface FormProps {
  maxCount: number;
  maxNumber: number;
  name: string;
  repeat: boolean;
  startZero: boolean;
  specialNumberMax: number;
}

import Constants from "expo-constants";

export type switchNames = "startZero" | "repeat";

export interface SwitchProps<T extends switchNames> {
  control: Control<FormProps, any>;
  label: string;
  name: T;
  keyboardType?: KeyboardTypeOptions;
  errors: FieldErrors<FormProps>;
  rules?:
    | Omit<
        RegisterOptions<FormProps, T>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
}

const NinjaSwitch = <T extends switchNames>(props: SwitchProps<T>) => {
  const { control, label, name } = props;

  return (
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
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
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
        name={name}
      />
    </View>
  );
};

export default NinjaSwitch;

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
