<script lang="ts">
	import { page } from '$app/state';
	import { Menu } from 'lucide-svelte';
	import Logo from '$lib/components/ui/Logo.svelte';
	import ThemeToggle from '$lib/components/layout/ThemeToggle.svelte';
	import CommandPalette from '$lib/components/layout/CommandPalette.svelte';
	import MobileNav from '$lib/components/layout/MobileNav.svelte';
	import SystemStatus from '$lib/components/layout/SystemStatus.svelte';
	import type { NavItem } from '$lib/types/nav';
	// import { IconBrandGithub } from '@tabler/icons-svelte';
	import { resolve } from '$app/paths';

	const navLeft: NavItem[] = [
		{ label: 'Home', href: '/' },
		{ label: 'Docs', href: '/docs' },
		{ label: 'API', href: '/api' },
		{ label: 'Design', href: '/design' }
	];

	const changeLogFiles = import.meta.glob('/content/changelog/*.svx', { eager: true });
	const filePath = Object.keys(changeLogFiles);
	const version = filePath.map((path) => {
		const fileName = path.split('/').pop();
		return fileName!.replace('.svx', '');
	});
	const [lastVersion = ''] = version.toSorted((a, b) =>
		b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' })
	);

	let mobileNavOpen = $state(false);

	function isActive(href: string): boolean {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}
</script>

<header class="header-fixed glass-nav sticky top-0 z-50 w-full border-b border-surface-2/50">
	<nav
		class="relative mx-auto flex h-(--mobile-nav-height) max-w-360 items-center justify-between gap-4 px-4 md:h-16"
	>
		<!-- Left: Logo + Version -->
		<div class="flex items-center gap-3">
			<button
				class="flex items-center justify-center rounded-sm p-1 text-text-muted hover:text-text-secondary md:hidden"
				onclick={() => (mobileNavOpen = true)}
				aria-label="Open navigation"
			>
				<Menu size={20} />
			</button>
			<a href={resolve('/')} class="flex items-center gap-3">
				<Logo size="32px" class="text-accent" />
			</a>
			<div class="hidden h-5 w-px bg-surface-2 sm:block"></div>
			<a
				href={resolve('/changelog')}
				class="hidden text-xs text-text-muted transition-colors hover:text-text-secondary sm:inline"
			>
				{lastVersion}
			</a>
		</div>

		<!-- Center: Search -->
		<div class="absolute left-1/2 hidden -translate-x-1/2 items-center justify-center px-4 md:flex">
			<CommandPalette />
		</div>

		<!-- Right: Nav + Theme + GitHub -->
		<div class="flex items-center gap-1">
			<div class="hidden items-center gap-1 md:flex">
				{#each navLeft as item (item.label)}
					<a
						href={resolve(item.href as "/")}
						class="rounded-sm px-3 py-1.5 text-sm font-medium transition-colors {isActive(item.href)
							? 'bg-surface-1 text-text-primary'
							: 'text-text-muted hover:bg-surface-0 hover:text-text-secondary'}"
					>
						{item.label}
					</a>
				{/each}
			</div>

			<div class="mx-2 hidden h-5 w-px bg-surface-3 md:block"></div>

			<ThemeToggle />
			<SystemStatus />
		</div>
	</nav>
</header>

<MobileNav open={mobileNavOpen} onclose={() => (mobileNavOpen = false)} />
