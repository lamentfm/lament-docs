import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getApiBySlug, getAllApiPages, getApiNavigation, getApiComponent, getFirstApiSlug } from '$lib/content/api';

export const load: PageLoad = async ({ params }) => {
	const { slug } = params;

	if (!slug) {
		throw redirect(302, `/api/${getFirstApiSlug()}`);
	}

	const doc = getApiBySlug(slug);

	if (!doc) {
		throw error(404, `API documentation "${slug}" not found`);
	}

	const allPages = getAllApiPages();
	const { prev, next } = getApiNavigation(slug);

	const component = await getApiComponent(slug);

	return {
		component,
		frontmatter: doc.frontmatter,
		slug: doc.slug,
		allPages,
		prev,
		next
	};
};
