<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import type { SupabaseClient, Session } from '@supabase/supabase-js';
	import { goto } from '$app/navigation';
	import { defaultClient, supabaseCtx } from '$lib/service/supabase';
	import { sessionCtx } from '$lib/service/session';
	import { bookCtx, BookService } from '$lib/service/book';
	import { page } from '$app/state';
	import NavItem from '$lib/components/nav-item.svelte';

	let { children } = $props();

	const supabase = $state<SupabaseClient>(defaultClient);
	supabaseCtx.set(supabase);

	const session = $state<{ session: Session | null }>({ session: null });
	sessionCtx.set(session);

	const books = $state<BookService>(new BookService(supabase));
	bookCtx.set(books);

	const path = $derived(page.url.pathname);

	onMount(() => {
		supabase.auth.onAuthStateChange((_, s) => {
			session.session = s;
		});
	});
</script>

<div class="flex flex-row h-100vh bg-gray-50">
	<nav class="w-75 h-screen m-0 flex flex-col border-gray-300 bg-white shadow-xl">
		<div class="p-2 border-b-1 border-gray-300">
			<h1 class="font-bold text-2xl p-3">BookMatch</h1>
		</div>

		<div class="p-2 flex flex-col gap-2">
			<NavItem href="/" {path}>
				<svg
					class="mt-auto mb-auto"
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M3 10L12 3L21 10H19V20H15V14H9V20H5V10H3Z" />
				</svg>

				Home
			</NavItem>

			<NavItem href="/feed" {path}>
				<svg
					class="mt-auto mb-auto"
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z" />
					<path d="M8 7h6" />
					<path d="M8 11h8" />
					<path d="M8 15h6" />
				</svg>

				Feed
			</NavItem>

			<NavItem href="/viewed" {path}>
				<svg
					class="mt-auto mb-auto"
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M12 8v4l3 3" />
					<circle cx="12" cy="12" r="10" />
				</svg>

				Viewed
			</NavItem>
		</div>

		<div class="mt-auto w-full border-t-1 border-gray-300 p-2">
			{#if session.session === null}
				<button
					class="transition p-3 rounded-md hover:bg-green-50 hover:text-green-900 active:bg-green-100 w-full text-left"
					onclick={() => goto('/login')}
				>
					<div class="flex flex-row gap-2">
						<svg
							class="mt-auto mb-auto"
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
							<polyline points="10 17 15 12 10 7" />
							<line x1="15" y1="12" x2="3" y2="12" />
						</svg>

						Login
					</div>
				</button>
			{:else}
				<button
					class="transition p-3 rounded-md hover:bg-green-100 hover:text-green-900 active:bg-green-100 w-full text-left"
					onclick={() => supabase.auth.signOut()}
				>
					<div class="flex flex-row gap-2">
						<svg
							class="mt-auto mb-auto"
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
							<polyline points="10 17 15 12 10 7" />
							<line x1="15" y1="12" x2="3" y2="12" />
						</svg>

						Logout
					</div>
				</button>
			{/if}
		</div>
	</nav>

	<div class="w-full">
		{@render children()}
	</div>
</div>
