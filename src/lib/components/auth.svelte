<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';

	type View = 'sign-in' | 'sign-up' | 'forgot-password';

	const { supabase }: { supabase: SupabaseClient } = $props();

	let view = $state<View>('sign-in');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let loading = $state(false);
	let error = $state('');
	let success = $state('');

	async function handleSignIn() {
		if (!email || !password) {
			error = 'Please fill in all fields';
			return;
		}
		loading = true;
		error = '';
		const { error: err } = await supabase.auth.signInWithPassword({ email, password });
		loading = false;
		if (err) error = err.message;
	}

	async function handleSignUp() {
		if (!email || !password || !confirmPassword) {
			error = 'Please fill in all fields';
			return;
		}
		if (password !== confirmPassword) {
			error = 'Passwords do not match';
			return;
		}
		if (password.length < 6) {
			error = 'Password must be at least 6 characters';
			return;
		}
		loading = true;
		error = '';
		const { error: err } = await supabase.auth.signUp({ email, password });
		loading = false;
		if (err) {
			error = err.message;
		} else {
			success = 'Check your email to confirm your account';
		}
	}

	async function handleForgotPassword() {
		if (!email) {
			error = 'Please enter your email';
			return;
		}
		loading = true;
		error = '';
		const { error: err } = await supabase.auth.resetPasswordForEmail(email);
		loading = false;
		if (err) {
			error = err.message;
		} else {
			success = 'Check your email for a password reset link';
		}
	}

	function switchView(newView: View) {
		view = newView;
		error = '';
		success = '';
	}
</script>

<div class="w-full max-w-md mx-auto bg-white shadow-xl rounded-xl p-8">
	<h1 class="text-2xl font-bold text-center mb-6">
		{#if view === 'sign-in'}
			Sign In
		{:else if view === 'sign-up'}
			Sign Up
		{:else}
			Reset Password
		{/if}
	</h1>

	{#if error}
		<div class="bg-red-50 text-red-900 p-3 rounded-md mb-4 text-sm">
			{error}
		</div>
	{/if}

	{#if success}
		<div class="bg-green-50 text-green-900 p-3 rounded-md mb-4 text-sm">
			{success}
		</div>
	{/if}

	{#if view === 'sign-in'}
		<form
			onsubmit={(e) => {
				e.preventDefault();
				handleSignIn();
			}}
			class="space-y-4"
		>
			<div>
				<label for="email" class="block text-sm font-medium mb-1">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					class="w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-50"
					placeholder="you@example.com"
				/>
			</div>
			<div>
				<label for="password" class="block text-sm font-medium mb-1">Password</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					class="w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-50"
					placeholder="••••••••"
				/>
			</div>
			<button
				type="submit"
				disabled={loading}
				class="w-full text-green-900 p-2 rounded-md hover:bg-green-50 active:bg-green-100 transition disabled:opacity-50"
			>
				{loading ? 'Signing in...' : 'Sign In'}
			</button>
		</form>
		<div class="mt-4 text-center text-sm space-y-2">
			<button
				type="button"
				onclick={() => switchView('forgot-password')}
				class="text-green-900 hover:underline"
			>
				Forgot password?
			</button>
			<div>
				Don't have an account?
				<button
					type="button"
					onclick={() => switchView('sign-up')}
					class="text-green-900 hover:underline ml-1"
				>
					Sign Up
				</button>
			</div>
		</div>
	{:else if view === 'sign-up'}
		<form
			onsubmit={(e) => {
				e.preventDefault();
				handleSignUp();
			}}
			class="space-y-4"
		>
			<div>
				<label for="email" class="block text-sm font-medium mb-1">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					class="w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-50"
					placeholder="you@example.com"
				/>
			</div>
			<div>
				<label for="password" class="block text-sm font-medium mb-1">Password</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					class="w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-50"
					placeholder="••••••••"
				/>
			</div>
			<div>
				<label for="confirmPassword" class="block text-sm font-medium mb-1">Confirm Password</label>
				<input
					type="password"
					id="confirmPassword"
					bind:value={confirmPassword}
					class="w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-50"
					placeholder="••••••••"
				/>
			</div>
			<button
				type="submit"
				disabled={loading}
				class="w-full text-green-900 p-2 rounded-md hover:bg-green-50 active:bg-green-100 transition disabled:opacity-50"
			>
				{loading ? 'Creating account...' : 'Sign Up'}
			</button>
		</form>
		<div class="mt-4 text-center text-sm">
			Already have an account?
			<button
				type="button"
				onclick={() => switchView('sign-in')}
				class="text-green-900 hover:underline ml-1"
			>
				Sign In
			</button>
		</div>
	{:else}
		<form
			onsubmit={(e) => {
				e.preventDefault();
				handleForgotPassword();
			}}
			class="space-y-4"
		>
			<p class="text-sm text-gray-600 mb-4">
				Enter your email and we'll send you a link to reset your password.
			</p>
			<div>
				<label for="email" class="block text-sm font-medium mb-1">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					class="w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-50"
					placeholder="you@example.com"
				/>
			</div>
			<button
				type="submit"
				disabled={loading}
				class="w-full text-green-900 p-2 rounded-md hover:bg-green-50 active:bg-green-100 transition disabled:opacity-50"
			>
				{loading ? 'Sending...' : 'Send Reset Link'}
			</button>
		</form>
		<div class="mt-4 text-center text-sm">
			<button
				type="button"
				onclick={() => switchView('sign-in')}
				class="text-green-900 hover:underline"
			>
				Back to Sign In
			</button>
		</div>
	{/if}
</div>
