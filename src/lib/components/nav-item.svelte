<script lang="ts">
	import type { Snippet } from 'svelte';

	const { href, path, children }: { href: string; path: string; children: Snippet } = $props();
</script>

<a
	class={`transition p-3 rounded-md ${path === href ? 'bg-green-50 text-green-900' : 'hover:bg-green-50 hover:text-green-900'}`}
	{href}
>
	<div class="flex flex-row gap-2">
		{@render children()}
	</div>
</a>
