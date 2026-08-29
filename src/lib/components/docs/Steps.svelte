<script lang="ts">
	let {
		children
	}: {
		children?: import('svelte').Snippet;
	} = $props();
</script>

<div class="my-6 space-y-0">
	{#if children}
		{@render children()}
	{/if}
</div>
