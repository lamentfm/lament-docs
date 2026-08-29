<script lang="ts">
	let {
		number,
		title,
		children
	}: {
		number: number;
		title: string;
		children?: import('svelte').Snippet;
	} = $props();
</script>

<div class="relative flex gap-4 pb-6">
	<div class="flex flex-col items-center">
		<div
			class="border-surface-2 bg-surface-1 text-text-primary flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold"
		>
			{number}
		</div>
		<div class="bg-surface-1 mt-2 w-px flex-1"></div>
	</div>
	<div class="flex-1 pt-0.5 pb-2">
		<h4 class="text-text-primary mb-2 text-sm font-semibold">{title}</h4>
		<div class="text-text-primary text-sm leading-relaxed">
			{#if children}
				{@render children()}
			{/if}
		</div>
	</div>
</div>
