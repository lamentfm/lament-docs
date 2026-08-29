import { redirect } from '@sveltejs/kit';
import { getFirstApiSlug } from '$lib/content/api';

export function load() {
	throw redirect(307, `/api/${getFirstApiSlug()}`);
}
