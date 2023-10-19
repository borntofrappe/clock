/**
 * Number of hours, minutes, seconds, hundredths of a second for the input milliseconds
 * @param { number } ms
 * @returns [number, number, number, number]
 */
export const getTime = (ms) => {
	let time = ms;

	const hundredths = Math.floor((time % 1000) / 10);
	time = Math.floor(time / 1000);

	const seconds = time % 60;
	time = Math.floor(time / 60);

	const minutes = time % 60;
	time = Math.floor(time / 60);

	return [time, minutes, seconds, hundredths];
};
