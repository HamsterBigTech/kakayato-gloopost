import type { SupabaseClient } from '@supabase/supabase-js';
import type { Book } from './types';

export class BookService {
	private readonly supabase: SupabaseClient;

	constructor(supabase: SupabaseClient) {
		this.supabase = supabase;
	}

	async getRandomBook(): Promise<Book> {
		const book = await this.supabase.functions.invoke('recommend');
		return book.data as Book;
	}

	private async insert(row: { book_id: number; will_read: boolean }) {
		const { data, error } = await this.supabase.auth.getUser();

		if (error !== null) {
			console.log(error);
			return;
		}

		await this.supabase.from('books').insert({ ...row, user_id: data.user.id });
	}

	likeBook(id: Book['id']) {
		return this.insert({ book_id: id, will_read: true });
	}

	dislikeBook(id: Book['id']) {
		return this.insert({ book_id: id, will_read: false });
	}
}
