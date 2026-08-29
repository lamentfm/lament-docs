<script lang="ts">
	import './layout.css';
	import '@fontsource/space-grotesk/400.css';
	import '@fontsource/space-grotesk/500.css';
	import '@fontsource/space-grotesk/600.css';
	import '@fontsource/space-grotesk/700.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/500.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/700.css';
	// import favicon from '../../static/favicon.ico';

	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	let { children } = $props();

	const hideHeadrerRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];

	let shouldHidderHeader = $derived(hideHeadrerRoutes.includes(page.url.pathname));
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" />
</svelte:head>

{#if !shouldHidderHeader}
	<Header />
{/if}

<main>
	{@render children()}
</main>

{#if page.url.pathname === '/'}
	<Footer />
{/if}
