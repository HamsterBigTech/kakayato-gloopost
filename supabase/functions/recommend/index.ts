import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { loadFamousBooks } from './../_shared/famous.ts';
import { loadSimilarity } from './../_shared/similarity.ts';
import { response, serve } from '../_shared/server.ts';

serve(async (_, supabase) => {
	const { data, error } = await supabase.from('books').select();

	if (error != null) {
		throw error;
	}

	const books = await loadFamousBooks();
	const notViewed = Object.keys(books)
		.map((key) => Number.parseInt(key))
		.filter((id) => data.every(({ book_id }) => book_id !== id));

	if (notViewed.length === 0) {
		throw new Error('all books viewed');
	}

	const liked = data.filter((book) => book.will_read === true);

	if (liked.length < 2) {
		const index = notViewed[Math.floor(Math.random() * notViewed.length)];
		return response({ id: index, ...books[index] });
	}

	const source = liked[Math.floor(Math.random() * liked.length)].book_id;
	const similarity = await loadSimilarity();
	const similar = similarity[source]
		.map((val, index) => ({ val, index }))
		.sort((a, b) => b.val - a.val)
		.find(({ index }) => notViewed.includes(index));

	return response({ id: similar.index, ...books[similar.index] });
});
