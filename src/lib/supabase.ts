import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { getContext, setContext } from 'svelte';

const CLIENT_KEY = 'supabase-client';

export type SupabaseContext = {
	client: SupabaseClient | null;
}

export const connect = () =>  createClient(
	import.meta.env.VITE_SUPABASE_PROJECT_URL,
	import.meta.env.VITE_SUPABASE_KEY
);

export function setClient(client: SupabaseContext) {
	setContext(CLIENT_KEY, client)
}

export function getClient(): SupabaseContext {
	return getContext(CLIENT_KEY)
}
