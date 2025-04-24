<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import type { SupabaseClient, Session } from '@supabase/supabase-js';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/button.svelte';
	import { defaultClient, supabaseCtx } from '$lib/service/supabase';
	import { sessionCtx } from '$lib/service/session';
	import { bookCtx, BookService } from '$lib/service/book';
	import Link from '$lib/components/link.svelte';

	let { children } = $props();

	const supabase = $state<SupabaseClient>(defaultClient);
	supabaseCtx.set(supabase);

	const session = $state<{ session: Session | null }>({ session: null });
	sessionCtx.set(session);

	const books = $state<BookService>(new BookService(supabase));
	bookCtx.set(books);

	onMount(() => {
		supabase.auth.onAuthStateChange((_, s) => {
			session.session = s;
		});
	});
</script>

<nav class="border-b-1 border-black m-0 p-2 flex justify-between items-center">
	<div class="flex gap-2">
		<Link href="/">Home</Link>
		<Link href="/feed">Feed</Link>
	</div>

	{#if session.session === null}
		<Button classes="w-20" onClick={() => goto('/login')}>Login</Button>
	{:else}
		<Button classes="w-20" onClick={() => supabase.auth.signOut()}>Logout</Button>
	{/if}
</nav>

{@render children()}
