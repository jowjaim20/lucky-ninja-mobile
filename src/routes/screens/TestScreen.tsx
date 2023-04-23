import { useState } from "react";
import { View, Text, Button, Alert, Pressable, ScrollView } from "react-native";
import Ball from "../../components/Ball";
import { Result } from "../../components/enums";
import Picks from "../../components/Picks";
import { deletedSave } from "../../redux/slices/currentGame";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { XIcon } from "../../utils/svg";

const TestScreen = () => {
  const dispath = useAppDispatch();
  const saved = useAppSelector((state) => state.currentGame.currentGame.saved);
  console.log("saved", saved);
  const handleDeleteSaved = (index: number) => {
    dispath(deletedSave(index));
  };

  return (
    <View
      style={{
        flex: 0.9,
      }}
    >
      <ScrollView style={{}}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            justifyContent: "center",
            paddingVertical: 6,
          }}
        >
          {saved?.map((obj, index) => (
            <View
              key={index}
              style={{
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#1F5062",
                borderRadius: 4,
                paddingHorizontal: 12,
                marginHorizontal: 6,
                paddingVertical: 12,
                gap: 6,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {obj.numbers.map((num, idx) => (
                    <Ball key={idx} title={num.number} hex={num.hex} />
                  ))}

                  {obj.numbersEuro?.map((num, idx) => (
                    <Ball key={idx} title={num.number} hex={num.hex} />
                  ))}

                  {obj?.specialNumber !== 0 && (
                    <Ball
                      onClick={() => {}}
                      title={obj.specialNumber || 0}
                      hex="#fff"
                    />
                  )}
                </View>

                <Pressable
                  android_ripple={{ color: "#1F5062" }}
                  style={{
                    borderRadius: 4,
                  }}
                  onPress={() =>
                    Alert.alert("Alert", "Delete Saved?", [
                      {
                        text: "Delete",
                        onPress: () => {
                          handleDeleteSaved(index);
                        },
                      },
                      {
                        text: "Cancel",
                        onPress: () => {},
                      },
                    ])
                  }
                >
                  <XIcon />
                </Pressable>
              </View>
              {obj?.date && (
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {new Intl.DateTimeFormat("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(obj?.date))}
                  {/* {obj?.date} */}
                </Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default TestScreen;
