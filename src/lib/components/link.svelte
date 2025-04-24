<script lang="ts">
	import type { Snippet } from 'svelte';

	const { href, children }: { href: string; children: Snippet } = $props();
</script>

<a class="underline p-2" {href}>
	{@render children()}
</a>
