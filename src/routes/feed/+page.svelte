<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { type Book, bookCtx } from '$lib/service/book';
	import { sessionCtx } from '$lib/service/session';
	import Button from '$lib/components/button.svelte';

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

<div class="mt-5">
	{#await selectedBook}
		<h1 class="text-center text-3xl">Loading...</h1>
	{:then book}
		<div class="flex justify-center">
			<div class="w-150 p-2 border-black border-1 rounded-md flex flex-col text-center gap-2">
				<div class="m-0 flex flex-row justify-around">
					{#each book.authors as author (author)}
						<p class="text-xl whitespace-pre-line">{author.split(/\s+/).join('\n')}</p>
					{/each}
				</div>

				<h1 class="text-4xl m-5">{book.title}</h1>

				<img src={book.imageUrl} class="w-full rounded-md" />

				<div class="flex justify-stretch gap-2">
					<Button
						classes="w-full text-xl"
						onClick={() => {
							books.dislikeBook(book.id);
							selectedBook = books.getRandomBook();
						}}
					>
						Won't read
					</Button>
					<Button
						classes="w-full text-xl"
						onClick={() => {
							books.likeBook(book.id);
							selectedBook = books.getRandomBook();
						}}
					>
						Will read
					</Button>
				</div>
			</div>
		</div>
	{/await}
</div>
