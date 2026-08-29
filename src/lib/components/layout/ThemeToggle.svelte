<script lang="ts">
	import { Sun, Moon } from 'lucide-svelte';

	let theme = $state<'dark' | 'light'>('dark');

	$effect(() => {
		if (typeof window === 'undefined') return;
		const stored = localStorage.getItem('theme');
		if (stored === 'light' || stored === 'dark') {
			theme = stored;
		} else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
			theme = 'light';
		}
	});

	function toggle() {
		theme = theme === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}
</script>

<button
	onclick={toggle}
	class="rounded-md text-text-primary hover:bg-surface-1 hover:text-text-primary flex items-center justify-center p-1.5 transition-colors"
	aria-label="Toggle theme"
	title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
>
	{#if theme === 'dark'}
		<Sun size={16} />
	{:else}
		<Moon size={16} />
	{/if}
</button>
