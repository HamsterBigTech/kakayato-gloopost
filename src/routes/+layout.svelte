<script lang="ts">
	import '../app.css';
	import { type SupabaseContext, connect, setClient } from '$lib/supabase';
	import { type SessionContext, setSession } from '$lib/session';
	import { onMount } from 'svelte';

	let { children } = $props();

	const client = $state<SupabaseContext>({ client: null });
	const session = $state<SessionContext>({ session: null });

	setClient(client);
	setSession(session);

	onMount(() => {
		client.client = connect();

		client.client!.auth.onAuthStateChange((_, s) => {
			session.session = s;
		});
	});
</script>

<nav class="border-b-1 border-black m-0 p-2 flex justify-between items-center">
	<a class="underline p-2" href="/">Home</a>

	{#if session?.session === null}
		<a class="border-1 w-20 text-center border-black hover:bg-gray-300 p-2 rounded-md" href="/login"
			>Login</a
		>
	{:else}
		<button
			class="border-1 w-20 text-center border-black hover:bg-gray-300 p-2 rounded-md"
			onclick={() => client.client?.auth.signOut()}>Logout</button
		>
	{/if}
</nav>

{@render children()}
