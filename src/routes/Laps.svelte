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
