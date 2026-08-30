<script lang="ts">
	import type { MDModule, ChangeLogItem } from '$lib/types/docs';
	import { ChevronDown, Check } from 'lucide-svelte';

	const files = import.meta.glob('/content/changelog/*.{md,svx}', { eager: true }) as Record<
		string,
		MDModule
	>;

	const changelogs: ChangeLogItem[] = Object.entries(files).map(([filepath, mod]) => ({
		version:
			filepath
				.split('/')
				.pop()
				?.replace(/\.(md|svx)$/, '') ?? '',
		component: mod.default,
		metadata: mod.metadata ?? {}
	}));

	let selectedVersion = $state(changelogs[0]?.version);
	let current = $derived(changelogs.find((c) => c.version === selectedVersion));
	let isOpen = $state(false);

	function clickOutside(node: HTMLElement) {
		const handleClick = (event: MouseEvent) => {
			if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
				isOpen = false;
			}
		};
		document.addEventListener('click', handleClick, true);
		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}
</script>

<svelte:head>
	<title>Changelog - Lament</title>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-8">
	<div class="mb-8 flex items-center justify-between border-b border-surface-2 pb-6">
		<h1 class="text-3xl font-bold tracking-tight text-text-primary">Changelog</h1>

		<div class="flex items-center gap-3">
			<span class="text-sm font-medium text-text-secondary">Version:</span>

			<div class="relative" use:clickOutside>
				<!-- Dropdown trigger -->
				<button
					onclick={() => (isOpen = !isOpen)}
					class="flex items-center gap-2 rounded-lg border border-surface-2 bg-surface-1 px-4 py-2 text-sm font-semibold text-text-primary shadow-sm transition-colors hover:bg-surface-2 focus:border-surface-3 focus:ring-1 focus:ring-surface-3 focus:outline-none"
				>
					{selectedVersion}
					<ChevronDown
						size={16}
						class="text-text-muted transition-transform duration-200 {isOpen ? 'rotate-180' : ''}"
					/>
				</button>

				<!-- Dropdown menu -->
				{#if isOpen}
					<div
						class="absolute top-full right-0 z-50 mt-2 w-40 origin-top-right rounded-xl border border-surface-2 bg-surface-0 p-1.5 shadow-xl ring-1 ring-black/5"
					>
						<div class="scrollbar-hidden flex max-h-60 flex-col gap-0.5 overflow-y-auto">
							{#each changelogs as item (item.version)}
								<button
									onclick={() => {
										selectedVersion = item.version;
										isOpen = false;
									}}
									class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-surface-2 {selectedVersion ===
									item.version
										? 'bg-surface-2 font-medium text-accent'
										: 'text-text-primary'}"
								>
									{item.version}
									{#if selectedVersion === item.version}
										<Check size={14} class="text-accent" />
									{/if}
								</button>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>

	{#if current}
		{@const ActiveContent = current.component}
		<article
			class="prose prose-sm max-w-none md:prose-base dark:prose-invert prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-accent hover:prose-a:text-accent-hover prose-blockquote:border-surface-3 prose-blockquote:text-text-muted prose-strong:text-text-primary prose-code:text-accent prose-pre:border-surface-2 prose-pre:bg-surface-1 prose-pre:text-[15px] prose-pre:leading-relaxed prose-li:text-text-secondary prose-th:text-text-primary prose-td:text-text-secondary"
		>
			<ActiveContent />
		</article>
	{:else}
		<p class="text-text-muted">Tidak ada log untuk versi ini.</p>
	{/if}
</div>
