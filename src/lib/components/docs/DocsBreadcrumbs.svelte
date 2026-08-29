<script lang="ts">
	import { ChevronRight } from 'lucide-svelte';

	let {
		items
	}: {
		items: { label: string; href?: string }[];
	} = $props();
</script>

<nav class="mb-4 flex items-center gap-1 text-sm" aria-label="Breadcrumb">
	{#each items as item, i (i)}
		{#if i > 0}
			<ChevronRight size={12} class="text-text-primary" />
		{/if}
		{#if item.href && i < items.length - 1}
			<a href={item.href} class="text-text-primary hover:text-text-primary transition-colors">
				{item.label}
			</a>
		{:else}
			<span class="text-text-primary {i === items.length - 1 ? 'font-medium' : ''}">{item.label}</span>
		{/if}
	{/each}
</nav>
