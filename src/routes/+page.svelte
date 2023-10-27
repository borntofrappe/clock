<script>
	import icons from './icons';
	import { stopwatch, getTime } from '$lib';
	import { onMount } from 'svelte';

	let expand = false;
	/** @type {('light'|'dark')} */
	let theme = 'light';
	/** @type {(null|'watch'|'run'|'wait')} */
	let state = null;
	/** @type Array<{time: number, index: string, lap: string, total: string}> */
	let laps = [];

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

	const setLap = () => {
		const [h, m, s, hh] = [hours, minutes, seconds, hundredths].map((d) => parseInt(d));
		const time = (h * 3600 + m * 60 + s) * 1000 + hh * 10;

		const index = (laps.length + 1).toString().padStart(2, '0');
		const total = `${hours}:${minutes}:${seconds}.${hundredths}`;

		let lap = '';
		if (laps.length === 0) {
			lap = total;
		} else {
			const [hours, minutes, seconds, hundredths] = getTime(time - laps[0].time).map((d) =>
				d.toString().padStart(2, '0')
			);

			lap = `${hours}:${minutes}:${seconds}.${hundredths}`;
		}

		laps = [
			{
				time,
				index,
				lap,
				total
			},
			...laps
		];
	};

	$: [hours, minutes, seconds, hundredths] = getTime($stopwatch).map((d) =>
		d.toString().padStart(2, '0')
	);
</script>

<div class="layout" class:expand>
	<main>
		<div class="preferences">
			<button disabled={state === null} on:click={toggleExpand} aria-pressed={expand}>
				<span class="visually-hidden">Expand</span>
				{@html expand ? icons['restore'] : icons['expand']}
			</button>
			<button disabled={state === null} on:click={toggleTheme} aria-pressed={theme === 'dark'}>
				<span class="visually-hidden">Set dark theme</span>
				{@html icons['sun']}
				{@html icons['moon']}
			</button>
		</div>

		<!-- prettier-ignore -->
		<svg data-state="{state}" aria-level={1} role="heading" viewBox="-9.2273 -11.795 86.27 17.841">
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
				disabled={state === null}
				on:click={() => {
					stopwatch.toggle();
					state = stopwatch.state === 'running' ? 'run' : 'wait';
				}}
				aria-pressed={state === 'run'}
			>
				<span class="visually-hidden">Run</span>
				{@html state === 'run' ? icons['pause'] : icons['start']}
			</button>
			<button disabled={state !== 'run'} on:click={setLap}>
				<span class="visually-hidden">Laps</span>
				{@html icons['flag']}
			</button>
			<button
				disabled={state === null || $stopwatch === 0}
				on:click={() => {
					stopwatch.reset();
					laps = [];
					state = stopwatch.state === 'running' ? 'run' : 'wait';
				}}
			>
				<span class="visually-hidden">Reset</span>
				{@html icons['reset']}
			</button>
		</div>
	</main>

	<ol role="list">
		{#each laps as { index, lap, total }}
			<li>
				<span>{index}</span>
				<span>+ {lap}</span>
				<span>{total}</span>
			</li>
		{/each}
	</ol>
</div>

<style>
	:global(html) {
		view-timeline-name: none;
	}

	.layout svg[role='heading'] {
		view-transition-name: heading;
	}

	.layout .preferences button:nth-child(1) {
		view-transition-name: toggle-size;
	}

	.layout .preferences button:nth-child(2) {
		view-transition-name: toggle-theme;
	}

	.layout .controls button:nth-child(1) {
		view-transition-name: toggle-start;
	}

	.layout .controls button:nth-child(2) {
		view-transition-name: set-lap;
	}

	.layout .controls button:nth-child(3) {
		view-transition-name: reset;
	}

	.layout ol {
		view-transition-name: list-laps;
	}

	:global(::view-transition-old(toggle-theme)),
	:global(::view-transition-old(set-lap)),
	:global(::view-transition-old(list-laps)) {
		display: none;
	}

	:global(::view-transition-group(*)) {
		animation-duration: 0.25s;
	}

	:global(::view-transition-new(toggle-theme)),
	:global(::view-transition-new(set-lap)),
	:global(::view-transition-new(list-laps)) {
		animation-delay: 0.25s;
	}

	.layout {
		padding-block-start: max(10vb, 1rem);
		padding-inline: 5%;
		display: flex;
		flex-direction: column;
		min-height: 100svb;
		max-inline-size: 60ch;
		margin-inline: auto;
	}

	.layout.expand {
		padding-block-start: 0;
		padding-inline: 0;
		max-inline-size: 80ch;
		justify-content: center;
	}

	.layout.expand .preferences button:nth-child(2),
	.layout.expand .controls button:nth-child(2),
	.layout.expand ol {
		display: none;
	}

	.layout > * + *,
	main > * + * {
		margin-block-start: var(--gap, 2rem);
	}

	main svg[role='heading'] {
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

	ol {
		font-feature-settings: 'tnum';
		display: grid;
		grid-template-columns: auto 1fr auto;
	}

	ol li {
		display: contents;
	}

	li span {
		text-align: end;
	}

	li span:nth-child(2) {
		text-align: center;
	}

	svg[role='heading'] {
		display: block;
		color: var(--color-dim);
	}

	svg[role='heading'][data-state='run'] {
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

	ol {
		list-style: none;
		padding: 0;
		font-size: 0.9em;
	}

	li span {
		padding-block: 0.5rem;
	}
</style>
