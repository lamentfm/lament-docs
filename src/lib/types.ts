import type { Component } from 'svelte';

export type MDFormatter = Record<string, unknown>;

export type MDModule = {
	default: Component;
	metadata?: MDFormatter;
};

export type ChangeLogItem = {
	version: string;
	component: Component;
	metadata?: MDFormatter;
};
