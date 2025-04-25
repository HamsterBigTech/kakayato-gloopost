import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { loadFamousBooks } from './famous.ts';
import { loadSimilarity } from './similarity.ts';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

const jsonHeaders = {
	'Content-Type': 'application/json'
};

const response = (data: unknown, headers: object) =>
	new Response(JSON.stringify(data), {
		headers: { ...headers, ...corsHeaders }
	});

Deno.serve(async (req) => {
	// I hate CORS
	if (req.method === 'OPTIONS') {
		return response('ok', {});
	}

	const supabase = createClient(
		Deno.env.get('SUPABASE_URL') ?? '',
		Deno.env.get('SUPABASE_ANON_KEY') ?? '',
		{ global: { headers: { Authorization: req.headers.get('Authorization')! } } }
	);

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
		return response({ id: index, ...books[index] }, jsonHeaders);
	}

	const source = liked[Math.floor(Math.random() * liked.length)].book_id;
	const similarity = await loadSimilarity();
	const similar = similarity[source]
		.map((val, index) => ({ val, index }))
		.sort((a, b) => b.val - a.val)
		.find(({ index }) => notViewed.includes(index));

	return response({ id: similar.index, ...books[similar.index] }, jsonHeaders);
});
