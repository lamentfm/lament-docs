<script lang="ts">
	import { X } from 'lucide-svelte';
	import { page } from '$app/state';

	let {
		open = false,
		onclose
	}: {
		open?: boolean;
		onclose?: () => void;
	} = $props();

	const navItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Docs', href: '/docs' },
		{ label: 'API', href: '/api' },
		{ label: 'GitHub', href: 'https://github.com/lamentfm', external: true }
	];

	function isActive(href: string): boolean {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}

	function handleNavigate() {
		onclose?.();
	}
</script>

{#if open}
	<!-- Backdrop -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
		onclick={onclose}
		onkeydown={(e) => e.key === 'Escape' && onclose?.()}
	></div>

	<!-- Drawer -->
	<nav
		class="border-surface-2 bg-surface-1 fixed inset-y-0 left-0 z-50 w-72 border-r p-4 md:hidden"
		aria-label="Mobile navigation"
	>
		<div class="mb-6 flex items-center justify-between">
			<span class="text-text-primary text-sm font-semibold">Navigation</span>
			<button
				onclick={onclose}
				class="rounded-md text-text-primary hover:text-text-primary p-1"
				aria-label="Close navigation"
			>
				<X size={18} />
			</button>
		</div>

		<ul class="space-y-1">
			{#each navItems as item (item.label)}
				<li>
					<a
						href={item.href}
						target={item.external ? '_blank' : undefined}
						rel={item.external ? 'noopener noreferrer' : undefined}
						onclick={handleNavigate}
						class="rounded-md block px-3 py-2 text-sm transition-colors {isActive(item.href)
							? 'bg-surface-1 text-text-primary font-medium'
							: 'text-text-primary hover:bg-surface-1 hover:text-text-primary'}"
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}
