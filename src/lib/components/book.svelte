<script lang="ts">
	import type { Book } from '$lib/service/book';
	import type { Snippet } from 'svelte';

	const { book, children }: { book: Omit<Book, 'id'>; children?: Snippet } = $props();
</script>

<div class="flex justify-center">
	<div class="w-100 shadow-xl rounded-xl flex flex-col overflow-hidden">
		<img class="w-full h-150" src={book.image} />

		<div class="p-4 flex flex-row">
			<div class="flex flex-col w-full">
				<h1 class="text-xl font-bold">{book.title}</h1>
				<p class="text-sm">{book.author}</p>
			</div>

			{#if children !== undefined}
				{@render children()}
			{/if}
		</div>
	</div>
</div>
