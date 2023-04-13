import { Frequency } from "./enums";

export interface MockFrequency {
  name: string;
  frequency: Frequency[];
  id: string;
}

export const mockFrequency: MockFrequency[] = [
  {
    name: "intermediate",
    id: "2",
    frequency: [
      //make sure that waterfall frequency is in correct order

      {
        frequency: 5,
        range: 5,
        hex: "#ffa24a",
        id: "1",
      },
      {
        frequency: 4,
        range: 4,
        hex: "#f79b83",
        id: "2",
      },
      {
        frequency: 3,
        range: 3,
        hex: "#e54594",
        id: "3",
      },
      {
        frequency: 2,
        range: 2,
        hex: "#00ff7f",
        id: "4",
      },
      {
        frequency: 2,
        range: 3,
        hex: "#ff6b6b",
        id: "5",
      },

      {
        frequency: 3,
        hex: "#66b2b2",
        range: 5,
        id: "6",
      },
      {
        frequency: 2,
        range: 5,
        hex: "#3a86ff",
        id: "7",
      },
      {
        frequency: 3,
        range: 10,
        hex: "#1e824c",
        id: "8",
      },
      {
        frequency: 2,
        range: 10,
        hex: "#8a2be2",
        id: "9",
      },
      {
        frequency: 3,
        range: 20,
        hex: "#ffc300",
        id: "320",
      },
      {
        frequency: 2,
        range: 20,
        hex: "#ffd7a5",
        id: "10",
      },
      {
        frequency: 1,
        range: 20,
        hex: "#c2aada", //yellow
        id: "11",
      },
      {
        frequency: 1,
        range: 10,
        hex: "#8b6969", //brightgreen
        id: "12",
      },
    ],
  },
  {
    name: "basic",
    id: "1",
    frequency: [
      //make sure that waterfall frequency is in correct order

      {
        frequency: 5,
        range: 5,
        hex: "#ffa24a", //brightgreen
        id: "1",
      },
      {
        frequency: 4,
        range: 4,
        hex: "#ff6174", //brightgreen
        id: "2",
      },
      {
        frequency: 3,
        range: 3,
        hex: "#e54594", //brightgreen
        id: "3",
      },
      {
        frequency: 2,
        range: 2,
        hex: "#ff6622", //brightgreen
        id: "4",
      },
      {
        frequency: 2,
        range: 5,
        hex: "#4971ae", //brightgreen
        id: "5",
      },
      {
        frequency: 3,
        range: 10,
        hex: "#549fde", //brightgreen
        id: "6",
      },
      {
        frequency: 2,
        range: 10,
        hex: "#ff833d", //brightgreen
        id: "7",
      },
      {
        frequency: 3,
        range: 20,
        hex: "#d8e9f2", //red
        id: "8",
      },
      {
        frequency: 2,
        range: 20,
        hex: "#113652", //blue
        id: "9",
      },
      {
        frequency: 1,
        range: 20,
        hex: "#11aaff", //yellow
        id: "10",
      },
    ],
  },
];
