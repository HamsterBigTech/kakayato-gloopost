import type { SupabaseClient } from '@supabase/supabase-js';
import type { Book } from './types';

export class BookService {
	private readonly supabase: SupabaseClient;

	constructor(supabase: SupabaseClient) {
		this.supabase = supabase;
	}

	// TODO: actual work in these methods

	getRandomBook(): Promise<Book> {
		return Promise.resolve({
			id: 'huh',
			authors: ['Никто'],
			title: 'Тексты',
			imageUrl: 'https://http.cat/status/400'
		});
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
