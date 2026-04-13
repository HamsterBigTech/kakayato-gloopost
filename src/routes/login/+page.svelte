<script lang="ts">
	import { supabaseCtx } from '$lib/service/supabase';
	import { sessionCtx } from '$lib/service/session';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Auth from '$lib/components/auth.svelte';

	const supabase = supabaseCtx.get();
	const session = sessionCtx.get();

	$effect(() => {
		if (session.session !== null) goto(resolve('/'));
	});
</script>

<div class="w-150 m-auto pt-8">
	<Auth {supabase} />
</div>
