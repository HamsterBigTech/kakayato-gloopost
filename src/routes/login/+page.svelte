<script lang="ts">
	import { supabaseCtx } from '$lib/service/supabase';
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';
	import { sessionCtx } from '$lib/service/session';
	import { goto } from '$app/navigation';

	const supabase = supabaseCtx.get();
	const session = sessionCtx.get();

	$effect(() => {
		if (session.session !== null) goto('/');
	});
</script>

<div class="w-200 m-auto">
	<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
</div>
