import Icons from "./Icons";
import "./App.css";
import { createSignal, onMount } from "solid-js";

function App() {
  const [largeDisplay, setLargeDisplay] = createSignal(false);

  onMount(() => {
    const mode = document.documentElement.getAttribute("data-mode");
    if (mode === "display") {
      setLargeDisplay(true);
    }
  });

  const updateDisplay = () => {
    setLargeDisplay(!largeDisplay());

    const mode = largeDisplay() ? "display" : "default";
    document.documentElement.setAttribute("data-mode", mode);
    localStorage.setItem("data-mode", mode);
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

  return (
    <div id="layout">
      <Icons />
      <div id="preferences">
        <button
          id="toggle-display"
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
          id="toggle-theme"
          aria-label="Toggle dark theme"
          aria-pressed="false"
        >
          <svg width="1em" height="1em" viewBox="0 0 1 1">
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
          <g style="fill: currentColor; font-family: Inter, sans-serif;">
            <text text-anchor="middle"><tspan font-size="16">00</tspan><tspan x="0" y="6" font-size="3.5">hr</tspan></text>
            <text x="10" font-size="16">:</text>
            <text x="24.508667" text-anchor="middle"><tspan font-size="16">00</tspan><tspan x="24.508667" y="6" font-size="3.5">min</tspan></text>
            <text x="34.558453" font-size="16">:</text>
            <text x="49.017334" text-anchor="middle"><tspan font-size="16">00</tspan><tspan x="49.017334" y="6" font-size="3.5">sec</tspan></text>
            <text x="59.06712" font-size="16">.</text>
            <text x="70.699295" font-size="11" text-anchor="middle">00</text>
          </g>
        </svg>
      </main>
      <div id="controls">
        <button
          id="toggle-start"
          aria-label="Toggle stopwatch"
          aria-pressed="false"
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
        <button id="reset" aria-label="Reset stopwatch">
          <svg width="1em" height="1em" viewBox="0 0 1 1">
            <use href="#icon-reset" width="1" height="1" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default App;
