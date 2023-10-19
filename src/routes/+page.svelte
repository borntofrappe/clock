<script>
	import icons from './icons';
	import { stopwatch, getTime } from '$lib';
	import { onMount } from 'svelte';

	let expand = false;

	const toggleExpand = () => {
		// @ts-ignore
		if (document.startViewTransition) {
			// @ts-ignore
			document.startViewTransition(async () => {
				expand = !expand;
			});
		} else {
			expand = !expand;
		}
	};

	let [hours, minutes, seconds, hundredths] = new Array(4).fill('00');

	onMount(() => {
		const unsubscribe = stopwatch.subscribe((ms) => {
			[hours, minutes, seconds, hundredths] = getTime(ms).map((d) => d.toString().padStart(2, '0'));
		});

		return () => {
			unsubscribe();
		};
	});
</script>

<div class="center">
	<main class:expand>
		<button on:click={toggleExpand} aria-pressed={expand}>
			<span class="visually-hidden">Expand</span>
			{@html expand ? icons['restore'] : icons['expand']}
		</button>

		<!-- prettier-ignore -->
		<svg aria-level={1} role="heading" viewBox="-9.04542 -11.79565 85.964 17.841">
        <g fill="currentColor" font-family="'Inter', system-ui, sans-serif">
            <text text-anchor="middle"><tspan font-size="16">{hours}</tspan><tspan x="0" y="6" font-size="4">hr</tspan></text>
            <text x="10.049788" font-size="16">:</text>
            <text x="24.508667" text-anchor="middle"><tspan font-size="16">{minutes}</tspan><tspan x="24.508667" y="6" font-size="4">min</tspan></text>
            <text x="34.558453" font-size="16">:</text>
            <text x="49.017334" text-anchor="middle"><tspan font-size="16">{seconds}</tspan><tspan x="49.017334" y="6" font-size="4">sec</tspan></text>
            <text x="59.06712" font-size="16">.</text>
            <text x="70.699295" font-size="11" text-anchor="middle">{hundredths}</text>
        </g>
      </svg>

		<div class="controls">
			<button on:click={stopwatch.toggle}>
				<span class="visually-hidden">Start</span>
				{@html icons['start']}
			</button>
			<button on:click={stopwatch.reset}>
				<span class="visually-hidden">Reset</span>
				{@html icons['reset']}
			</button>
		</div>
	</main>
</div>

<style>
	.center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: 100svb;
	}

	main {
		max-inline-size: 60ch;
		inline-size: 90%;
		padding: 1rem;
	}

	main > button {
		display: block;
		margin-inline-start: auto;
	}

	main > svg[role='heading'] {
		display: block;
		inline-size: 100%;
	}

	main > div {
		margin-block-start: 1.5rem;
		display: flex;
		justify-content: center;
		gap: 2rem;
	}

	main > button {
		inline-size: 2rem;
		block-size: 2rem;
		padding: 0.5rem;
		border-radius: 0.5rem;
		color: hsl(0 0% 11%);
		background: none;
		border: none;
	}

	main > button:hover {
		background: hsl(0 0% 88%);
	}

	main > button:focus {
		outline-offset: 2px;
		outline-color: currentColor;
	}

	.controls button {
		font-size: 3.2rem;
		inline-size: 1em;
		block-size: 1em;
		padding: 0.3em;
		border-radius: 0.5rem;
		color: hsl(0 0% 11%);
		background: hsl(0 0% 100%);
		border: none;
		box-shadow: 0 0 0.15rem -0.05rem currentColor, 0 0 0.5rem -0.4rem currentColor;
		border-radius: 1e5px;
	}

	.controls button:hover {
		background: hsl(0 0% 88%);
	}

	.controls button:focus {
		outline-offset: 2px;
		outline-color: currentColor;
	}

	.controls > button:nth-child(1) {
		color: hsl(0 0% 100%);
		background: hsl(182 95% 24%);
	}

	.controls > button:nth-child(1):hover {
		background: hsl(182 90% 30%);
	}

	.controls > button:nth-child(1):focus {
		outline-color: hsl(182 90% 30%);
	}

	.controls button > :global(svg) {
		display: block;
		inline-size: 100%;
		block-size: 100%;
	}

	main.expand {
		inline-size: 100%;
		max-inline-size: 80ch;
	}

	main.expand .controls button {
		font-size: 3.8rem;
	}

	main > button {
		view-transition-name: toggle-size;
	}

	main svg[role='heading'] {
		view-transition-name: heading;
	}

	main .controls button:nth-child(1) {
		view-transition-name: toggle-start;
	}

	main .controls button:nth-child(2) {
		view-transition-name: reset;
	}
</style>
