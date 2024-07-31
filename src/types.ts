export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
  hundredths: number;
};

export type Lap = {
  number: number;
  addendum?: "Fastest" | "Slowest";
  msCurrent: number;
  mstotal: number;
};
