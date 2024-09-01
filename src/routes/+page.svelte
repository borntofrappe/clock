<script lang="ts">
  import Icons from "./Icons.svelte";
  import Preferences from "./Preferences.svelte";
  import Display from "./Display.svelte";
  import { getTimeComponents } from "$lib/utils";
  import { onDestroy } from "svelte";

  type Mode = "wait" | "run" | "pause";

  let ms = $state(0);
  let time = $derived(getTimeComponents(ms));
  let mode: Mode = $state("wait");

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
    <button id="reset" disabled={mode === "wait"} onclick={reset}>
      <span class="visually-hidden">Reset stopwatch</span>
      <!-- prettier-ignore -->
      <svg width="1em" height="1em" viewBox="0 0 1 1">
          <use href="#icon-reset" width="1" height="1" />
        </svg>
    </button>
  </div>
</div>
