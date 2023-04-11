import React, { FunctionComponent } from "react";
import { View, ScrollView, Text } from "react-native";
import { MockFrequency } from "./data";

interface FrequencyProps {
  currentFrequency: MockFrequency;
}

const Frequency: FunctionComponent<FrequencyProps> = (props) => {
  const { currentFrequency } = props;
  return (
    <View
      style={{
        paddingHorizontal: 10,
        borderRadius: 8,
        marginHorizontal: 8,
        paddingVertical: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1F5062",
        gap: 5,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontWeight: "800",
        }}
      >
        Frequency
      </Text>
      <ScrollView horizontal>
        <View style={{ display: "flex", flexDirection: "row", gap: 2 }}>
          {currentFrequency.frequency.map((freq) => {
            return (
              <View
                style={{
                  backgroundColor: freq.hex,
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  borderColor: "#031E29",
                  borderWidth: 2,
                  padding: 3,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={freq.id}
              >
                <Text
                  style={{
                    color: "#031E29",
                    fontWeight: "500",
                  }}
                >
                  {freq.frequency}/{freq.range}
                </Text>
              </View>
            );
          })}
        </View>
        <View
          style={{
            backgroundColor: "#999",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 40,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: "#000",
            marginLeft: 2,
          }}
        >
          <Text>etc</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Frequency;
