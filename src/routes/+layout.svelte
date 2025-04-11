<script lang="ts">
	import '../app.css';
	import { connect, setClient } from '$lib/supabase';
	import { type SessionState, setSession } from '$lib/session';

	let { children } = $props();

	const client = connect();
	setClient(client);

	let state = $state<SessionState>({ session: null });
	client.auth.onAuthStateChange((_, s) => {
		state.session = s;
	});

	setSession(state);
</script>

<nav class="border-b-1 border-black m-0 p-2 flex justify-between items-center">
	<a class="underline p-2" href="/">Home</a>

	{#if state.session === null}
		<a class="border-1 w-20 text-center border-black hover:bg-gray-300 p-2 rounded-md" href="/login"
			>Login</a
		>
	{:else}
		<button
			class="border-1 w-20 text-center border-black hover:bg-gray-300 p-2 rounded-md"
			onclick={() => client.auth.signOut()}>Logout</button
		>
	{/if}
</nav>

{@render children()}
