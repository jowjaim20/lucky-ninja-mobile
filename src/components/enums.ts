export interface Result {
  numbers: number[];
  specialNumber: number;
  id: string;
}

export interface Frequency {
  frequency: number;
  range: number;
  hex: string;
  id: string;
}

export interface NumWithColor {
  number: number;
  hex: string;
}
export interface Saved {
  numbers: NumWithColor[];
  specialNumber: number;
}

export interface Game {
  id: string;
  name: string;
  maxNumber: number;
  previousResults: Result[];
  maxCount: number;
  repeat: boolean;
  startZero: boolean;
  specialNumberMax: number;
  saved: Saved[];
}

export type LuckyGames = Game[];

const game: Game = {
  id: "ets",
  name: "Super lotto",
  maxNumber: 23,
  previousResults: [{ numbers: [1, 2, 3], id: "test", specialNumber: 0 }],
  maxCount: 6,
  repeat: false,
  startZero: false,
  specialNumberMax: 26,
  saved: [],
};

export interface Result {
  numbers: number[];
  specialNumber: number;
  id: string;
}

const megamillions = [
  { id: "1", numbers: [2, 3, 18, 32, 68], specialNumber: 24 },
  { id: "2", numbers: [14, 17, 33, 42, 66], specialNumber: 15 },
];
