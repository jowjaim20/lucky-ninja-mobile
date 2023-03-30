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
    <View>
      <View>
        <ScrollView horizontal>
          {counts
            .sort((a, b) => b.count - a.count)
            .map((freq) => {
              return (
                <View
                  style={{
                    backgroundColor: freq.hex,
                    width: 40,
                    padding: 3,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  key={freq.name}
                >
                  <Text>{freq.count}</Text>
                </View>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
};

export default Count;
