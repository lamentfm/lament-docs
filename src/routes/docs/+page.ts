import { redirect } from '@sveltejs/kit';
import { getFirstDocSlug } from '$lib/content/docs';

export function load() {
	throw redirect(307, `/docs/${getFirstDocSlug()}`);
}
