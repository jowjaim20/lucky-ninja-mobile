import React, { useEffect, useState } from "react";
import base64 from "react-native-base64";

import axios from "axios";

const useFethData = (open) => {
  const [games, setGames] = useState<any[]>([]);
  console.log("render");

  useEffect(() => {
    const fetchData = async () => {
      const username = "thiistheway";
      const password = "winteriscoming";

      try {
        const data = await axios.get(
          "https://dull-gray-chick-tam.cyclic.app/states",
          {
            headers: {
              "Cache-Control": "no-cache",
              Authorization:
                "Basic " + base64.encode(username + ":" + password),
            },
          }
        );

        setGames(data.data);
        console.log("data.data", data.data);
      } catch (error) {
        console.log("error", error);
        setGames([]);
      }
    };
    fetchData();
  }, [open]);

  return {
    games,
  };
};

export default useFethData;
