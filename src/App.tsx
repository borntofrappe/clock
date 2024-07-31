import { Time, Lap } from "./types";
import { Accessor, createSignal, onCleanup } from "solid-js";

import Icons from "./Icons";
import Preferences from "./Preferences";
import Display from "./Display";
import Laps from "./Laps";
import { getTimeComponents } from "./lib/utils";

type State = "wait" | "run" | "pause";

function App() {
  const [ms, setMs] = createSignal(0);
  const time: Accessor<Time> = () => getTimeComponents(ms());
  const [laps, setLaps] = createSignal<Lap[]>([]);
  setLaps([
    {
      number: 2,
      addendum: "Slowest",
      msCurrent: 989,
      mstotal: 1525,
    },
    {
      number: 1,
      addendum: "Fastest",
      msCurrent: 536,
      mstotal: 536,
    },
  ]);

  let lapsed = 0;
  let startMs = 0;
  let [state, setState] = createSignal<State>("wait");
  let interval: number;

  onCleanup(() => {
    clearInterval(interval);
  });

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
      <div id="controls">
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
        <button id="set-lap">
          <span class="visually-hidden">Set lap</span>
          {/* prettier-ignore */}
          <svg width="1em" height="1em" viewBox="0 0 1 1">
            <use href="#icon-flag" width="1" height="1" />
          </svg>
        </button>
        <button id="reset" onClick={reset}>
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
