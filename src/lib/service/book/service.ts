import type { SupabaseClient } from '@supabase/supabase-js';
import type { Book } from './types';

export class BookService {
	private readonly supabase: SupabaseClient;

	constructor(supabase: SupabaseClient) {
		this.supabase = supabase;
	}

	// TODO: actual work in these methods

	getRandomBook(): Promise<Book> {
		return new Promise((res) =>
			setTimeout(
				() =>
					res({
						id: 'huh',
						authors: ['Никто Иван Иванович', 'Никто Петр Петрович'],
						title: 'HTTP для маленьких и тупых',
						imageUrl: 'https://http.cat/400.jpg'
					}),
				500
			)
		);
	}

	likeBook(id: string) {
		console.log(`book ${id} liked`);
		return Promise.resolve();
	}

	dislikeBook(id: string) {
		console.log(`book ${id} disliked`);
		return Promise.resolve();
	}
}
