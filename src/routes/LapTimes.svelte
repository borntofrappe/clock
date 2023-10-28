<script>
	import { beforeUpdate, afterUpdate } from 'svelte';
	import { slide } from 'svelte/transition';

	/** @type {(null|HTMLOListElement)} */
	let listElement = null;
	let scrollToTop = false;

	/** @type Array<{time: number, index: string, lap: string, total: string}> */
	export let lapTimes = [];

	beforeUpdate(() => {
		if (listElement === null) return;

		scrollToTop = listElement.scrollTop > 0;
	});

	afterUpdate(() => {
		if (listElement === null) return;
		if (scrollToTop) {
			listElement.scrollTo(0, 0);
		}
	});
</script>

<ol id="stopwatch-laps" bind:this={listElement} role="list">
	{#each lapTimes as { index, lap, total } (index)}
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

	@media (prefers-reduced-motion: no-preference) {
		ol {
			scroll-behavior: smooth;
		}
	}
</style>
