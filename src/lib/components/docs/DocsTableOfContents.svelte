<script lang="ts">
	import type { TocItem } from '$lib/types/docs';

	let {
		items: propItems = []
	}: {
		items?: TocItem[];
	} = $props();

	let domItems = $state<TocItem[]>([]);
	let items = $derived(propItems.length > 0 ? propItems : domItems);

	let activeId = $state('');
	let intersectingIds = new Set<string>();
	let isClickScrolling = false;
	let clickScrollTimeout: ReturnType<typeof setTimeout>;

	$effect(() => {
		if (typeof window === 'undefined') return;

		const headings = document.querySelectorAll('article h2[id], article h3[id]');
		
		if (propItems.length === 0) {
			domItems = Array.from(headings).map(h => ({
				id: h.id,
				text: h.textContent?.replace(/^#\s*/, '') ?? '',
				level: parseInt(h.tagName[1])
			}));
		}

		if (items.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						intersectingIds.add(entry.target.id);
					} else {
						intersectingIds.delete(entry.target.id);
					}
				}

				if (isClickScrolling) return;

				if (intersectingIds.size > 0) {
					for (const item of items) {
						if (intersectingIds.has(item.id)) {
							activeId = item.id;
							break;
						}
					}
				}
			},
			{ rootMargin: '0px 0px -80% 0px' }
		);

		headings.forEach((h) => observer.observe(h));

		return () => observer.disconnect();
	});

	function handleClick(id: string) {
		activeId = id;
		isClickScrolling = true;
		clearTimeout(clickScrollTimeout);
		clickScrollTimeout = setTimeout(() => {
			isClickScrolling = false;
		}, 1000);
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
