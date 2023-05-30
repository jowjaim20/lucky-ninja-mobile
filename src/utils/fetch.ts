import { Alert } from "react-native";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import base64 from "react-native-base64";
import { updateArray } from "../redux/slices/currentGame";

export const fetchData = async (key: string, dispatch: Dispatch<AnyAction>) => {
  const username = "thiistheway";
  const password = "winteriscoming";

  try {
    const data = await axios.get(
      `https://dull-gray-chick-tam.cyclic.app/games/${key}`,
      {
        headers: {
          "Cache-Control": "no-cache",
          Authorization: "Basic " + base64.encode(username + ":" + password),
        },
      }
    );
    const gameFetch = data.data;

    gameFetch && dispatch(updateArray(gameFetch.previousResults));
  } catch (error) {
    console.log("error", error);
    Alert.alert("Something went wrong!. Please contact support");

    console.log("error", error);
  }
};
