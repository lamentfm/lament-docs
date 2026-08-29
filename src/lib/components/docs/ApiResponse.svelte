<script lang="ts">
	import { Copy, Check } from 'lucide-svelte';

	let {
		status = 200,
		body
	}: {
		status?: number;
		body: string;
	} = $props();

	let copied = $state(false);

	const statusColor = $derived(
		status >= 200 && status < 300 ? 'text-text-primary' : status >= 400 ? 'text-text-primary' : 'text-text-primary'
	);

	function copyBody() {
		navigator.clipboard.writeText(body);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<div class="my-4">
	<div class="flex items-center justify-between">
		<h4 class="text-text-primary mb-2 text-sm font-semibold">Response</h4>
		<span class="{statusColor} font-mono text-xs font-bold">{status}</span>
	</div>
	<div class="group rounded-md border-surface-2 bg-surface-1 relative overflow-hidden border">
		<pre class="text-text-primary overflow-x-auto p-4 font-mono text-xs leading-relaxed">{body}</pre>
		<button
			onclick={copyBody}
			class="rounded-md bg-surface-1 text-text-primary hover:text-text-primary absolute top-2 right-2 p-1.5 opacity-0 transition-opacity group-hover:opacity-100"
			aria-label="Copy response"
		>
			{#if copied}
				<Check size={12} />
			{:else}
				<Copy size={12} />
			{/if}
		</button>
	</div>
</div>
