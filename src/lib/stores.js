import { writable } from 'svelte/store';

const createStopwatch = () => {
	let running = false;
	let frame = 0;
	let ms = 0;
	let lapsed = 0;

	const { subscribe, set } = writable(0, () => {
		return () => {
			cancelAnimationFrame(frame);
		};
	});

	const run = () => {
		set(lapsed + (new Date().valueOf() - ms));
		frame = requestAnimationFrame(run);
	};

	const toggle = () => {
		if (running) {
			lapsed += new Date().valueOf() - ms;
			cancelAnimationFrame(frame);
		} else {
			ms = new Date().valueOf();
			frame = requestAnimationFrame(run);
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
