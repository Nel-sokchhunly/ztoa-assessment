
export function NumberPadding(num: number, length: number): string {
	// padding number with 0 until it reaches the length

	return num.toString().padStart(length, '0');
}
