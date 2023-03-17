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

export interface Game {
  id: string;
  name: string;
  maxNumber: number;
  previousResults: Result[];
  maxCount: number;
  repeat: boolean;
  startZero: boolean;
  specialNumberMax: number;
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
};
