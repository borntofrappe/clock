<script>
	import { onMount } from 'svelte';

	import { stopwatch, getTime } from '$lib';

	import icons from './icons';
	import LapTimes from './LapTimes.svelte';

	let expand = false;
	/** @type {('light'|'dark')} */
	let theme = 'light';
	/** @type {(null|'watch'|'run'|'wait')} */
	let state = null;
	/** @type Array<{time: number, index: string, lap: string, total: string}> */
	let lapTimes = [];

	onMount(() => {
		const dataTheme = document.documentElement.getAttribute('data-theme');
		if (dataTheme === 'dark') theme = dataTheme;

		state = 'watch';
	});

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

	const toggleTheme = () => {
		theme = theme === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	};

	const toggleStopwatch = () => {
		stopwatch.toggle();
		state = stopwatch.state === 'running' ? 'run' : 'wait';
	};

	const resetStopwatch = () => {
		stopwatch.reset();
		lapTimes = [];
		state = stopwatch.state === 'running' ? 'run' : 'wait';
	};

	const addLapTime = () => {
		const [h, m, s, hh] = [hours, minutes, seconds, hundredths].map((d) => parseInt(d));
		const time = (h * 3600 + m * 60 + s) * 1000 + hh * 10;

		const index = (lapTimes.length + 1).toString().padStart(2, '0');
		const total = `${hours}:${minutes}:${seconds}.${hundredths}`;

		let lap = '';
		if (lapTimes.length === 0) {
			lap = total;
		} else {
			const [hours, minutes, seconds, hundredths] = getTime(time - lapTimes[0].time).map((d) =>
				d.toString().padStart(2, '0')
			);

			lap = `${hours}:${minutes}:${seconds}.${hundredths}`;
		}

		lapTimes = [
			{
				time,
				index,
				lap,
				total
			},
			...lapTimes
		];
	};

	$: [hours, minutes, seconds, hundredths] = getTime($stopwatch).map((d) =>
		d.toString().padStart(2, '0')
	);
</script>

<div class="layout" class:expand>
	<main>
		<div class="preferences">
			<button
				id="toggle-size"
				disabled={state === null}
				on:click={toggleExpand}
				aria-pressed={expand}
			>
				<span class="visually-hidden">Expand</span>
				{@html expand ? icons['restore'] : icons['expand']}
			</button>
			<button
				id="toggle-theme"
				disabled={state === null}
				on:click={toggleTheme}
				aria-pressed={theme === 'dark'}
			>
				<span class="visually-hidden">Set dark theme</span>
				{@html icons['sun']}
				{@html icons['moon']}
			</button>
		</div>

		<!-- prettier-ignore -->
		<svg id="stopwatch-display" data-state="{state}" aria-level={1} role="heading" viewBox="-9.2273 -11.795 86.27 17.841">
			<g fill="currentColor" font-family="Inter, system-ui, sans-serif" style="font-feature-settings:'tnum'">
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
			<button
				id="stopwatch-toggle"
				disabled={state === null}
				on:click={toggleStopwatch}
				aria-pressed={state === 'run'}
			>
				<span class="visually-hidden">Run stopwatch</span>
				{@html state === 'run' ? icons['pause'] : icons['start']}
			</button>
			<button id="stopwatch-set-lap" disabled={state !== 'run'} on:click={addLapTime}>
				<span class="visually-hidden">Set lap</span>
				{@html icons['flag']}
			</button>
			<button
				id="stopwatch-reset"
				disabled={state === null || $stopwatch === 0}
				on:click={resetStopwatch}
			>
				<span class="visually-hidden">Reset stopwatch</span>
				{@html icons['reset']}
			</button>
		</div>
	</main>

	<LapTimes {lapTimes} />
</div>

