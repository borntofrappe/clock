import { createSignal, onCleanup } from "solid-js";
import { Accessor } from "solid-js";

import { Time, Lap, Addendum } from "./lib/types";
import { getTimeComponents } from "./lib/utils";
import styles from "./styles/App.module.css";

import Icons from "./Icons";
import Preferences from "./Preferences";
import Display from "./Display";
import Laps from "./Laps";

type State = "wait" | "run" | "pause";

function App() {
  const [ms, setMs] = createSignal(0);
  const time: Accessor<Time> = () => getTimeComponents(ms());
  const [laps, setLaps] = createSignal<Lap[]>([]);

  let lapsed = 0;
  let startMs = 0;
  let [state, setState] = createSignal<State>("wait");
  let interval: number;

  onCleanup(() => {
    window.clearInterval(interval);
  });

  const start = () => {
    startMs = new Date().getTime();
    interval = window.setInterval(() => {
      setMs(new Date().getTime() - startMs + lapsed);
    });
  };

  const pause = () => {
    lapsed = ms();
    window.clearInterval(interval);
  };

  const stop = () => {
    lapsed = 0;
    setMs(0);
    window.clearInterval(interval);
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
    setLaps([]);
  };

  const setLap = () => {
    const msTotal = ms();
    if (state() !== "run") return;

    let lap: Lap;
    const previousLaps = laps();
    const { length } = previousLaps;

    if (length === 0) {
      lap = {
        number: length + 1,
        msCurrent: msTotal,
        msTotal,
      };
    } else {
      const msCurrent: number = msTotal - previousLaps[0].msTotal;

      lap = {
        number: length + 1,
        msCurrent,
        msTotal,
      };

      if (length === 1) {
        const addendums: Addendum[] = ["Fastest", "Slowest"];
        if (msCurrent > previousLaps[0].msCurrent) {
          addendums.reverse();
        }

        lap.addendum = addendums[0];
        previousLaps[0].addendum = addendums[1];
      } else {
        const slowestIndex = previousLaps.findIndex(
          (d) => d.addendum === "Slowest"
        );
        const fastestIndex = previousLaps.findIndex(
          (d) => d.addendum === "Fastest"
        );

        if (msCurrent < previousLaps[fastestIndex].msCurrent) {
          lap.addendum = "Fastest";
          delete previousLaps[fastestIndex].addendum;
        } else if (msCurrent > previousLaps[slowestIndex].msCurrent) {
          lap.addendum = "Slowest";
          delete previousLaps[slowestIndex].addendum;
        }
      }
    }

    setLaps([lap, ...previousLaps]);
  };

  return (
    <div id="layout" class={styles.layout}>
      <Icons />
      <div id="preferences" class={styles.preferences}>
        <Preferences />
      </div>
      <main
        style={{
          color:
            state() === "run"
              ? "currentcolor"
              : "var(--color-dim, currentColor)",
        }}
        id="display"
      >
        <Display {...time()} />
      </main>
      <div id="controls" class={styles.controls}>
        <button
          data-role="primary"
          id="toggle-start"
          onClick={toggleStart}
          aria-pressed={state() === "run"}
        >
          <span class="visually-hidden">Toggle stopwatch</span>
          {/* prettier-ignore */}
          <svg data-pressed="false" width="1em" height="1em" viewBox="0 0 1 1">
            <use href="#icon-start" width="1" height="1" />
          </svg>
          {/* prettier-ignore */}
          <svg data-pressed="true" display="none" width="1em" height="1em" viewBox="0 0 1 1">
            <use href="#icon-pause" width="1" height="1" />
          </svg>
        </button>
        <button id="set-lap" disabled={state() !== "run"} onClick={setLap}>
          <span class="visually-hidden">Set lap</span>
          {/* prettier-ignore */}
          <svg width="1em" height="1em" viewBox="0 0 1 1">
            <use href="#icon-flag" width="1" height="1" />
          </svg>
        </button>
        <button id="reset" disabled={state() === "wait"} onClick={reset}>
          <span class="visually-hidden">Reset stopwatch</span>
          {/* prettier-ignore */}
          <svg width="1em" height="1em" viewBox="0 0 1 1">
            <use href="#icon-reset" width="1" height="1" />
          </svg>
        </button>
      </div>
      <div id="laps">
        <Laps laps={laps()} />
      </div>
    </div>
  );
}

export default App;
