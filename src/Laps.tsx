import { Lap } from "./types";

import { Index } from "solid-js";
import { formatLapMs } from "./lib/utils";

import styles from "./Laps.module.css";

function Laps(props: { laps: Lap[] }) {
  return (
    <table class={styles.laps}>
      <thead>
        <tr>
          <th>Laps</th>
          <th>Time</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <Index each={props.laps}>
          {(lap) => (
            <tr>
              <td>
                {lap().number}
                {lap().addendum ? <span> &nbsp;{lap().addendum}</span> : ""}
              </td>
              <td>
                <time>{formatLapMs(lap().msCurrent)}</time>
              </td>
              <td>
                <time>{formatLapMs(lap().msTotal)}</time>
              </td>
            </tr>
          )}
        </Index>
      </tbody>
    </table>
  );
}

export default Laps;