import type { Session } from '@supabase/supabase-js';
import { getContext, setContext } from 'svelte';

export type SessionContext = { session: Session | null };

const SESSION_KEY = 'supabase-session';

export function setSession(s: SessionContext) {
	setContext(SESSION_KEY, s);
}

export function getSession(): SessionContext {
	return getContext(SESSION_KEY);
}
