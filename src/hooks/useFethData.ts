import React, { useEffect, useState } from "react";
import axios from "axios";

const useFethData = (open) => {
  const [games, setGames] = useState<any[]>([]);
  console.log("render");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(
          "https://jowjaim20.github.io/luckyninjagames/games.json",
          {
            headers: {
              "Cache-Control": "no-cache",
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
