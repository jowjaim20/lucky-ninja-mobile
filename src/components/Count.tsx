import React, { FunctionComponent } from "react";
import { View, ScrollView, Text } from "react-native";

interface CountProps {
  counts: {
    name: string;
    count: number;
    hex: string;
  }[];
}

const Count: FunctionComponent<CountProps> = (props) => {
  const { counts } = props;
  return (
    <View
      style={{
        paddingHorizontal: 5,
        paddingVertical: 4,
      }}
    >
      <Text>Past Result Color Count</Text>

      <ScrollView horizontal>
        <View style={{ display: "flex", flexDirection: "row", gap: 2 }}>
          {counts
            .sort((a, b) => b.count - a.count)
            .map((freq) => {
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
                  key={freq.name}
                >
                  <Text
                    style={{
                      color: "#031E29",
                      fontWeight: "500",
                    }}
                  >
                    {freq.count}
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

export default Count;
