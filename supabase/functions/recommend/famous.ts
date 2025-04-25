import { parse } from 'jsr:@std/csv';

export async function loadFamousBooks() {
	const data = await Deno.readTextFile('famous.txt');
	return parse(data, { columns: ['title', 'author', 'image'] });
}
