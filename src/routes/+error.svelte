<script lang="ts">
	import { page } from '$app/state';
	import { ArrowLeft } from 'lucide-svelte';
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Lament Docs - Page Not Found</title>
</svelte:head>

<div class="flex min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-center px-4">
	<h1 class="mb-2 text-9xl font-semibold tracking-tight text-text-primary">404</h1>
	<p class="mb-1 text-sm text-text-primary">Page not found</p>
	<p class="mb-8 text-xs text-text-primary">
		The page <code class="rounded-md bg-surface-1 px-1.5 py-0.5 text-text-primary"
			>{page.url.pathname}</code
		> does not exist.
	</p>
	<div class="flex items-center gap-4">
		<a
			href={resolve('/')}
			class="flex items-center gap-2 rounded-md border border-surface-2 px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-surface-3 hover:text-text-primary"
		>
			<ArrowLeft size={14} />
			Home
		</a>
		<a
			href={resolve('/docs')}
			class="rounded-md bg-surface-1 px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-surface-2"
		>
			Documentation
		</a>
	</div>
</div>
