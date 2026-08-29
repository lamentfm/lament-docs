<script lang="ts">
	import { Copy, Check } from 'lucide-svelte';

	let {
		lang = '',
		filename,
		children
	}: {
		lang?: string;
		filename?: string;
		children?: import('svelte').Snippet;
	} = $props();

	let copied = $state(false);
	let codeEl: HTMLElement | undefined = $state();

	function copyCode() {
		if (!codeEl) return;
		const code = codeEl.querySelector('code')?.textContent ?? codeEl.textContent ?? '';
		navigator.clipboard.writeText(code.trim());
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<div class="group rounded-md border-surface-2 bg-surface-1 relative my-4 overflow-hidden border">
	{#if lang || filename}
		<div class="border-surface-2 flex items-center justify-between border-b px-4 py-1.5">
			<span class="text-text-primary text-xs font-medium">
				{filename ?? lang}
			</span>
			<button
				onclick={copyCode}
				class="rounded-md text-text-primary hover:bg-surface-1 hover:text-text-primary flex items-center gap-1 px-2 py-1 text-xs opacity-0 transition-opacity group-hover:opacity-100"
				aria-label="Copy code"
			>
				{#if copied}
					<Check size={12} />
					<span>Copied</span>
				{:else}
					<Copy size={12} />
					<span>Copy</span>
				{/if}
			</button>
		</div>
	{/if}
	<div class="overflow-x-auto" bind:this={codeEl}>
		{#if children}
			{@render children()}
		{/if}
	</div>
	{#if !lang && !filename}
		<button
			onclick={copyCode}
			class="rounded-md bg-surface-1 text-text-primary hover:text-text-primary absolute top-2 right-2 flex items-center gap-1 px-2 py-1 text-xs opacity-0 transition-opacity group-hover:opacity-100"
			aria-label="Copy code"
		>
			{#if copied}
				<Check size={12} />
			{:else}
				<Copy size={12} />
			{/if}
		</button>
	{/if}
</div>
