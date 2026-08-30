<script lang="ts">
	import { Check, Copy } from 'lucide-svelte';

	let {
		name,
		hex,
		colorClass
	}: {
		name: string;
		hex: string;
		colorClass: string;
	} = $props();

	let copied = $state(false);
	let timeout: ReturnType<typeof setTimeout>;

	function copyToClipboard() {
		navigator.clipboard.writeText(hex);
		copied = true;
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			copied = false;
		}, 2000);
	}
</script>

<button
	class="group flex w-full flex-col gap-3 rounded-2xl border border-surface-2 bg-surface-1 p-4 text-left transition-all hover:scale-[1.02] hover:border-surface-3 hover:shadow-md focus:ring-2 focus:ring-secondary focus:outline-none"
	onclick={copyToClipboard}
	aria-label="Copy {name} hex code"
>
	<div
		class="relative flex h-24 w-full items-center justify-center rounded-xl {colorClass} shadow-sm"
	>
		<div
			class="flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 font-medium text-white opacity-0 shadow-sm backdrop-blur-md transition-all group-hover:opacity-100"
		>
			{#if copied}
				<Check size={14} /> <span class="text-[10px]">Copied!</span>
			{:else}
				<Copy size={14} /> <span class="text-[10px]">Copy</span>
			{/if}
		</div>
	</div>

	<div>
		<h4 class="font-medium text-text-primary">{name}</h4>
		<div class="mt-1 text-xs text-text-muted">
			<span class="font-mono uppercase">{hex}</span>
		</div>
	</div>
</button>
