import { writable } from 'svelte/store';

const createStopwatch = () => {
	/** @type {('waiting'|'running')} */
	let state = 'waiting';
	/** @type null|NodeJS.Timer */
	let interval = null;
	let ms = 0;
	let lapsed = 0;

	const { subscribe, set } = writable(0, () => {
		return () => {
			if (interval) clearInterval(interval);
		};
	});

	const toggle = () => {
		if (state === 'running') {
			state = 'waiting';
			lapsed += new Date().valueOf() - ms;
			if (interval) clearInterval(interval);
		} else {
			state = 'running';
			ms = new Date().valueOf();
			interval = setInterval(() => {
				set(lapsed + (new Date().valueOf() - ms));
			});
		}
	};

	const reset = () => {
		if (state === 'running') toggle();

		lapsed = 0;
		set(0);
	};

	return {
		get state() {
			return state;
		},
		subscribe,
		toggle,
		reset
	};
};

export const stopwatch = createStopwatch();
