import Icons from "./Icons";

function App() {
  return (
    <>
      <Icons />
      <div class="preferences">
        <button aria-label="Toggle large display" aria-pressed="false">
          <svg data-pressed="false" width="1em" height="1em" viewBox="0 0 1 1">
            <use href="#icon-expand" width="1" height="1" />
          </svg>
          <svg data-pressed="true" display="none" width="1em" height="1em" viewBox="0 0 1 1">
            <use href="#icon-reduce" width="1" height="1" />
          </svg>
        </button>
        <button aria-label="Toggle dark theme" aria-pressed="false">
          <svg width="1em" height="1em" viewBox="0 0 1 1">
            <use href="#icon-sun" width="1" height="1" />
          </svg>
          <svg data-pressed="true" display="none" width="1em" height="1em" viewBox="0 0 1 1">
            <use href="#icon-moon" width="1" height="1" />
          </svg>
        </button>
      </div>
      <main>
        {/* prettier-ignore */}
        <svg class="display" role="heading" aria-level={1} display="block" viewBox="-9.63 -11.795 87.262 17.841">
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
    </>
  );
}

export default App;
