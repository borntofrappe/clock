<script>
	import { onMount, beforeUpdate, afterUpdate } from 'svelte';
	import { slide } from 'svelte/transition';

	/** @type {(null|HTMLOListElement)} */
	let list = null;
	let scrollToTop = false;

	/** @type Array<{time: number, index: string, lap: string, total: string}> */
	export let laps = [];

	beforeUpdate(() => {
		if (list === null) return;

		scrollToTop = list.scrollTop > 0;
	});

	afterUpdate(() => {
		if (list === null) return;
		if (scrollToTop) {
			list.scrollTo(0, 0);
		}
	});
</script>

<ol id="stopwatch-laps" bind:this={list} role="list">
	{#each laps as { index, lap, total } (index)}
		<li in:slide>
			<span>{index}</span>
			<span>+ {lap}</span>
			<span>{total}</span>
		</li>
	{/each}
</ol>

<style>
	ol {
		font-feature-settings: 'tnum';
		font-size: 0.9em;
		list-style: none;
		padding: 0;
		scroll-behavior: smooth;
	}

	li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-block: 0.5rem;
	}

	@media (min-width: 400px) {
		li {
			justify-content: initial;
			display: grid;
			align-items: center;
			grid-template-columns: repeat(3, 1fr);
			justify-items: center;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		ol {
			scroll-behavior: auto;
		}
	}
</style>
