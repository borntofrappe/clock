<script lang="ts">
  import { formatLapMs } from "$lib/utils";
  import type { Lap } from "$lib/types";

  let { laps }: { laps: Lap[] } = $props();
</script>

<table>
  <thead>
    <tr>
      <th>Laps</th>
      <th>Time</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    {#each laps as { number, addendum, msCurrent, msTotal }}
      <tr>
        <td>
          {number}
          {#if addendum}
            <span> &nbsp;{addendum}</span>
          {/if}
        </td>
        <td>
          <time>{formatLapMs(msCurrent)}</time>
        </td>
        <td>
          <time>{formatLapMs(msTotal)}</time>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    font-size: var(--font-size-small, 0.9em);
    table-layout: fixed;
    inline-size: 100%;
    border-collapse: collapse;
  }

  table:has(tbody:empty) {
    display: none;
  }

  table th {
    text-align: start;
    font-weight: var(--font-weight-bold, 600);
    border-block-end: 1px solid var(--color-dim, currentColor);
    border-block-end-color: color(from var(--color-dim) srgb r g b / 0.3);
  }

  table td {
    font-feature-settings: "tnum";
  }

  table :is(th, td) {
    padding-block: var(--space-medium, 0.75rem);
  }
</style>
