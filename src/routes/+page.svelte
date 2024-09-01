<script lang="ts">
  import "../app.css";

  import { onDestroy } from "svelte";
  import { getTimeComponents } from "$lib/utils";
  import type { Lap, Addendum } from "$lib/types";

  import Icons from "./Icons.svelte";
  import Preferences from "./Preferences.svelte";
  import Display from "./Display.svelte";
  import Laps from "./Laps.svelte";

  type Mode = "wait" | "run" | "pause";

  let ms = $state(0);
  let time = $derived(getTimeComponents(ms));
  let mode: Mode = $state("wait");
  let laps: Lap[] = $state([]);

  let lapsed = 0;
  let startMs = 0;
  let interval: number;

  onDestroy(() => {
    clearInterval(interval);
  });

  const start = () => {
    startMs = new Date().getTime();
    interval = setInterval(() => {
      ms = new Date().getTime() - startMs + lapsed;
    });
  };

  const pause = () => {
    lapsed = ms;
    clearInterval(interval);
  };

  const stop = () => {
    lapsed = 0;
    ms = 0;
    clearInterval(interval);
  };

  const toggleStart = () => {
    if (mode === "wait" || mode === "pause") {
      start();
      mode = "run";
    } else {
      pause();
      mode = "pause";
    }
  };

  const reset = () => {
    if (mode === "wait") return;

    stop();
    mode = "wait";
    laps = [];
  };

  const setLap = () => {
    if (mode !== "run") return;

    const msTotal = ms;
    let lap: Lap;
    const { length } = laps;

    if (length === 0) {
      lap = {
        number: length + 1,
        msCurrent: msTotal,
        msTotal,
      };
    } else {
      const msCurrent = msTotal - laps[0].msTotal;

      lap = {
        number: length + 1,
        msCurrent,
        msTotal,
      };

      if (length === 1) {
        const [currentAddendum, previousAddendum]: Addendum[] =
          msCurrent < laps[0].msCurrent
            ? ["Fastest", "Slowest"]
            : ["Slowest", "Fastest"];
        lap.addendum = currentAddendum;
        laps[0].addendum = previousAddendum;
      } else {
        const slowestIndex = laps.findIndex((d) => d.addendum === "Slowest");
        const fastestIndex = laps.findIndex((d) => d.addendum === "Fastest");

        if (msCurrent < laps[fastestIndex].msCurrent) {
          lap.addendum = "Fastest";
          delete laps[fastestIndex].addendum;
        } else if (msCurrent > laps[slowestIndex].msCurrent) {
          lap.addendum = "Slowest";
          delete laps[slowestIndex].addendum;
        }
      }
    }

    laps = [lap, ...laps];
  };
</script>

<div id="layout">
  <Icons />
  <div id="preferences">
    <Preferences />
  </div>

  <main
    id="display"
    style:color={mode === "run"
      ? "currentcolor"
      : "var(--color-dim, currentColor)"}
  >
    <Display {...time} />
  </main>

  <div id="controls">
    <button
      data-role="primary"
      id="toggle-start"
      onclick={toggleStart}
      aria-pressed={mode === "run"}
    >
      <span class="visually-hidden">Toggle stopwatch</span>
      <!-- prettier-ignore -->
      <svg data-pressed="false" width="1em" height="1em" viewBox="0 0 1 1">
          <use href="#icon-start" width="1" height="1" />
        </svg>
      <!-- prettier-ignore -->
      <svg data-pressed="true" display="none" width="1em" height="1em" viewBox="0 0 1 1">
          <use href="#icon-pause" width="1" height="1" />
        </svg>
    </button>
    <button id="set-lap" disabled={mode !== "run"} onclick={setLap}>
      <span class="visually-hidden">Set lap</span>
      <!-- prettier-ignore -->
      <svg width="1em" height="1em" viewBox="0 0 1 1">
        <use href="#icon-flag" width="1" height="1" />
      </svg>
    </button>
    <button id="reset" disabled={mode === "wait"} onclick={reset}>
      <span class="visually-hidden">Reset stopwatch</span>
      <!-- prettier-ignore -->
      <svg width="1em" height="1em" viewBox="0 0 1 1">
          <use href="#icon-reset" width="1" height="1" />
        </svg>
    </button>
  </div>
  <div id="laps">
    <Laps {laps} />
  </div>
</div>

<style>
  #layout > * + * {
    --_vertical-rhythm: var(--space-medium, 0.75rem);
    margin-block-start: var(--_vertical-rhythm);
  }

  #layout #controls {
    --_vertical-rhythm: var(--space-major);
  }

  #layout #laps {
    --_vertical-rhythm: var(--space-large);
  }

  #layout #preferences {
    inline-size: max-content;
    margin-inline-start: auto;
  }

  #controls {
    display: flex;
    justify-content: center;
    gap: var(--space-medium, 0.75rem);
  }

  #preferences {
    --button-size: 2.2rem;
    --button-padding: 0.6rem;
    --button-border-radius: 0.5rem;
    --button-background: none;
  }

  #controls {
    --button-size: 3rem;
    --button-padding: 1rem;
    --button-border-radius: 1e5px;
    --button-box-shadow: 0 0 0.1rem -0.05rem currentColor;
  }

  #laps {
    line-height: var(--leading, 1.5);
    max-block-size: 22rem;
    max-block-size: 14lh;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--scrollbar-color);
  }
</style>
