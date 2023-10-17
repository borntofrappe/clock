<script>
	import icons from './icons';
</script>

<main>
	<button aria-pressed="false">
		<span class="visually-hidden">Expand</span>
		{@html icons['expand']}
	</button>

	<!-- prettier-ignore -->
	<svg aria-level={1} role="heading" viewBox="-9.04542 -11.79565 85.964 17.841">
        <g fill="currentColor" font-family="'Inter', system-ui, sans-serif">
            <text text-anchor="middle"><tspan font-size="16">00</tspan><tspan x="0" y="6" font-size="4">hr</tspan></text>
            <text x="10.049788" font-size="16">:</text>
            <text x="24.508667" text-anchor="middle"><tspan font-size="16">00</tspan><tspan x="24.508667" y="6" font-size="4">min</tspan></text>
            <text x="34.558453" font-size="16">:</text>
            <text x="49.017334" text-anchor="middle"><tspan font-size="16">00</tspan><tspan x="49.017334" y="6" font-size="4">sec</tspan></text>
            <text x="59.06712" font-size="16">.</text>
            <text x="70.699295" font-size="11" text-anchor="middle">00</text>
        </g>
      </svg>

	<div>
		<button>
			<span class="visually-hidden">Start</span>
			{@html icons['start']}
		</button>
		<button>
			<span class="visually-hidden">Reset</span>
			{@html icons['reset']}
		</button>
	</div>
</main>

<style>
</style>
