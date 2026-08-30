<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { Code, Copy, Check } from 'lucide-svelte';
	import DocsPrevNext from '$lib/components/docs/DocsPrevNext.svelte';
	import DocsTableOfContents from '$lib/components/docs/DocsTableOfContents.svelte';
	import ApiMethod from '$lib/components/docs/ApiMethod.svelte';
	import { copyCodeBlocks } from '$lib/actions/copyCodeBlocks';
	import { renderMermaid } from '$lib/actions/renderMermaid';
	import { renderCallouts } from '$lib/actions/renderCallouts';

	let { data }: { data: PageData } = $props();
	let ContentComponent = $derived(data.component);

	let copied = $state(false);

	function isActive(slug: string): boolean {
		return page.url.pathname === `/api/${slug}`;
	}

	async function copyEndpoint() {
		if (!data.frontmatter.endpoint) return;
		try {
			await navigator.clipboard.writeText(data.frontmatter.endpoint);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch (err) {
			console.error('Failed to copy', err);
		}
	}
</script>

<svelte:head>
	<title>{data.frontmatter.title} - Lament API</title>
	{#if data.frontmatter.description}
		<meta name="description" content={data.frontmatter.description} />
	{/if}
</svelte:head>

<div class="api-container relative mx-auto flex w-full max-w-360 flex-col items-start md:flex-row">
	<!-- Sidebar -->
	<aside
		class="api-sidebar sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-surface-2 md:block"
	>
		<nav class="px-3 py-4" aria-label="API navigation">
			<h4 class="mb-3 px-2 text-sm font-semibold tracking-wider text-text-primary uppercase">
				API Reference
			</h4>
			<ul class="space-y-0.5">
				{#each data.allPages as apiPage (apiPage.slug)}
					<li>
						<a
							href={resolve(`/api/${apiPage.slug}`)}
							class="flex items-center gap-2 rounded-sm px-3 py-1.5 text-sm transition-colors {isActive(
								apiPage.slug
							)
								? 'bg-accent-glow font-medium text-accent'
								: 'text-text-secondary hover:bg-surface-1 hover:text-text-primary'}"
							aria-current={isActive(apiPage.slug) ? 'page' : undefined}
						>
							{#if apiPage.frontmatter.method}
								<ApiMethod method={apiPage.frontmatter.method} />
							{:else}
								<Code size={14} class="shrink-0 text-text-muted" />
							{/if}
							{apiPage.frontmatter.title}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</aside>

	<!-- Main content -->
	<div class="min-w-0 flex-1 px-6 py-8 lg:px-10">
		<div class="mx-auto max-w-3xl">
			<header class="mb-8">
				<div class="flex items-center gap-3">
					{#if data.frontmatter.method && data.frontmatter.endpoint}
						<ApiMethod method={data.frontmatter.method} />
						<code class="text-sm font-medium text-text-primary">{data.frontmatter.endpoint}</code>
						<button
							class="ml-auto flex items-center justify-center rounded-sm p-1.5 text-text-muted transition-colors hover:bg-surface-2 hover:text-text-primary"
							onclick={copyEndpoint}
							aria-label="Copy endpoint"
							title="Copy endpoint"
						>
							{#if copied}
								<Check size={14} class="text-emerald-500" />
							{:else}
								<Copy size={14} />
							{/if}
						</button>
					{/if}
				</div>
				<h1 class="mt-3 text-2xl font-semibold tracking-tight text-text-primary">
					{data.frontmatter.title}
				</h1>
				{#if data.frontmatter.description}
					<p class="mt-2 text-sm leading-relaxed text-text-secondary">
						{data.frontmatter.description}
					</p>
				{/if}
				{#if data.frontmatter.auth}
					<div
						class="mt-3 inline-flex items-center gap-1.5 rounded-sm bg-surface-1 px-2.5 py-1 text-xs text-secondary"
					>
						<span>🔒</span> Requires authentication
					</div>
				{/if}
			</header>

			<article
				class="prose prose-sm max-w-none md:prose-base dark:prose-invert prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-accent hover:prose-a:text-accent-hover prose-blockquote:border-surface-3 prose-blockquote:text-text-muted prose-strong:text-text-primary prose-code:text-accent prose-code:before:content-none prose-code:after:content-none prose-pre:border-surface-2 prose-pre:bg-surface-1 prose-pre:text-[15px] prose-pre:leading-relaxed prose-li:text-text-secondary prose-th:text-text-primary prose-td:text-text-secondary"
			>
				{#if ContentComponent}
					<ContentComponent />
				{/if}
			</article>

			<DocsPrevNext prev={data.prev} next={data.next} />
		</div>
	</div>

	<!-- Right Sidebar (Table of Contents) -->
	<aside
		class="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-l border-surface-2 xl:block"
	>
		<DocsTableOfContents />
	</aside>
</div>
