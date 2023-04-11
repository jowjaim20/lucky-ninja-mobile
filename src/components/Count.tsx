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
        Past Result Color Count
      </Text>

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
      </ScrollView>
    </View>
  );
};

export default Count;
