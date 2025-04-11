<script lang="ts">
	import '../app.css';
	import { connect, supabaseCtx } from '$lib/service/supabase';
	import { sessionCtx } from '$lib/service/session';
	import { onMount } from 'svelte';
	import type { Inner } from '$lib/util/context';
	import type { SupabaseClient, Session } from '@supabase/supabase-js';

	let { children } = $props();

	const supabase = $state<Inner<SupabaseClient>>({ val: null });
	supabaseCtx.set(supabase);

	const session = $state<Inner<Session>>({ val: null });
	sessionCtx.set(session);

	onMount(() => {
		supabase.val = connect();

		supabase.val!.auth.onAuthStateChange((_, s) => {
			session.val = s;
		});
	});
</script>

<nav class="border-b-1 border-black m-0 p-2 flex justify-between items-center">
	<a class="underline p-2" href="/">Home</a>

	{#if session.val === null}
		<a class="border-1 w-20 text-center border-black hover:bg-gray-300 p-2 rounded-md" href="/login"
			>Login</a
		>
	{:else}
		<button
			class="border-1 w-20 text-center border-black hover:bg-gray-300 p-2 rounded-md"
			onclick={() => supabase.val?.auth.signOut()}>Logout</button
		>
	{/if}
</nav>

{@render children()}
