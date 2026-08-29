<script lang="ts">
	import { Terminal, Copy, Check } from 'lucide-svelte';

	let {
		command
	}: {
		command: string;
	} = $props();

	let copied = $state(false);

	function copyCommand() {
		navigator.clipboard.writeText(command);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<div
	class="group rounded-md border-surface-2 bg-surface-1 my-3 flex items-center gap-3 overflow-x-auto border px-4 py-2.5 font-mono text-sm"
>
	<Terminal size={14} class="text-text-primary shrink-0" />
	<code class="text-text-primary flex-1">{command}</code>
	<button
		onclick={copyCommand}
		class="rounded-md text-text-primary hover:bg-surface-1 hover:text-text-primary shrink-0 p-1 opacity-0 transition-opacity group-hover:opacity-100"
		aria-label="Copy command"
	>
		{#if copied}
			<Check size={14} />
		{:else}
			<Copy size={14} />
		{/if}
	</button>
</div>
