<script lang="ts">
  import type { Time } from "$lib/types";
  import { padDigit } from "$lib/utils";

  let { hours, minutes, seconds, centiseconds }: Time = $props();
</script>

<!-- prettier-ignore -->
<svg role="heading" aria-level={1} display="block" viewBox="-9.63 -11.795 87.262 17.841">
  <title>Time</title>
  <g style="fill: currentColor; font-family: Inter, sans-serif; font-feature-settings: 'tnum';" font-size="16">
    <text text-anchor="middle"><tspan >{padDigit(hours)}</tspan><tspan x="0" y="6" font-size="3.5">hr</tspan></text>
    <text x="10">:</text>
    <text x="24.508667" text-anchor="middle"><tspan>{padDigit(minutes)}</tspan><tspan x="24.508667" y="6" font-size="3.5">min</tspan></text>
    <text x="34.558453">:</text>
    <text x="49.017334" text-anchor="middle"><tspan>{padDigit(seconds)}</tspan><tspan x="49.017334" y="6" font-size="3.5">sec</tspan></text>
    <text x="59.06712">.</text>
    <text x="70.699295" font-size="11" text-anchor="middle">{padDigit(centiseconds)}</text>
  </g>
</svg>
