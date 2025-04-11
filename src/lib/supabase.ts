import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { getContext, setContext } from 'svelte';

const CLIENT_KEY = 'supabase-client';

export const connect = () => createClient(
	import.meta.env.VITE_SUPABASE_PROJECT_URL,
	import.meta.env.VITE_SUPABASE_KEY
);


export function setClient(client: SupabaseClient) {
	setContext(CLIENT_KEY, client)
}

export function getClient(): SupabaseClient {
	return getContext(CLIENT_KEY)
}
