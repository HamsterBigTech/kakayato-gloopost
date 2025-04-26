import { parse } from 'jsr:@std/csv';

export async function loadFamousBooks() {
	const data = await Deno.readTextFile('../_shared/famous.txt');
	return parse(data, { columns: ['title', 'author', 'image'] });
}
