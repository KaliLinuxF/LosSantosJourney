export const getRandomFloat = (min: number, max: number, decimals: number = 1): number => {
	const str = (Math.random() * (max - min) + min).toFixed(decimals);

	return parseFloat(str);
}
