import type { Session } from '@supabase/supabase-js';
import { getContext, setContext } from 'svelte';

export type SessionState = { session: Session | null };

const SESSION_KEY = 'supabase-session';

export function setSession(s: SessionState) {
	setContext(SESSION_KEY, s);
}

export function getSession(): SessionState {
	return getContext(SESSION_KEY);
}
