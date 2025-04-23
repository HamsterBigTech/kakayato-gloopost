import Context from '$lib/util/context';
import type { Session } from '@supabase/supabase-js';

export const sessionCtx = new Context<{ session: Session | null }>('supabase-session');
