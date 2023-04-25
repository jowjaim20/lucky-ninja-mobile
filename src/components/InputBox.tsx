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
  FieldValues,
  Path,
} from "react-hook-form";

export interface InputBoxProps<T extends Path<U>, U extends FieldValues> {
  control: Control<U, any>;
  label: string;
  name: T;
  keyboardType?: KeyboardTypeOptions;
  errors: FieldErrors<U>;
  rules?:
    | Omit<
        RegisterOptions<U, T>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
}

const InputBox = <T extends Path<U>, U extends FieldValues>(
  props: InputBoxProps<T, U>
) => {
  const {
    control,
    label,
    name,
    keyboardType = "default",
    errors,
    rules,
  } = props;

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
        <Text style={{ color: "#f00" }}>{errors[name]?.message as string}</Text>
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
  input: {
    backgroundColor: "#fff",
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});
