import type { Component } from 'svelte';

export type MDFormatter = Record<string, unknown>;

export type MDModule = {
	default: Component;
	metadata?: MDFormatter;
};

export type ChangeLogItem = {
	version: string;
	date?: string;
	component?: Component;
	metadata?: MDFormatter;
};

export type DocFrontmatter = {
	title: string;
	description?: string;
	section: string;
	order: number;
	draft?: boolean;
};

export type DocPage = {
	slug: string;
	path: string;
	category: string;
	frontmatter: DocFrontmatter;
};

export type DocSection = {
	title: string;
	slug: string;
	order: number;
	pages: DocPage[];
};

export type ApiEndpointFrontmatter = {
	title: string;
	description?: string;
	section: string;
	order: number;
	method?: string;
	endpoint?: string;
	auth?: boolean;
	draft?: boolean;
};

export type ApiDocPage = {
	slug: string;
	path: string;
	frontmatter: ApiEndpointFrontmatter;
};

export type ApiSection = {
	title: string;
	slug: string;
	order: number;
	pages: ApiDocPage[];
};

export type TocItem = {
	id: string;
	text: string;
	level: number;
};

export type SearchItem = {
	href: string;
	title: string;
	description?: string;
	section: string;
	slug: string;
	type: 'doc' | 'api';
};
