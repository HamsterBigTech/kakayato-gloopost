<script lang="ts">
	import Book from '$lib/components/book.svelte';
	import { bookCtx, type ViewedBook } from '$lib/service/book';
	import { onMount } from 'svelte';

	const books = bookCtx.get();

	const PER_PAGE = 3;

	let viewedBooks = $state<ViewedBook[]>([]);

	let page = $state(0);
	const maxPages = $derived(Math.ceil(viewedBooks.length / PER_PAGE));
	const visible = $derived(viewedBooks.slice(page * PER_PAGE, (page + 1) * PER_PAGE));

	onMount(async () => {
		viewedBooks = await books.getViewed();
	});

	const prevPage = () => (page = Math.max(0, page - 1));
	const nextPage = () => (page = Math.min(maxPages - 1, page + 1));
</script>

<div class="w-312 mt-8 ml-auto mr-auto flex flex-col gap-8">
	<div class="flex flex-row justify-between">
		<h1 class="text-3xl">Viewed Books</h1>
		{#if viewedBooks.length > 0}
			<div class="flex flex-row gap-2">
				<button
					class="transition rounded-md hover:bg-green-50 hover:text-green-900 active:bg-green-100 p-3 w-20"
					onclick={prevPage}
				>
					Prev
				</button>
				<p class="m-auto p-3">Page {page + 1} of {maxPages}</p>
				<button
					class="transition rounded-md hover:bg-green-50 hover:text-green-900 active:bg-green-100 p-3 w-20"
					onclick={nextPage}
				>
					Next
				</button>
			</div>
		{/if}
	</div>

	{#if viewedBooks.length === 0}
		<h1 class="text-center text-3xl">No Books</h1>
	{:else}
		<div class="flex flex-row justify-around">
			{#each visible as book (book.id)}
				<Book {book}>
					<p class="text-xl ml-5">{book.willRead ? '👍' : '👎'}</p>
				</Book>
			{/each}
		</div>
	{/if}
</div>
