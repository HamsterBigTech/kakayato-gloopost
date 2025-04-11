import Context from '$lib/util/context';
import type { Session } from '@supabase/supabase-js';

export const sessionCtx = new Context<Session>('supabase-session');
