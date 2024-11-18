import type { Time } from "$lib/types";

export const getTimeComponents = (ms: number): Time => {
  let hours = ms;
  const centiseconds = Math.floor((hours % 1000) / 10);
  hours = Math.floor(hours / 1000);

  const seconds = hours % 60;
  hours = Math.floor(hours / 60);

  const minutes = hours % 60;
  hours = Math.floor(hours / 60);

  return {
    hours,
    minutes,
    seconds,
    centiseconds,
  };
};

export const padDigit = (n: number): string => n.toString().padStart(2, "0");

export const formatLapMs = (ms: number): string => {
  const { hours, minutes, seconds, centiseconds } = getTimeComponents(ms);
  // prettier-ignore
  return `${padDigit(hours)}:${padDigit(minutes)}:${padDigit(seconds)}.${padDigit(centiseconds)}`;
};
