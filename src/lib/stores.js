import { writable } from 'svelte/store';

const createStopwatch = () => {
	let running = false;
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
		if (running) {
			lapsed += new Date().valueOf() - ms;
			if (interval) clearInterval(interval);
		} else {
			ms = new Date().valueOf();
			interval = setInterval(() => {
				set(lapsed + (new Date().valueOf() - ms));
			});
		}

		running = !running;
	};

	const reset = () => {
		if (running) toggle();

		lapsed = 0;
		set(0);
	};

	return {
		subscribe,
		toggle,
		reset
	};
};

export const stopwatch = createStopwatch();
