<script lang="ts">
	import { goto } from '$app/navigation';
	import { type Book, bookCtx } from '$lib/service/book';
	import { sessionCtx } from '$lib/service/session';
	import { onMount } from 'svelte';

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
		<h1 class="text-center text-3xl">{book.title}</h1>
	{/await}
</div>
