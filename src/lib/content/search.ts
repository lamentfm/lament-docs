import type { SearchItem } from '$lib/types/docs';
import { getAllDocPages } from './docs';
import { getAllApiPages } from './api';

export function buildSearchIndex(): SearchItem[] {
	const items: SearchItem[] = [];

	const docPages = getAllDocPages();
	for (const page of docPages) {
		items.push({
			title: page.frontmatter.title,
			description: page.frontmatter.description,
			section: page.frontmatter.section,
			slug: page.slug,
			type: 'doc',
			href: `/docs/${page.slug}`
		});
	}

	const apiPages = getAllApiPages();
	for (const page of apiPages) {
		items.push({
			title: page.frontmatter.title,
			description: page.frontmatter.description,
			section: page.frontmatter.section,
			slug: page.slug,
			type: 'api',
			href: `/api/${page.slug}`
		});
	}

	return items;
}

export function searchContent(query: string, items: SearchItem[]): SearchItem[] {
	if (!query.trim()) return [];

	const q = query.toLowerCase().trim();
	const words = q.split(/\s+/);

	return items
		.map((item) => {
			const haystack = [item.title, item.description ?? '', item.section].join(' ').toLowerCase();

			let score = 0;
			for (const word of words) {
				if (item.title.toLowerCase().includes(word)) score += 10;
				if (item.description?.toLowerCase().includes(word)) score += 5;
				if (item.section.toLowerCase().includes(word)) score += 3;
			}

			// Exact title match bonus
			if (item.title.toLowerCase() === q) score += 50;
			if (item.title.toLowerCase().startsWith(q)) score += 20;

			return { item, score, matches: words.every((w) => haystack.includes(w)) };
		})
		.filter((r) => r.matches && r.score > 0)
		.sort((a, b) => b.score - a.score)
		.map((r) => r.item);
}
