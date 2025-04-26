import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

const jsonHeaders = {
	'Content-Type': 'application/json'
};

export const response = (data: unknown, json = true) =>
	new Response(JSON.stringify(data), {
		headers: { ...(json ? jsonHeaders : {}), ...corsHeaders }
	});

export function serve(
	handler: (req: Request, supabase: ReturnType<typeof createClient>) => Promise<Response>
) {
	Deno.serve(async (req: Request) => {
		// I hate CORS
		if (req.method === 'OPTIONS') {
			return response('ok', false);
		}

		const supabase = createClient(
			Deno.env.get('SUPABASE_URL') ?? '',
			Deno.env.get('SUPABASE_ANON_KEY') ?? '',
			{ global: { headers: { Authorization: req.headers.get('Authorization')! } } }
		);

		return handler(req, supabase);
	});
}
