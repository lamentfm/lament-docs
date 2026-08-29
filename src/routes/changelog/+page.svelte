<script lang="ts">
	import type { MDModule, ChangeLogItem } from '$lib/types/docs';

	const files = import.meta.glob('/content/changelog/*.{md,svx}', { eager: true }) as Record<
		string,
		MDModule
	>;

	const changelogs: ChangeLogItem[] = Object.entries(files).map(([filepath, mod]) => ({
		version: filepath.split('/').pop()?.replace(/\.(md|svx)$/, '') ?? '',
		component: mod.default,
		metadata: mod.metadata ?? {}
	}));

	let selectedVersion = $state(changelogs[0]?.version);

	let current = $derived(changelogs.find((c) => c.version === selectedVersion));
</script>

<div class="mx-auto max-w-4xl px-4 py-8">
	<div class="mb-8 flex items-center justify-between border-b border-surface-2 pb-6">
		<h1 class="text-3xl font-bold tracking-tight text-text-primary">Changelog</h1>

		<div class="flex items-center gap-2">
			<label for="version-select" class="text-sm font-medium text-text-secondary">Version:</label>
			<select
				id="version-select"
				bind:value={selectedVersion}
				class="rounded-md border border-surface-2 bg-surface-1 px-3 py-2 text-sm font-semibold text-text-primary shadow-sm focus:border-surface-3 focus:ring-1 focus:ring-surface-3 focus:outline-none"
			>
				{#each changelogs as item (item.version)}
					<option value={item.version} class="bg-surface-1 text-text-primary">{item.version}</option>
				{/each}
			</select>
		</div>
	</div>

	{#if current}
		{@const ActiveContent = current.component}
		<article class="prose prose-sm md:prose-base max-w-none dark:prose-invert prose-headings:text-text-primary prose-a:text-accent hover:prose-a:text-accent-hover prose-p:text-text-secondary prose-strong:text-text-primary prose-code:text-accent prose-li:text-text-secondary prose-blockquote:text-text-muted prose-blockquote:border-surface-3 prose-pre:bg-surface-1 prose-pre:border-surface-2 prose-pre:text-[15px] prose-pre:leading-relaxed prose-th:text-text-primary prose-td:text-text-secondary">
			<ActiveContent />
		</article>
	{:else}
		<p class="text-text-muted">Tidak ada log untuk versi ini.</p>
	{/if}
</div>
