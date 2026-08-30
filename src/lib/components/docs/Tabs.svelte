<script lang="ts">
	let {
		items,
		children
	}: {
		items: string[];
		children?: import('svelte').Snippet<[string]>;
	} = $props();

	let active = $derived(items[0] ?? '');
</script>

<div class="my-4">
	<div class="flex border-b border-surface-2" role="tablist">
		{#each items as item (item)}
			<button
				role="tab"
				aria-selected={active === item}
				class="relative px-4 py-2 text-sm font-medium transition-colors {active === item
					? 'text-text-primary'
					: 'text-text-muted hover:text-text-secondary'}"
				onclick={() => (active = item)}
			>
				{item}
				{#if active === item}
					<span class="absolute right-0 bottom-0 left-0 h-0.5 bg-accent"></span>
				{/if}
			</button>
		{/each}
	</div>
	<div class="pt-2" role="tabpanel">
		{#if children}
			{@render children(active)}
		{/if}
	</div>
</div>
