import Icons from "./Icons";
import "./App.css";
import { createSignal, onCleanup, onMount } from "solid-js";

type Time = {
  hours: number;
  minutes: number;
  seconds: number;
  hundredths: number;
};

type State = "wait" | "run" | "pause";

const getTimeComponents = (ms: number): Time => {
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

const padDigit = (n: number): string => n.toString().padStart(2, "0");

function App() {
  const [largeDisplay, setLargeDisplay] = createSignal(false);
  const [darkTheme, setDarkTheme] = createSignal(false);
  const [ms, setMs] = createSignal(0);
  const time = () => getTimeComponents(ms());

  let lapsed = 0;
  let startMs = 0;
  let [state, setState] = createSignal<State>("wait");
  let interval: number;

  onMount(() => {
    const display = document.documentElement.getAttribute("data-display");
    const theme = document.documentElement.getAttribute("data-theme");
    if (display === "large") {
      setLargeDisplay(true);
    }
    if (theme === "dark") {
      setDarkTheme(true);
    }
  });

  onCleanup(() => {
    clearInterval(interval);
  });

  const updateDisplay = () => {
    setLargeDisplay(!largeDisplay());

    const display = largeDisplay() ? "large" : "normal";
    document.documentElement.setAttribute("data-display", display);
    localStorage.setItem("data-display", display);
  };

  const toggleLargeDisplay = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        updateDisplay();
      });
    } else {
      updateDisplay();
    }
  };

  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme());

    const theme = darkTheme() ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("data-theme", theme);
  };

  const start = () => {
    startMs = new Date().getTime();
    interval = setInterval(() => {
      setMs(new Date().getTime() - startMs + lapsed);
    });
  };

  const pause = () => {
    lapsed = ms();
    clearInterval(interval);
  };

  const stop = () => {
    lapsed = 0;
    setMs(0);
    clearInterval(interval);
  };

  const toggleStart = () => {
    if (state() === "wait" || state() === "pause") {
      start();
      setState("run");
    } else {
      pause();
      setState("pause");
    }
  };

  const reset = () => {
    if (state() === "wait") return;
    stop();
    setState("wait");
  };

  return (
    <div id="layout">
      <Icons />
      <div id="preferences">
        <button
          id="toggle-large-display"
          onClick={toggleLargeDisplay}
          aria-label="Toggle large display"
          aria-pressed={largeDisplay()}
        >
          <svg data-pressed="false" width="1em" height="1em" viewBox="0 0 1 1">
            <use href="#icon-expand" width="1" height="1" />
          </svg>
          <svg
            data-pressed="true"
            display="none"
            width="1em"
            height="1em"
            viewBox="0 0 1 1"
          >
            <use href="#icon-reduce" width="1" height="1" />
          </svg>
        </button>
        <button
          id="toggle-dark-theme"
          onClick={toggleDarkTheme}
          aria-label="Toggle dark theme"
          aria-pressed={darkTheme()}
        >
          <svg data-pressed="false" width="1em" height="1em" viewBox="0 0 1 1">
            <use href="#icon-sun" width="1" height="1" />
          </svg>
          <svg
            data-pressed="true"
            display="none"
            width="1em"
            height="1em"
            viewBox="0 0 1 1"
          >
            <use href="#icon-moon" width="1" height="1" />
          </svg>
        </button>
      </div>
      <main>
        {/* prettier-ignore */}
        <svg id="display" role="heading" aria-level={1} display="block" viewBox="-9.63 -11.795 87.262 17.841">
          <title>Time</title>
          <g style="fill: currentColor; font-family: Inter, sans-serif; font-feature-settings: 'tnum';">
            <text text-anchor="middle"><tspan font-size="16">{padDigit(time().hours)}</tspan><tspan x="0" y="6" font-size="3.5">hr</tspan></text>
            <text x="10" font-size="16">:</text>
            <text x="24.508667" text-anchor="middle"><tspan font-size="16">{padDigit(time().minutes)}</tspan><tspan x="24.508667" y="6" font-size="3.5">min</tspan></text>
            <text x="34.558453" font-size="16">:</text>
            <text x="49.017334" text-anchor="middle"><tspan font-size="16">{padDigit(time().seconds)}</tspan><tspan x="49.017334" y="6" font-size="3.5">sec</tspan></text>
            <text x="59.06712" font-size="16">.</text>
            <text x="70.699295" font-size="11" text-anchor="middle">{padDigit(time().hundredths)}</text>
          </g>
        </svg>
      </main>
      <div id="controls">
        <button
          id="toggle-start"
          onClick={toggleStart}
          aria-label="Toggle stopwatch"
          aria-pressed={state() === "run"}
        >
          <svg data-pressed="false" width="1em" height="1em" viewBox="0 0 1 1">
            <use href="#icon-start" width="1" height="1" />
          </svg>
          <svg
            data-pressed="true"
            display="none"
            width="1em"
            height="1em"
            viewBox="0 0 1 1"
          >
            <use href="#icon-pause" width="1" height="1" />
          </svg>
        </button>
        <button id="set-lap" aria-label="Set lap">
          <svg width="1em" height="1em" viewBox="0 0 1 1">
            <use href="#icon-flag" width="1" height="1" />
          </svg>
        </button>
        <button id="reset" onClick={reset} aria-label="Reset stopwatch">
          <svg width="1em" height="1em" viewBox="0 0 1 1">
            <use href="#icon-reset" width="1" height="1" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default App;
