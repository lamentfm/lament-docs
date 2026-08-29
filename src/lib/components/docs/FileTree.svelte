<script lang="ts">
	import { Folder, File } from 'lucide-svelte';

	type TreeNode = {
		name: string;
		type: 'file' | 'dir';
		children?: TreeNode[];
		highlight?: boolean;
	};

	let {
		items
	}: {
		items: TreeNode[];
	} = $props();
</script>

{#snippet renderTree(nodes: TreeNode[], depth: number)}
	{#each nodes as node (node.name)}
		<div class="flex items-center gap-2 py-0.5" style="padding-left: {depth * 1.25}rem">
			{#if node.type === 'dir'}
				<Folder size={14} class="text-text-primary shrink-0" />
			{:else}
				<File size={14} class="text-text-primary shrink-0" />
			{/if}
			<span class="text-sm {node.highlight ? 'text-text-primary font-medium' : 'text-text-primary'}">
				{node.name}
			</span>
		</div>
		{#if node.children}
			{@render renderTree(node.children, depth + 1)}
		{/if}
	{/each}
{/snippet}

<div class="rounded-md border-surface-2 bg-surface-1 my-4 overflow-hidden border px-4 py-3 font-mono">
	{@render renderTree(items, 0)}
</div>
