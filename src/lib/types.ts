export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
  centiseconds: number;
};

export type Addendum = "Fastest" | "Slowest";

export type Lap = {
  number: number;
  addendum?: Addendum;
  msCurrent: number;
  msTotal: number;
};

export type Theme = "light" | "dark";

export type Display = "large" | "";
