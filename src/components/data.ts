import { Frequency, Game } from "./enums";

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

export const megamillions = {
  id: "mega",
  key: "mega",
  maxCount: 5,
  maxNumber: 70,
  link: "https://www.usamega.com/mega-millions/results",
  name: "Mega Millions",
  previousResults: [
    { id: "230401", numbers: [3, 21, 29, 46, 63], specialNumber: 9 },
    { id: "230402", numbers: [7, 9, 15, 19, 25], specialNumber: 4 },
    { id: "230403", numbers: [23, 27, 41, 48, 51], specialNumber: 22 },
    { id: "8909809", numbers: [31, 35, 53, 54, 55], specialNumber: 24 },
    { id: "32232", numbers: [12, 32, 49, 51, 66], specialNumber: 21 },
    { id: "1", numbers: [1, 37, 45, 62, 64], specialNumber: 4 },
    { id: "2", numbers: [16, 26, 27, 42, 61], specialNumber: 23 },
    { id: "3", numbers: [2, 3, 18, 32, 68], specialNumber: 24 },
    { id: "4", numbers: [14, 17, 33, 42, 66], specialNumber: 15 },
    { id: "5", numbers: [1, 21, 25, 27, 40], specialNumber: 11 },
    { id: "6", numbers: [26, 28, 29, 39, 49], specialNumber: 25 },
    { id: "7", numbers: [1, 7, 23, 38, 55], specialNumber: 2 },
    { id: "8", numbers: [9, 20, 59, 60, 63], specialNumber: 5 },
    { id: "9", numbers: [15, 22, 25, 28, 69], specialNumber: 21 },
    { id: "10", numbers: [8, 25, 36, 39, 67], specialNumber: 11 },
    { id: "11", numbers: [14, 16, 40, 52, 59], specialNumber: 13 },
    { id: "12", numbers: [2, 22, 49, 65, 67], specialNumber: 7 },
    { id: "13", numbers: [2, 15, 30, 36, 63], specialNumber: 24 },
    { id: "14", numbers: [2, 33, 38, 57, 70], specialNumber: 13 },
    { id: "15", numbers: [23, 24, 35, 40, 43], specialNumber: 1 },
    { id: "16", numbers: [20, 29, 30, 52, 58], specialNumber: 19 },
    { id: "17", numbers: [9, 15, 46, 55, 57], specialNumber: 4 },
    { id: "18", numbers: [1, 4, 50, 54, 59], specialNumber: 17 },
    { id: "19", numbers: [7, 9, 18, 29, 39], specialNumber: 13 },
    { id: "20", numbers: [4, 43, 46, 47, 61], specialNumber: 22 },
    { id: "21", numbers: [33, 41, 47, 50, 62], specialNumber: 20 },
    { id: "22", numbers: [20, 29, 31, 64, 66], specialNumber: 17 },
    { id: "23", numbers: [2, 12, 18, 24, 39], specialNumber: 18 },
    { id: "24", numbers: [30, 43, 45, 46, 61], specialNumber: 14 },
    { id: "25", numbers: [7, 13, 14, 15, 18], specialNumber: 9 },
    { id: "26", numbers: [3, 20, 46, 59, 63], specialNumber: 13 },
    { id: "27", numbers: [8, 11, 13, 20, 37], specialNumber: 12 },
    { id: "28", numbers: [12, 17, 27, 30, 39], specialNumber: 7 },
    { id: "29", numbers: [4, 11, 33, 35, 43], specialNumber: 21 },
    { id: "30", numbers: [4, 25, 30, 33, 47], specialNumber: 6 },
    { id: "31", numbers: [5, 8, 23, 45, 48], specialNumber: 17 },
    { id: "32", numbers: [10, 30, 33, 35, 36], specialNumber: 1 },
    { id: "33", numbers: [6, 18, 20, 25, 33], specialNumber: 16 },
    { id: "34", numbers: [7, 15, 36, 43, 44], specialNumber: 8 },
    { id: "35", numbers: [15, 20, 32, 42, 47], specialNumber: 3 },
    { id: "36", numbers: [1, 14, 27, 46, 50], specialNumber: 22 },
    { id: "37", numbers: [6, 8, 14, 32, 35], specialNumber: 19 },
    { id: "38", numbers: [2, 4, 5, 33, 47], specialNumber: 22 },
    { id: "39", numbers: [11, 23, 25, 35, 46], specialNumber: 17 },
    { id: "40", numbers: [2, 10, 28, 39, 49], specialNumber: 17 },
    { id: "41", numbers: [23, 28, 30, 35, 43], specialNumber: 9 },
    { id: "42", numbers: [9, 18, 24, 26, 46], specialNumber: 18 },
    { id: "43", numbers: [2, 23, 37, 40, 50], specialNumber: 22 },
    { id: "44", numbers: [8, 16, 18, 36, 38], specialNumber: 1 },
    { id: "45", numbers: [8, 25, 35, 37, 48], specialNumber: 8 },
    { id: "46", numbers: [5, 24, 31, 34, 48], specialNumber: 6 },
    { id: "47", numbers: [3, 4, 9, 30, 47], specialNumber: 1 },
    { id: "48", numbers: [5, 11, 29, 47, 50], specialNumber: 17 },
  ],
  repeat: false,
  startZero: false,
  specialNumberMax: 25,
  saved: [],
};

export const gamesArray = [megamillions];
