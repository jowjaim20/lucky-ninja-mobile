import React from "react";
import {
  TextInput,
  Text,
  View,
  KeyboardTypeOptions,
  StyleSheet,
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

export type name = "name" | "maxCount" | "maxNumber" | "specialNumberMax";

export interface InputBoxProps<T extends name> {
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

const InputBox = <T extends name>(props: InputBoxProps<T>) => {
  const {
    control,
    label,
    name,
    keyboardType = "default",
    errors,
    rules,
  } = props;
  console.log("errors", errors);
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            keyboardType={keyboardType}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value.toString()}
          />
        )}
        name={name}
        rules={rules}
      />
      {errors[name] && (
        <Text style={{ color: "#f00" }}>{errors[name]?.message}</Text>
      )}
    </View>
  );
};

export default InputBox;

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
