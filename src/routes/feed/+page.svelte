<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { type Book, bookCtx } from '$lib/service/book';
	import { sessionCtx } from '$lib/service/session';
	import BookView from '$lib/components/book.svelte';

	const books = bookCtx.get();
	const session = sessionCtx.get();

	// A promise that never resolves so that server just renders the spinner
	// without touching any of the APIs.
	let selectedBook = $state(new Promise<Book>(() => {}));

	$effect(() => {
		if (session.session === null) goto('/login');
	});

	onMount(() => {
		selectedBook = books.getRandomBook();
	});
</script>

<div class="flex flex-col">
	<h1 class="mt-8 text-3xl text-center">Dicsover Your Next Read</h1>

	<div class="mt-8 flex flex-col items-center">
		{#await selectedBook}
			<h1 class="text-center text-3xl">Loading...</h1>
		{:then book}
			<BookView {book} />

			<div class="flex gap-8 w-fit mt-8">
				<button
					class="transition w-15 h-15 text-2xl rounded-full border-2 hover:bg-gray-200 active:bg-gray-300 border-red-300"
					onclick={async () => {
						await books.dislikeBook(book.id);
						selectedBook = books.getRandomBook();
					}}
				>
					👎
				</button>
				<button
					class="transition w-15 h-15 text-2xl rounded-full border-2 hover:bg-gray-200 active:bg-gray-300 border-green-300"
					onclick={async () => {
						await books.likeBook(book.id);
						selectedBook = books.getRandomBook();
					}}
				>
					👍
				</button>
			</div>
		{/await}
	</div>
</div>
