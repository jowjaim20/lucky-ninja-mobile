import React, { useState, useEffect, FunctionComponent } from "react";
import { View, Text, Pressable, ScrollView, Modal } from "react-native";
import useHandleXDraws from "../hooks/useHandleXdraws";
import { useAppDispatch, useAppSelector } from "../redux/store";
import useModifyArray from "../hooks/useModifyArray";
import Ball from "./Ball";
import {
  resetColorOption,
  setColorOpt,
} from "../redux/slices/colorOptionsSlice";
import { CircleRightIcon, XIcon } from "../utils/svg";
import useScaling from "../hooks/useScaling";
import {
  resetColorOptionEuro,
  setColorOptEuro,
} from "../redux/slices/colorOptionsEuroSlice";

Array.prototype.unique = function () {
  var a = this.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }

  return a;
};

interface Master {
  hex: string;
  count: number;
}
interface ColorMasterProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const ColorMaster: FunctionComponent<ColorMasterProps> = (props) => {
  const { modalVisible, setModalVisible } = props;
  const { scale } = useScaling();
  const { getXDraws, getXDrawsEuro } = useHandleXDraws();
  const dispath = useAppDispatch();
  const [colors, setColors] = useState<Master[]>([]);
  const [colorsEuro, setColorsEuro] = useState<Master[]>([]);

  const {
    maxNumber,
    specialNumberMax,
    maxCount,
    repeat,
    startZero,
    maxCountEuro,
    maxNumberEuro,
  } = useAppSelector((state) => state.currentGame.currentGame);
  const games = useAppSelector((state) => state.currentGame.games);
  const colorOptions = useAppSelector((state) => state.colorOptions);
  const colorOptionsEuro = useAppSelector((state) => state.colorOptionsEuro);

  const { previousResults } = useAppSelector(
    (state) => state.currentGame.currentGame
  );
  const allNum = Array.from(
    { length: startZero ? maxNumber + 1 : maxNumber },
    (_, i) => (startZero ? i : i + 1)
  );
  const mxNumEuro = maxNumberEuro ? maxNumberEuro : 0;
  const allNumEuro = Array.from(
    { length: startZero ? mxNumEuro + 1 : mxNumEuro },
    (_, i) => (startZero ? i : i + 1)
  );

  const { newArray } = useModifyArray({
    array: previousResults,
    replaceIndex: -1,
    item: { id: "123", numbers: allNum, specialNumber: 0 },
  });

  const { newArray: newArrayEuro } = useModifyArray({
    array: previousResults,
    replaceIndex: -1,
    item: { id: "123", numbers: allNumEuro, specialNumber: 0 },
  });

  const currentFrequency = useAppSelector((state) => state.frequency);

  const getHex = (number: number) => {
    console.log("getHex");
    const filteredFrequency = currentFrequency.frequency.find((freq) =>
      getXDraws({
        number,
        prevResults: newArray,
        currentIndex: -1,
        frequency: freq.frequency,
        range: freq.range,
      })
    );
    return filteredFrequency?.hex || "#999999"; //change default once done
  };

  const getHexEuro = (number: number) => {
    console.log("getHex");
    const filteredFrequency = currentFrequency.frequency.find((freq) =>
      getXDrawsEuro({
        number,
        prevResults: newArrayEuro,
        currentIndex: -1,
        frequency: freq.frequency,
        range: freq.range,
      })
    );
    return filteredFrequency?.hex || "#999999"; //change default once done
  };

  const testFunc = () => {
    const allNumColos = allNum.map((num) => getHex(num));

    const colorss = allNumColos.unique();

    const test = colorss.map((color: any) => {
      const count = allNumColos.filter((col) => col === color);
      return {
        hex: color,
        count: count?.length,
      };
    });

    setColors(test);
  };

  const testFuncEuro = () => {
    const allNumColos = allNumEuro.map((num) => getHexEuro(num));

    const colorss = allNumColos.unique();

    const test = colorss.map((color: any) => {
      const count = allNumColos.filter((col) => col === color);
      return {
        hex: color,
        count: count?.length,
      };
    });

    setColorsEuro(test);
  };
  useEffect(() => {
    testFunc();
    testFuncEuro();
  }, [previousResults, games]);

  const onPress = (_: any, hex: string) => {
    if (maxCount !== colorOptions.length) {
      const newColors = colors.map((data) => {
        if (data.hex === hex && data.count) {
          dispath(setColorOpt(hex));
          return {
            hex: hex,
            count: data.count - 1,
          };
        }
        return data;
      });

      setColors(newColors);
    }
  };

  const onPressEuro = (_: any, hex: string) => {
    if (maxCountEuro !== colorOptionsEuro.length) {
      const newColors = colorsEuro.map((data) => {
        if (data.hex === hex && data.count) {
          dispath(setColorOptEuro(hex));
          return {
            hex: hex,
            count: data.count - 1,
          };
        }
        return data;
      });

      setColorsEuro(newColors);
    }
  };

  const handleReset = () => {
    testFunc();
    testFuncEuro();
    dispath(resetColorOption());
    dispath(resetColorOptionEuro());
  };

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
            width: 250,
            borderRadius: 16,
            height: 250,
            backgroundColor: "#D5D9DA",
            transform: [{ scale }],
          }}
        >
          <View
            style={{
              alignSelf: "flex-end",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Pressable onPress={() => setModalVisible(false)}>
              <XIcon />
            </Pressable>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: -30,
            }}
          >
            <Text
              style={{
                color: "#031E29",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Ninja Generator Settings
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              height: 20,
            }}
          >
            {colorOptions.map((hex, idx) => (
              <View
                key={`${hex}${idx}`}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 50,
                  backgroundColor: hex,
                }}
              ></View>
            ))}
            {colorOptionsEuro.map((hex, idx) => (
              <View
                key={`${hex}${idx}`}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 50,
                  backgroundColor: hex,
                }}
              ></View>
            ))}
          </View>

          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              width: 120,
            }}
          >
            {colors.map(({ count, hex }) => (
              <Ball
                key={hex}
                title={count}
                size={30}
                hex={hex}
                onClick={onPress}
              />
            ))}
          </View>

          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              width: 120,
            }}
          >
            {colorsEuro.map(({ count, hex }) => (
              <Ball
                key={hex}
                title={count}
                size={30}
                hex={hex}
                onClick={onPressEuro}
              />
            ))}
          </View>
          <Pressable onPress={handleReset} android_ripple={{ color: "#ff0" }}>
            <View
              style={{
                backgroundColor: "#fff",
                paddingVertical: 4,
                paddingHorizontal: 8,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: "#031E29",
                  fontWeight: "600",
                }}
              >
                Reset
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ColorMaster;
