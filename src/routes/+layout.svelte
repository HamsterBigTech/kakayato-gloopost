<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import type { SupabaseClient, Session } from '@supabase/supabase-js';
	import { goto } from '$app/navigation';
	import { defaultClient, supabaseCtx } from '$lib/service/supabase';
	import { sessionCtx } from '$lib/service/session';
	import { bookCtx, BookService } from '$lib/service/book';
	import { page } from '$app/state';

	let { children } = $props();

	const supabase = $state<SupabaseClient>(defaultClient);
	supabaseCtx.set(supabase);

	const session = $state<{ session: Session | null }>({ session: null });
	sessionCtx.set(session);

	const books = $state<BookService>(new BookService(supabase));
	bookCtx.set(books);

	const path = $derived(page.url.pathname);

	onMount(() => {
		supabase.auth.onAuthStateChange((_, s) => {
			session.session = s;
		});
	});
</script>

<div class="flex flex-row h-100vh">
	<nav class="w-75 h-screen m-0 flex flex-col border-r-1 border-gray-300">
		<div class="p-2 border-b-1 border-gray-300">
			<h1 class="font-bold text-2xl p-3">Fancy Name</h1>
		</div>

		<div class="p-2 flex flex-col gap-2">
			<a
				class={`transition p-3 rounded-md ${path === '/' ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
				href="/">Home</a
			>
			<a
				class={`transition p-3 rounded-md ${path === '/feed' ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
				href="/feed">Feed</a
			>
		</div>

		<div class="mt-auto w-full border-t-1 border-gray-300 p-2">
			{#if session.session === null}
				<button
					class="transition p-3 rounded-md hover:bg-gray-200 active:bg-gray-300 w-full text-left"
					onclick={() => goto('/login')}>Login</button
				>
			{:else}
				<button
					class="transition p-3 rounded-md hover:bg-gray-200 active:bg-gray-300 w-full text-left"
					onclick={() => supabase.auth.signOut()}>Logout</button
				>
			{/if}
		</div>
	</nav>

	<div class="w-full">
		{@render children()}
	</div>
</div>
