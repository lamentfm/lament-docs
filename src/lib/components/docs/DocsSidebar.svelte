<script lang="ts">
	import { page } from '$app/state';
	import type { DocSection } from '$lib/types/docs';
	import { resolve } from '$app/paths';

	let {
		sections
	}: {
		sections: DocSection[];
	} = $props();

	function isActive(slug: string): boolean {
		return page.url.pathname === `/docs/${slug}`;
	}
</script>

<nav class="px-3 py-4" aria-label="Documentation navigation">
	{#each sections as section (section.slug)}
		<div class="mb-6">
			<h4
				class="mb-2 px-3 text-sm font-bold tracking-wider text-text-primary uppercase"
			>
				{section.title}
			</h4>

			<ul class="space-y-0.5">
				{#each section.pages as docPage (docPage.slug)}
					<li>
						<a
							href={resolve(`/docs/${docPage.slug}` as "/")}
							class="block rounded-sm px-3 py-1.5 text-sm transition-colors {isActive(
								docPage.slug
							)
								? 'bg-accent-glow font-medium text-accent'
								: 'text-text-secondary hover:bg-surface-1 hover:text-text-primary'}"
							aria-current={isActive(docPage.slug) ? 'page' : undefined}
						>
							{docPage.frontmatter.title}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</nav>
