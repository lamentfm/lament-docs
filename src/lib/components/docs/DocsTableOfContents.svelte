<script lang="ts">
	import type { TocItem } from '$lib/types/docs';
	import { page } from '$app/state';
	import { tick } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';

	let {
		items: propItems = []
	}: {
		items?: TocItem[];
	} = $props();

	let domItems = $state<TocItem[]>([]);
	let items = $derived(propItems.length > 0 ? propItems : domItems);

	let activeId = $state('');
	let intersectingIds = new SvelteSet<string>();
	let isClickScrolling = false;
	let clickScrollTimeout: ReturnType<typeof setTimeout>;

	$effect(() => {
		// Track pathname dependency so TOC resets & re-scans on every page navigation
		const currentPath = page.url.pathname;
		if (typeof window === 'undefined') return;

		let observer: IntersectionObserver | null = null;
		let rafId: number;

		tick().then(() => {
			intersectingIds.clear();
			activeId = '';

			const headings = Array.from(
				document.querySelectorAll('article h2[id], article h3[id]')
			) as HTMLElement[];

			if (propItems.length === 0) {
				domItems = headings.map((h) => ({
					id: h.id,
					text: h.textContent?.replace(/^#\s*/, '') ?? '',
					level: parseInt(h.tagName[1])
				}));
			}

			if (headings.length === 0) return;

			const updateActiveHeading = () => {
				if (isClickScrolling) return;

				const scrollY = window.scrollY;
				const headerOffset = 100;

				let currentActive = headings[0]?.id || '';
				for (const heading of headings) {
					const top = heading.getBoundingClientRect().top + scrollY;
					if (scrollY >= top - headerOffset) {
						currentActive = heading.id;
					} else {
						break;
					}
				}
				if (currentActive) activeId = currentActive;
			};

			observer = new IntersectionObserver(
				(entries) => {
					if (isClickScrolling) return;
					for (const entry of entries) {
						if (entry.isIntersecting) {
							intersectingIds.add(entry.target.id);
						} else {
							intersectingIds.delete(entry.target.id);
						}
					}

					if (intersectingIds.size > 0) {
						for (const item of items) {
							if (intersectingIds.has(item.id)) {
								activeId = item.id;
								break;
							}
						}
					} else {
						updateActiveHeading();
					}
				},
				{ rootMargin: '-80px 0px -50% 0px' }
			);

			headings.forEach((h) => observer?.observe(h));
			updateActiveHeading();

			const handleScroll = () => {
				if (!isClickScrolling) {
					cancelAnimationFrame(rafId);
					rafId = requestAnimationFrame(updateActiveHeading);
				}
			};

			window.addEventListener('scroll', handleScroll, { passive: true });
		});

		return () => {
			if (observer) observer.disconnect();
			cancelAnimationFrame(rafId);
		};
	});

	function handleClick(id: string) {
		activeId = id;
		isClickScrolling = true;
		clearTimeout(clickScrollTimeout);
		clickScrollTimeout = setTimeout(() => {
			isClickScrolling = false;
		}, 800);
	}
</script>

{#if items.length > 0}
	<nav class="px-4 py-4" aria-label="On this page">
		<h4
			class="mb-3 text-sm font-semibold tracking-wider text-text-primary uppercase"
		>
			On this page
		</h4>
		<ul class="space-y-1">
			{#each items as item (item.id)}
				<li>
					<a
						href="#{item.id}"
						onclick={() => handleClick(item.id)}
						class="block text-sm leading-snug transition-colors hover:underline hover:underline-offset-2 {item.level ===
						3
							? 'pl-3'
							: ''} {activeId === item.id
							? 'font-medium text-accent'
							: 'text-text-muted hover:text-text-secondary'}"
					>
						{item.text}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}
