<script lang="ts">
	import { cn } from '$lib/utils.js';

	let {
		class: className,
		children,
		title,
		description
	}: {
		class?: string;
		children?: import('svelte').Snippet;
		title?: string;
		description?: string;
	} = $props();
</script>

<div
	class={cn(
		'relative overflow-hidden rounded-2xl border border-surface-2 bg-surface-1 p-6 transition-colors hover:border-surface-3',
		className
	)}
>
	{#if title || description}
		<div class="mb-4">
			{#if title}
				<h3 class="font-medium text-text-primary">{title}</h3>
			{/if}
			{#if description}
				<p class="text-sm text-text-muted">{description}</p>
			{/if}
		</div>
	{/if}

	<div class="relative z-10 h-full w-full">
		{@render children?.()}
	</div>

	<!-- Optional subtle grid background for the premium bento vibe -->
	<div
		class="bg-size:24px_24px pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] opacity-[0.03]"
	></div>
</div>
