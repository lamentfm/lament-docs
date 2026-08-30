import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getDocBySlug, getDocComponent, getDocSections, getDocNavigation, getFirstDocSlug } from '$lib/content/docs';

export const load: PageLoad = async ({ params }) => {
	const { slug } = params;

	if (!slug) {
		throw redirect(302, `/docs/${getFirstDocSlug()}`);
	}

	const doc = getDocBySlug(slug);

	if (!doc) {
		throw error(404, `Documentation page "${slug}" not found`);
	}

	const component = getDocComponent(slug);
	const sections = getDocSections();
	const { prev, next } = getDocNavigation(slug);

	return {
		component,
		frontmatter: doc.frontmatter,
		slug: doc.slug,
		category: doc.category,
		sections,
		prev,
		next
	};
};
