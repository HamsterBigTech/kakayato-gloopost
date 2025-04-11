<script lang="ts">
	import { getClient } from '$lib/supabase';
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';
	import { getSession } from '$lib/session';
	import { goto } from '$app/navigation';

	const session = getSession();
	const client = getClient();

	$effect(() => {
		if (session.session !== null) goto('/');
	});
</script>

<div class="w-200 m-auto">
	{#if client.client !== null}
		<Auth supabaseClient={client.client} appearance={{ theme: ThemeSupa }} />
	{/if}
</div>
