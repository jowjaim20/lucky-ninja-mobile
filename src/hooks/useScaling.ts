import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";

const useScaling = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const windowWidth = Dimensions.get("window").width;
    const ScreenHeight = Dimensions.get("window").height;
    const newScale = windowWidth / 420;
    setScale(newScale);
  }, []);

  return { scale };
};

export default useScaling;
