export async function loadSimilarity() {
	const data = await Deno.readTextFile('../_shared/similarity.txt');
	return data.split('\n').map((line) => line.split(',').map(Number.parseFloat));
}
