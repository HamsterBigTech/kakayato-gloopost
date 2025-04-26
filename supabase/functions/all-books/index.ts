import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { loadFamousBooks } from '../_shared/famous.ts';
import { serve, response } from '../_shared/server.ts';

serve(async (_, supabase) => {
	const { data, error } = await supabase.from('books').select();

	if (error != null) {
		throw error;
	}

	const books = await loadFamousBooks();
	const readBooks = data.flatMap(({ book_id, will_read }) => {
		const book = books[book_id];

		if (!book) {
			return [];
		}

		return [
			{
				id: book_id,
				willRead: will_read,
				...book
			}
		];
	});

	return response(readBooks);
});
