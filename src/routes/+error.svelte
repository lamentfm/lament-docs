<script lang="ts">
	import { page } from '$app/state';
	import { ArrowLeft } from 'lucide-svelte';
	import Logo from '$lib/components/ui/Logo.svelte';
</script>

<svelte:head>
	<title>Page Not Found — Lament</title>
</svelte:head>

<div class="flex min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-center px-4">
	<Logo size="48px" class="text-text-primary mb-6" />
	<h1 class="text-text-primary mb-2 text-4xl font-semibold tracking-tight">404</h1>
	<p class="text-text-primary mb-1 text-sm">Page not found</p>
	<p class="text-text-primary mb-8 text-xs">
		The page <code class="rounded-md bg-surface-1 text-text-primary px-1.5 py-0.5">{page.url.pathname}</code> does not exist.
	</p>
	<div class="flex items-center gap-4">
		<a
			href="/"
			class="rounded-[var(--radius-md)] border-surface-2 text-text-secondary hover:border-surface-3 hover:text-text-primary flex items-center gap-2 border px-4 py-2 text-sm font-medium transition-colors"
		>
			<ArrowLeft size={14} />
			Home
		</a>
		<a
			href="/docs"
			class="rounded-[var(--radius-md)] bg-surface-1 hover:bg-surface-2 px-4 py-2 text-sm font-medium text-text-primary transition-colors"
		>
			Documentation
		</a>
	</div>
</div>
