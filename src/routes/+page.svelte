<script>
	import icons from './icons';
	import { stopwatch, getTime } from '$lib';
	import { onMount } from 'svelte';

	let expand = false;
	/** @type {('light'|'dark')} */
	let theme = 'light';
	/** @type {(null|'watch'|'run'|'wait')} */
	let state = null;

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
			<button
				disabled={state !== 'run'}
				on:click={() => {
					// set lap
				}}
			>
				<span class="visually-hidden">Laps</span>
				{@html icons['flag']}
			</button>
			<button
				disabled={state === null || $stopwatch === 0}
				on:click={() => {
					stopwatch.reset();
					state = stopwatch.state === 'running' ? 'run' : 'wait';
				}}
			>
				<span class="visually-hidden">Reset</span>
				{@html icons['reset']}
			</button>
		</div>
	</main>

	<ol role="list">
		<li class="visually-hidden">
			<span>Lap</span>
			<span>Time</span>
			<span>Total</span>
		</li>
		<li>
			<span>02</span>
			<span>+ 00:00:02.66</span>
			<span>00:00:04.60</span>
		</li>
		<li>
			<span>01</span>
			<span>+ 00:00:01.94</span>
			<span>00:00:01.94</span>
		</li>
	</ol>
</div>

<style>
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

	:global(html) {
		view-timeline-name: none;
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
</style>
