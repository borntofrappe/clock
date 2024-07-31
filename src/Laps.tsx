import { Lap } from "./types";

import { For } from "solid-js";
import { formatLapMs } from "./lib/utils";

function Laps(props: { laps: Lap[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Laps</th>
          <th>Time</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <For each={props.laps}>
          {(lap) => (
            <tr>
              <td>
                {lap.number}
                {lap.addendum ? <span> &nbsp;{lap.addendum}</span> : ""}
              </td>
              <td>
                <time>{formatLapMs(lap.msCurrent)}</time>
              </td>
              <td>
                <time>{formatLapMs(lap.mstotal)}</time>
              </td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
}

export default Laps;
