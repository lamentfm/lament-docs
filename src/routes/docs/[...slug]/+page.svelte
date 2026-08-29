<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import DocsPrevNext from '$lib/components/docs/DocsPrevNext.svelte';
	import DocsTableOfContents from '$lib/components/docs/DocsTableOfContents.svelte';
	import { copyCodeBlocks } from '$lib/actions/copyCodeBlocks';

	let { data }: { data: PageData } = $props();
	let ContentComponent = $derived(data.component);

	function isActive(slug: string): boolean {
		return page.url.pathname === `/docs/${slug}`;
	}
</script>

<svelte:head>
	<title>{data.frontmatter.title} — Lament Docs</title>
	{#if data.frontmatter.description}
		<meta name="description" content={data.frontmatter.description} />
	{/if}
</svelte:head>

<div class="api-container flex flex-col md:flex-row items-start relative w-full max-w-[90rem] mx-auto">
	<!-- Sidebar -->
	<aside class="api-sidebar hidden md:block sticky top-16 w-64 shrink-0 h-[calc(100vh-4rem)] overflow-y-auto border-r border-surface-2">
		<nav class="px-3 py-4" aria-label="Docs navigation">
			{#each data.sections as section (section.slug)}
				<div class="mb-6">
					<h4 class="mb-2 px-2 text-sm font-semibold tracking-wider text-text-primary uppercase">
						{section.title}
					</h4>
					<ul class="space-y-0.5">
						{#each section.pages as docPage (docPage.slug)}
							<li>
								<a
									href={resolve(`/docs/${docPage.slug}`)}
									class="flex items-center gap-2 rounded-[var(--radius-sm)] px-3 py-1.5 text-sm transition-colors {isActive(
										docPage.slug
									)
										? 'bg-[var(--color-accent-glow)] font-medium text-accent'
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
	</aside>

	<!-- Main content -->
	<div class="flex-1 min-w-0 px-6 py-8 lg:px-10">
		<div class="mx-auto max-w-3xl">
			<header class="mb-8">
				<div class="mb-3 flex items-center gap-2 text-sm text-text-muted">
					<span>{data.frontmatter.section}</span>
				</div>
				<h1 class="mt-2 text-3xl font-bold tracking-tight text-text-primary">
					{data.frontmatter.title}
				</h1>
				{#if data.frontmatter.description}
					<p class="mt-2 text-lg leading-relaxed text-text-secondary">
						{data.frontmatter.description}
					</p>
				{/if}
			</header>

			<article class="prose prose-sm md:prose-base max-w-none dark:prose-invert prose-headings:text-text-primary prose-a:text-accent hover:prose-a:text-accent-hover prose-p:text-text-secondary prose-strong:text-text-primary prose-code:text-accent prose-li:text-text-secondary prose-blockquote:text-text-muted prose-blockquote:border-surface-3 prose-pre:bg-surface-1 prose-pre:border-surface-2 prose-pre:text-[15px] prose-pre:leading-relaxed prose-th:text-text-primary prose-td:text-text-secondary" use:copyCodeBlocks>
				{#if ContentComponent}
					<ContentComponent />
				{/if}
			</article>

			<DocsPrevNext prev={data.prev} next={data.next} />
		</div>
	</div>

	<!-- Right Sidebar (Table of Contents) -->
	<aside class="hidden xl:block sticky top-16 w-64 shrink-0 h-[calc(100vh-4rem)] overflow-y-auto border-l border-surface-2">
		<DocsTableOfContents />
	</aside>
</div>
