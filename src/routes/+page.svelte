<script lang="ts">
	import type { BookQuote } from './+page.server';

	const { data }: { data: BookQuote } = $props();
</script>

<div class="h-full w-200 m-auto flex flex-col gap-18 items-center justify-center">
	<cite class="text-6xl">{data.quote}</cite>
	<p class="text-xl">&mdash; {data.author}, <cite>{data.book}</cite></p>
</div>
