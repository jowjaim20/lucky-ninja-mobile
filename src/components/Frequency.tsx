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
        paddingHorizontal: 5,
        paddingVertical: 4,
      }}
    >
      <Text>Frequency</Text>
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
        <View style={{ backgroundColor: "#999" }}>
          <Text>others</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Frequency;
