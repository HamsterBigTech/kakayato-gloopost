export type BookQuote = {
	quote: string;
	book: string;
	author: string;
};

export async function load(): Promise<BookQuote> {
	const resp = await fetch('https://recite-flax.vercel.app/api/v1/random');
	return resp.json();
}
