<script lang="ts">
	import { goto } from '$app/navigation';
	import { Search, FileText, Code, ArrowRight } from 'lucide-svelte';
	import { buildSearchIndex, searchContent } from '$lib/content/search';
	import type { SearchItem } from '$lib/types/docs';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	let open = $state(false);
	let query = $state('');
	let searchIndex = $state<SearchItem[]>([]);

	$effect(() => {
		searchIndex = buildSearchIndex();
	});

	let results = $derived(searchContent(query, searchIndex));
	let docResults = $derived(results.filter((r) => r.type === 'doc'));
	let apiResults = $derived(results.filter((r) => r.type === 'api'));

	// Keyboard shortcut
	$effect(() => {
		if (typeof window === 'undefined') return;

		function handleKeydown(e: KeyboardEvent) {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault();
				open = !open;
			}
			if (e.key === 'Escape' && open) {
				open = false;
			}
		}

		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});

	function navigate(href: string) {
		open = false;
		query = '';
		goto(href);
	}
</script>

<!-- Trigger button -->
<button
	onclick={() => (open = true)}
	class="flex items-center gap-2 rounded-sm border border-surface-2 bg-surface-1 py-1.5 pr-2 pl-4 text-sm text-text-muted transition-colors hover:border-surface-3 hover:text-text-secondary"
	aria-label="Search documentation"
>
	<Search size={14} />
	<span class="hidden sm:inline">Search docs...</span>
	<kbd
		class="ml-4 hidden rounded-[var(--radius-sm)] border border-surface-3 bg-surface-2 px-2 py-0.5 text-[10px] font-medium text-text-muted sm:inline"
	>
		⌘K
	</kbd>
</button>

<!-- Command Palette Dialog -->
<Dialog.Root bind:open>
	<Dialog.Content
		class="top-[20%] translate-y-0 overflow-hidden rounded-[var(--radius-lg)] !border-0 bg-surface-1 p-0 shadow-2xl !ring-0 sm:max-w-[540px]"
		aria-label="Search documentation"
		showCloseButton={false}
	>
		<Command.Root class="rounded-[var(--radius-lg)]" shouldFilter={false}>
			<Command.Input placeholder="Search documentation..." bind:value={query} />
			<Command.List class="max-h-[360px]">
				{#if query && results.length === 0}
					<Command.Empty>No results found for "{query}"</Command.Empty>
				{/if}

				{#if !query}
					<Command.Group heading="Quick links">
						<Command.Item onSelect={() => navigate('/docs')}>
							<FileText size={14} class="mr-2 text-text-muted" />
							<span>Documentation</span>
						</Command.Item>
						<Command.Item onSelect={() => navigate('/api')}>
							<Code size={14} class="mr-2 text-text-muted" />
							<span>API Reference</span>
						</Command.Item>
					</Command.Group>
				{/if}

				{#if docResults.length > 0}
					<Command.Group heading="Documentation">
						{#each docResults.slice(0, 8) as item (item.href)}
							<Command.Item onSelect={() => navigate(item.href)}>
								<FileText size={14} class="mr-2 shrink-0 text-text-muted" />
								<div class="flex flex-1 flex-col">
									<span class="text-sm">{item.title}</span>
									<span class="text-xs text-text-muted">{item.section}</span>
								</div>
								<ArrowRight size={12} class="shrink-0 text-text-muted" />
							</Command.Item>
						{/each}
					</Command.Group>
				{/if}

				{#if apiResults.length > 0}
					<Command.Group heading="API Reference">
						{#each apiResults.slice(0, 8) as item (item.href)}
							<Command.Item onSelect={() => navigate(item.href)}>
								<Code size={14} class="mr-2 shrink-0 text-text-muted" />
								<div class="flex flex-1 flex-col">
									<span class="text-sm">{item.title}</span>
									{#if item.description}
										<span class="text-xs text-text-muted">{item.description}</span>
									{/if}
								</div>
								<ArrowRight size={12} class="shrink-0 text-text-muted" />
							</Command.Item>
						{/each}
					</Command.Group>
				{/if}
			</Command.List>
		</Command.Root>
	</Dialog.Content>
</Dialog.Root>
