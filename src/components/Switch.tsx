import React from "react";
import { Text, View, StyleSheet, Switch } from "react-native";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

export interface SwitchProps<T extends Path<U>, U extends FieldValues> {
  control: Control<U, any>;
  label: string;
  name: T;
}

const NinjaSwitch = <T extends Path<U>, U extends FieldValues>(
  props: SwitchProps<T, U>
) => {
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
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <Switch
              trackColor={{ false: "#767577", true: "#AFBDC2" }}
              thumbColor={value ? "#0D3341" : "#AFBDC2"}
              onValueChange={() => {
                console.log("est");
                onChange(!value);
              }}
              value={value}
            />
          );
        }}
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
});
