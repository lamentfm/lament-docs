<script lang="ts">
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';
	import type { DocPage, ApiDocPage } from '$lib/types/docs';

	let {
		prev,
		next
	}: {
		prev?: DocPage | ApiDocPage;
		next?: DocPage | ApiDocPage;
	} = $props();

	function getHref(page: DocPage | ApiDocPage): string {
		// Check if it has 'category' field (DocPage) or not (ApiDocPage)
		if ('category' in page) {
			return `/docs/${page.slug}`;
		}
		return `/api/${page.slug}`;
	}
</script>

{#if prev || next}
	<div class="border-surface-2 mt-12 flex items-stretch gap-4 border-t pt-6">
		{#if prev}
			<a
				href={getHref(prev)}
				class="group rounded-md border-surface-2 hover:border-surface-2 hover:bg-surface-1 flex flex-1 flex-col border px-4 py-3 transition-colors"
			>
				<span class="text-text-primary mb-1 flex items-center gap-1 text-xs">
					<ArrowLeft size={12} />
					Previous
				</span>
				<span class="text-text-primary group-hover:text-text-primary text-sm font-medium">
					{prev.frontmatter.title}
				</span>
			</a>
		{:else}
			<div class="flex-1"></div>
		{/if}

		{#if next}
			<a
				href={getHref(next)}
				class="group rounded-md border-surface-2 hover:border-surface-2 hover:bg-surface-1 flex flex-1 flex-col items-end border px-4 py-3 transition-colors"
			>
				<span class="text-text-primary mb-1 flex items-center gap-1 text-xs">
					Next
					<ArrowRight size={12} />
				</span>
				<span class="text-text-primary group-hover:text-text-primary text-sm font-medium">
					{next.frontmatter.title}
				</span>
			</a>
		{:else}
			<div class="flex-1"></div>
		{/if}
	</div>
{/if}
