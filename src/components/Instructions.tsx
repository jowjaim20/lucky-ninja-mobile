import React, { useState, useEffect, FunctionComponent } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Modal,
  Button,
  Alert,
  Image,
  StyleSheet,
} from "react-native";

import { XIcon } from "../utils/svg";
import NinjaSwitch, { SwitchProps } from "./Switch";
import InputBox from "./InputBox";
import useScaling from "../hooks/useScaling";

interface InstructionProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface WrapperProps {
  children: JSX.Element[] | JSX.Element;
}

const ImageWrapper: FunctionComponent<WrapperProps> = ({ children }) => {
  return (
    <ScrollView horizontal>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
        }}
      >
        {children}
      </View>
    </ScrollView>
  );
};
const Instructions: FunctionComponent<InstructionProps> = (props) => {
  const { modalVisible, setModalVisible } = props;
  const { scale } = useScaling();

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            width: 370,
            borderRadius: 16,
            height: 520,
            backgroundColor: "#031E29",
            transform: [{ scale }],
          }}
        >
          <View
            style={{
              alignSelf: "flex-end",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              backgroundColor: "#031E29",
              marginRight: 5,
            }}
          >
            <Pressable onPress={() => setModalVisible(false)}>
              <XIcon />
            </Pressable>
          </View>

          <ScrollView>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 5,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  paddingVertical: 20,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  How to get the best numbers/combination?
                </Text>

                <Text style={styles.text}>
                  1. Go to Ninja Analyzer and figure out the color combination
                  of the previous results.
                </Text>
                <ImageWrapper>
                  <Image
                    style={{
                      height: 2160 / 7,
                      width: 1080 / 7,
                    }}
                    source={require("../images/1.1.1.png")}
                  />
                  <Image
                    style={{
                      height: 2160 / 7,
                      width: 1080 / 7,
                    }}
                    source={require("../images/1.1.2.png")}
                  />
                </ImageWrapper>
                <Text style={styles.text}>
                  * first past result combination has
                  <Text style={{ color: "#c2aada" }}> 2 light purple</Text>,
                  <Text style={{ color: "#ffd7a5" }}> 2 light yellows </Text>
                  and
                  <Text style={{ color: "#8a2be2" }}> 1 dark purple </Text>
                </Text>

                <Text style={styles.text}>
                  * second past result combination has
                  <Text style={{ color: "#c2aada" }}> 2 light purple</Text>,
                  <Text style={{ color: "#3a86ff" }}> 2 blue </Text>
                  and
                  <Text style={{ color: "#8a2be2" }}> 1 dark purple </Text>
                </Text>
                <Text style={styles.text}>
                  * analyze all past results colors
                </Text>

                <Text style={styles.text}>
                  2. Find out the most common color in every combination. You
                  can also see the count of all colors present in the past 10
                  results.
                </Text>

                <ImageWrapper>
                  <Image
                    style={{
                      height: 2160 / 7,
                      width: 1080 / 7,
                    }}
                    source={require("../images/1.2.png")}
                  />
                </ImageWrapper>
                <Text style={styles.text}>
                  3. Include the choosen colors in your generator settings.
                </Text>
                <ImageWrapper>
                  <Image
                    style={{
                      height: 2160 / 7,
                      width: 1080 / 7,
                    }}
                    source={require("../images/1.3.png")}
                  />
                </ImageWrapper>
                <Text style={styles.text}>
                  4. Generate a combination in Ninja generator. The generator
                  will pick a random number with the color that you have
                  choosen.
                </Text>
                <ImageWrapper>
                  <Image
                    style={{
                      height: 2160 / 7,
                      width: 1080 / 7,
                    }}
                    source={require("../images/1.4.png")}
                  />
                </ImageWrapper>
                <Text style={styles.text}>
                  5. You can also manually pick the color/number of your choice
                  in the future draw colors modal.
                </Text>
                <ImageWrapper>
                  <Image
                    style={{
                      height: 2160 / 7,
                      width: 1080 / 7,
                    }}
                    source={require("../images/1.5.1.png")}
                  />
                  <Image
                    style={{
                      height: 2160 / 7,
                      width: 1080 / 7,
                    }}
                    source={require("../images/1.5.2.png")}
                  />
                </ImageWrapper>
                <Text style={styles.text}>
                  6. Save the combination the you have generated or manually
                  picked. Get the tickets and wait for tonights draw!
                </Text>
                <ImageWrapper>
                  <Image
                    style={{
                      height: 2160 / 7,
                      width: 1080 / 7,
                    }}
                    source={require("../images/1.6.png")}
                  />
                </ImageWrapper>
              </View>
              <View
                style={{
                  borderTopWidth: 2,
                  borderColor: "#fff",
                  marginVertical: 30,
                }}
              ></View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  paddingVertical: 20,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  What is color frequency and how it works?
                </Text>
                <Text style={styles.text}>
                  1. Each color represents the frequency of the number.
                </Text>
                <ImageWrapper>
                  <Image
                    style={{
                      height: 2160 / 7,
                      width: 1080 / 7,
                    }}
                    source={require("../images/2.1.1.png")}
                  />
                  <Image
                    style={{
                      height: 2160 / 7,
                      width: 1080 / 7,
                    }}
                    source={require("../images/2.1.2.png")}
                  />
                </ImageWrapper>
                <Text style={styles.text}>
                  2. Each draw the numbers color changes according to the
                  frequency.
                </Text>
                <ImageWrapper>
                  <Image
                    style={{
                      height: 2160 / 7,
                      width: 1080 / 7,
                    }}
                    source={require("../images/2.2.1.png")}
                  />
                  <Image
                    style={{
                      height: 2160 / 7,
                      width: 1080 / 7,
                    }}
                    source={require("../images/2.2.2.png")}
                  />
                </ImageWrapper>
                <Text style={styles.text}>
                  3.The top number is the count of the numbers in multiple rows.
                </Text>
                <ImageWrapper>
                  <Image
                    style={{
                      height: 2160 / 7,
                      width: 1080 / 7,
                    }}
                    source={require("../images/2.3.1.png")}
                  />
                  <Image
                    style={{
                      height: 2160 / 7,
                      width: 1080 / 7,
                    }}
                    source={require("../images/2.3.2.png")}
                  />
                </ImageWrapper>
                <Text style={styles.text}>
                  4.The bottom number is the count of the rows.
                </Text>
                <ImageWrapper>
                  <Image
                    style={{
                      height: 2160 / 7,
                      width: 1080 / 7,
                    }}
                    source={require("../images/2.4.1.png")}
                  />
                  <Image
                    style={{
                      height: 2160 / 7,
                      width: 1080 / 7,
                    }}
                    source={require("../images/2.4.2.png")}
                  />
                </ImageWrapper>
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  Cons:
                </Text>
                <Text style={styles.text}>
                  - Each draw the result changes its color combination but we
                  can figure out the color of each number in the next draw.
                </Text>
                <Text style={styles.text}>
                  - It's easy to pick the colors as we can compare it to the
                  previous results.
                </Text>
                <Text style={styles.text}>
                  - The numbers are segrated by color which makes it easier to
                  pick.
                </Text>
                <Text style={styles.text}>
                  - We can tell good and bad combination based on previous
                  results colors.
                </Text>
                <Text style={styles.text}>
                  - We can use the color trends to decide what numbers should we
                  include in the next draw.
                </Text>

                <Text style={[styles.text, { color: "#e27602" }]}>
                  *Disclaimer: Lottery is a game of chance and no one knows the
                  upcoming result. The app may contain inaccurate information
                  and we are not eligible for any damages it may cause. This app
                  is not connected to any lottery games and does not promote any
                  gambling games. The creator and team is not eligible for
                  anything that this app may affect. Use it responsibly.
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
});
export default Instructions;
