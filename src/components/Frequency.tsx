import React, { FunctionComponent } from "react";
import { View, ScrollView, Text } from "react-native";
import { MockFrequency } from "./data";

interface FrequencyProps {
  currentFrequency: MockFrequency;
}

const Frequency: FunctionComponent<FrequencyProps> = (props) => {
  const { currentFrequency } = props;
  return (
    <View>
      <ScrollView horizontal style={{ flexDirection: "row" }}>
        {currentFrequency.frequency.map((freq) => {
          return (
            <View
              style={{
                backgroundColor: freq.hex,
                width: 40,
                padding: 3,
                justifyContent: "center",
                alignItems: "center",
              }}
              key={freq.id}
            >
              <Text>
                {freq.frequency}/{freq.range}
              </Text>
            </View>
          );
        })}
        <View style={{ backgroundColor: "#999" }}>
          <Text>others</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Frequency;