<style>
	.layout {
		padding: max(10vb, 1rem) 2rem 1rem;
		display: flex;
		flex-direction: column;
		block-size: 100svb;
		max-inline-size: 70ch;
		margin-inline: auto;
	}

	.layout.expand {
		padding: 0 1rem;
		max-inline-size: 80ch;
		justify-content: center;
	}

	.layout.expand #toggle-theme,
	.layout.expand #stopwatch-set-lap,
	.layout.expand :global(#stopwatch-laps) {
		display: none;
	}

	.layout > :global(* + *),
	main > * + * {
		margin-block-start: var(--gap, 2rem);
	}

	main > svg {
		--gap: 0;
	}

	.preferences {
		display: flex;
		justify-content: end;
	}

	.controls {
		display: flex;
		justify-content: center;
		gap: 1rem;
	}

	.layout > :global(ol) {
		block-size: 100%;
		overflow-y: auto;
	}

	.layout > :global(ol::-webkit-scrollbar) {
		inline-size: 0.2rem;
	}

	.layout > :global(ol::-webkit-scrollbar-thumb) {
		border-radius: 0.1rem;
		background: var(--color-dim);
	}

	svg#stopwatch-display {
		display: block;
		color: var(--color-dim);
	}

	svg#stopwatch-display[data-state='run'] {
		color: var(--color);
	}

	.preferences button {
		inline-size: 2.2rem;
		block-size: 2.2rem;
		padding: 0.6rem;
		border-radius: 0.5rem;
		color: var(--button-color);
		background: none;
		border: none;
	}

	.preferences button:not(:disabled):hover {
		background: var(--button-hover);
	}

	.preferences button:not(:disabled):active {
		background: var(--button-active);
	}

	.preferences button:disabled {
		opacity: 0.6;
	}

	.preferences button:focus {
		outline-offset: 2px;
		outline-color: currentColor;
	}

	.preferences button > :global(svg) {
		display: block;
		inline-size: 100%;
		block-size: 100%;
	}

	.preferences button:nth-child(2) > :global(svg:nth-of-type(2)) {
		display: none;
	}

	@media (prefers-color-scheme: dark) {
		:global([data-theme='dark']) .preferences button:nth-child(2) > :global(svg:nth-of-type(1)) {
			display: none;
		}

		:global([data-theme='dark']) .preferences button:nth-child(2) > :global(svg:nth-of-type(2)) {
			display: initial;
		}
	}

	:global([data-theme='light']) .preferences button:nth-child(2) > :global(svg:nth-of-type(1)) {
		display: initial;
	}

	:global([data-theme='light']) .preferences button:nth-child(2) > :global(svg:nth-of-type(2)) {
		display: none;
	}

	:global([data-theme='dark']) .preferences button:nth-child(2) > :global(svg:nth-of-type(1)) {
		display: none;
	}

	:global([data-theme='dark']) .preferences button:nth-child(2) > :global(svg:nth-of-type(2)) {
		display: initial;
	}

	.controls button {
		font-size: 3.2rem;
		inline-size: 1em;
		block-size: 1em;
		padding: 0.33em;
		border-radius: 0.5rem;
		color: var(--button-color);
		background: var(--button-background);
		border: none;
		box-shadow: 0 0 0.15rem -0.05rem currentColor, 0 0 0.5rem -0.4rem currentColor;
		border-radius: 1e5px;
	}

	.controls button:not(:disabled):hover {
		background: var(--button-hover);
	}

	.controls button:not(:disabled):active {
		background: var(--button-active);
	}

	.controls button:disabled {
		background: none;
		opacity: 0.6;
	}

	.controls button:focus {
		outline-offset: 2px;
		outline-color: currentColor;
	}

	.controls button:nth-child(1) {
		color: var(--accent-color);
		background: var(--accent-background);
	}

	.controls button:nth-child(1):not(:disabled):hover {
		background: var(--accent-hover);
	}

	.controls button:nth-child(1):not(:disabled):active {
		color: var(--accent-active-color);
		background: var(--accent-active-background);
	}

	.controls button:nth-child(1):focus {
		outline-color: var(--accent-background);
	}

	.controls button > :global(svg) {
		display: block;
		inline-size: 100%;
		block-size: 100%;
	}
</style>
