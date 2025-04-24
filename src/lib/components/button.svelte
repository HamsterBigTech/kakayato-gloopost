<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		onClick: () => unknown;
		children: Snippet;
		classes?: string;
	};

	const { children, classes = '', onClick }: Props = $props();
</script>

<button
	class={'transition border-1 text-center border-black hover:bg-gray-300 active:bg-gray-400 p-2 rounded-md ' +
		classes}
	onclick={onClick}
>
	{@render children()}
</button>
