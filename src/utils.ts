import { Time } from "./types";

export const getTimeComponents = (ms: number): Time => {
  let hours = ms;
  const hundredths = Math.floor((hours % 1000) / 10);
  hours = Math.floor(hours / 1000);

  const seconds = hours % 60;
  hours = Math.floor(hours / 60);

  const minutes = hours % 60;
  hours = Math.floor(hours / 60);

  return {
    hours: 0,
    minutes,
    seconds,
    hundredths,
  };
};

export const padDigit = (n: number): string => n.toString().padStart(2, "0");
