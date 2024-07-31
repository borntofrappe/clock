export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
  hundredths: number;
};

export type Addendum = "Fastest" | "Slowest";

export type Lap = {
  number: number;
  addendum?: Addendum;
  msCurrent: number;
  msTotal: number;
};
