import type { DocPage, DocSection, MDModule, DocFrontmatter, MDFormatter } from '$lib/types/docs';

const SECTION_ORDER: Record<string, number> = {
	'getting-started': 1,
	architecture: 2,
	development: 3,
	infrastructure: 4,
	scraper: 5,
	media: 6,
	security: 7,
	operations: 8
};

const SECTION_LABELS: Record<string, string> = {
	'getting-started': 'Getting Started',
	architecture: 'Architecture',
	development: 'Development',
	infrastructure: 'Infrastructure',
	scraper: 'Scraper',
	media: 'Media',
	security: 'Security',
	operations: 'Operations'
};

function slugToTitle(slug: string): string {
	return slug
		.split('-')
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(' ');
}

function parseFrontmatter(raw: any): Partial<DocFrontmatter> {
	if (!raw) return {};
	const rawString = typeof raw === 'string' ? raw : raw.default;
	if (typeof rawString !== 'string') return {};

	try {
		const match = rawString.match(/^---\r?\n([\s\S]*?)\r?\n---/);
		if (!match) return {};
		const fm = match[1];
		const data: Record<string, any> = {};
		for (const line of fm.split('\n')) {
			const colonIdx = line.indexOf(':');
			if (colonIdx > -1) {
				const key = line.slice(0, colonIdx).trim();
				let value = line.slice(colonIdx + 1).trim();
				if (
					(value.startsWith('"') && value.endsWith('"')) ||
					(value.startsWith("'") && value.endsWith("'"))
				) {
					value = value.substring(1, value.length - 1);
				}
				if (value === 'true') data[key] = true;
				else if (value === 'false') data[key] = false;
				else if (!isNaN(Number(value)) && value !== '') data[key] = Number(value);
				else data[key] = value;
			}
		}
		return data as Partial<DocFrontmatter>;
	} catch (err) {
		console.error('Failed to parse frontmatter', err);
		return {};
	}
}

function parseDocModules(): DocPage[] {
	const modules = import.meta.glob('/content/docs/**/*.{md,svx}', {
		eager: true,
		query: '?raw',
		import: 'default'
	}) as Record<string, string>;

	const pages: DocPage[] = [];

	for (const [filepath, rawContent] of Object.entries(modules)) {
		const filepathClean = filepath.replace('?raw', '');
		// filepath: /content/docs/getting-started/installation.md or .svx
		const relative = filepathClean.replace('/content/docs/', '').replace(/\.(md|svx)$/, '');
		const parts = relative.split('/');

		if (parts.length < 2) continue; // skip flat files without category

		const category = parts[0];
		const slug = relative; // e.g. "getting-started/installation"
		const metadata = parseFrontmatter(rawContent);

		if (metadata.draft) continue;

		const frontmatter: DocFrontmatter = {
			title: metadata.title ?? slugToTitle(parts[parts.length - 1]),
			description: metadata.description,
			section: metadata.section ?? SECTION_LABELS[category] ?? slugToTitle(category),
			order: metadata.order ?? 99
		};

		pages.push({
			slug,
			path: filepathClean,
			category,
			frontmatter
		});
	}

	return pages;
}

export function getDocSections(): DocSection[] {
	const pages = parseDocModules();
	const sectionMap = new Map<string, DocSection>();

	for (const page of pages) {
		if (!sectionMap.has(page.category)) {
			sectionMap.set(page.category, {
				title: page.frontmatter.section,
				slug: page.category,
				order: SECTION_ORDER[page.category] ?? 99,
				pages: []
			});
		}
		sectionMap.get(page.category)!.pages.push(page);
	}

	const sections = Array.from(sectionMap.values());
	sections.sort((a, b) => a.order - b.order);
	for (const section of sections) {
		section.pages.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
	}

	return sections;
}

export function getAllDocPages(): DocPage[] {
	const sections = getDocSections();
	return sections.flatMap((s) => s.pages);
}

export function getDocBySlug(slug: string): DocPage | undefined {
	return getAllDocPages().find((p) => p.slug === slug);
}

export function getDocNavigation(currentSlug: string) {
	const allPages = getAllDocPages();
	const idx = allPages.findIndex((p) => p.slug === currentSlug);

	return {
		prev: idx > 0 ? allPages[idx - 1] : undefined,
		next: idx < allPages.length - 1 ? allPages[idx + 1] : undefined
	};
}

export function getFirstDocSlug(): string {
	const pages = getAllDocPages();
	return pages.length > 0 ? pages[0].slug : 'getting-started/installation';
}

const docComponentModules = import.meta.glob('/content/docs/**/*.{md,svx}');

export async function getDocComponent(slug: string) {
	const page = getDocBySlug(slug);
	if (!page) return null;
	const loaderKey = Object.keys(docComponentModules).find(k => k.includes(page.slug));
	const loader = loaderKey ? docComponentModules[loaderKey] : null;
	if (!loader) return null;
	const mod = (await loader()) as MDModule;
	return mod.default;
}
