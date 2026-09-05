import type { ApiDocPage, ApiSection, MDModule, ApiEndpointFrontmatter } from '$lib/types/docs';

const SECTION_ORDER: Record<string, number> = {
	overview: 0,
	authentication: 1,
	tracks: 2,
	artists: 3,
	albums: 4,
	search: 5,
	lyrics: 6,
	streaming: 7,
	playlists: 8,
	categories: 9,
	requests: 10,
	sync: 11
};

function slugToTitle(slug: string): string {
	return slug
		.split('-')
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(' ');
}

function parseFrontmatter(raw: unknown): Partial<ApiEndpointFrontmatter> {
	if (!raw) return {};
	const rawString = typeof raw === 'string' ? raw : (raw as { default?: string })?.default;
	if (typeof rawString !== 'string') return {};

	try {
		const match = rawString.match(/^---\r?\n([\s\S]*?)\r?\n---/);
		if (!match) return {};
		const fm = match[1];
		const data: Record<string, unknown> = {};
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
		return data as Partial<ApiEndpointFrontmatter>;
	} catch (err) {
		console.error('Failed to parse api frontmatter', err);
		return {};
	}
}

let cachedApiPages: ApiDocPage[] | null = null;

function parseApiModules(): ApiDocPage[] {
	if (cachedApiPages) return cachedApiPages;

	const modules = import.meta.glob('/content/api/**/*.{md,svx}', {
		eager: true,
		query: '?raw',
		import: 'default'
	}) as Record<string, string>;

	const pages: ApiDocPage[] = [];

	for (const [filepath, rawContent] of Object.entries(modules)) {
		const filepathClean = filepath.replace('?raw', '');
		const relative = filepathClean.replace('/content/api/', '').replace(/\.(md|svx)$/, '');
		const slug = relative;
		const metadata = parseFrontmatter(rawContent);

		const frontmatter: ApiEndpointFrontmatter = {
			title: metadata.title ?? slugToTitle(slug),
			description: metadata.description,
			section: metadata.section ?? slugToTitle(slug),
			order: metadata.order ?? SECTION_ORDER[slug] ?? 99,
			method: metadata.method,
			endpoint: metadata.endpoint,
			auth: metadata.auth
		};

		pages.push({
			slug,
			path: filepathClean,
			frontmatter
		});
	}

	pages.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
	cachedApiPages = pages;
	return pages;
}

export function getAllApiPages(): ApiDocPage[] {
	return parseApiModules();
}

export function getApiBySlug(slug: string): ApiDocPage | undefined {
	return getAllApiPages().find((p) => p.slug === slug);
}

export function getApiSections(): ApiSection[] {
	const pages = getAllApiPages();

	return pages.map((page) => ({
		title: page.frontmatter.title,
		slug: page.slug,
		order: page.frontmatter.order,
		pages: [page]
	}));
}

export function getApiNavigation(currentSlug: string) {
	const allPages = getAllApiPages();
	const idx = allPages.findIndex((p) => p.slug === currentSlug);

	return {
		prev: idx > 0 ? allPages[idx - 1] : undefined,
		next: idx < allPages.length - 1 ? allPages[idx + 1] : undefined
	};
}

export function getFirstApiSlug(): string {
	const pages = getAllApiPages();
	return pages.length > 0 ? pages[0].slug : 'overview';
}

const apiComponentModules = import.meta.glob('/content/api/**/*.{md,svx}', { eager: true }) as Record<string, MDModule>;

export function getApiComponent(slug: string) {
	const page = getApiBySlug(slug);
	if (!page) return null;
	const loaderKey = Object.keys(apiComponentModules).find((k) => k.includes(page.slug));
	const mod = loaderKey ? apiComponentModules[loaderKey] : null;
	return mod ? mod.default : null;
}
