export type BookQuote = {
	quote: string;
	book: string;
	author: string;
};

export async function load(): Promise<BookQuote> {
	const resp = await fetch('https://recite-production.up.railway.app/api/v1/random');
	return resp.json()
};
