<script lang="ts">
	// Premium Editorial Architecture Visualization
	// Minimal, precise, interactive, orthogonal, system-theme aware.

	import {
		Globe,
		Smartphone,
		ShieldCheck,
		Server,
		Database,
		Cloud,
		Cog,
		Activity
	} from 'lucide-svelte';


	let hoveredNode: string | null = $state(null);

	const nodes = [
		{
			id: 'client',
			label: 'Web Application',
			type: 'CLIENT',
			tech: 'SvelteKit SSR',
			x: 100,
			y: 100,
			status: 'OPERATIONAL',
			icon: Globe
		},
		{
			id: 'mobile',
			label: 'Mobile App',
			type: 'CLIENT',
			tech: 'Flutter / Dart',
			x: 350,
			y: 100,
			status: 'OPERATIONAL',
			icon: Smartphone
		},
		{
			id: 'admin',
			label: 'Admin Portal',
			type: 'MANAGEMENT',
			tech: 'SvelteKit',
			x: 720,
			y: 100,
			status: 'SECURE',
			icon: ShieldCheck
		},

		{
			id: 'proxy',
			label: 'API Gateway',
			type: 'PROXY',
			tech: '+server.ts (Node)',
			x: 410,
			y: 360,
			status: 'SHIELDED',
			icon: Server
		},
		{
			id: 'scrapper',
			label: 'Ingestion Pipeline',
			type: 'JOB',
			tech: 'yt-dlp / AI',
			x: 720,
			y: 360,
			status: 'ASYNC',
			icon: Cog
		},

		{
			id: 'api',
			label: 'Edge Core API',
			type: 'SERVICE',
			tech: 'Hono / Workers',
			x: 100,
			y: 620,
			status: 'LOW LATENCY',
			icon: Activity
		},
		{
			id: 'db',
			label: 'Primary Database',
			type: 'DATA',
			tech: 'Turso LibSQL',
			x: 410,
			y: 620,
			status: 'PERSISTENT',
			icon: Database
		},
		{
			id: 'storage',
			label: 'Object Vault',
			type: 'STORAGE',
			tech: 'Cloudflare R2',
			x: 720,
			y: 620,
			status: 'DISTRIBUTED',
			icon: Cloud
		}
	];

	// Map of bidirectional connections to determine highlighting
	const relations: Record<string, string[]> = {
		client: ['proxy'],
		mobile: ['proxy'],
		admin: ['proxy'],
		proxy: ['client', 'mobile', 'admin', 'api', 'db', 'storage'],
		scrapper: ['db', 'storage'],
		api: ['proxy', 'db', 'storage'],
		db: ['proxy', 'api', 'scrapper'],
		storage: ['proxy', 'api', 'scrapper']
	};

	const connections = [
		// Client to Proxy
		{ from: 'client', to: 'proxy', path: 'M 190 180 L 190 260 L 500 260 L 500 360', type: 'solid' },
		{ from: 'mobile', to: 'proxy', path: 'M 440 180 L 440 260 L 500 260 L 500 360', type: 'solid' },
		{ from: 'admin', to: 'proxy', path: 'M 810 180 L 810 260 L 500 260 L 500 360', type: 'dashed' },

		// Proxy to Edge Services
		{ from: 'proxy', to: 'api', path: 'M 500 440 L 500 520 L 190 520 L 190 620', type: 'solid' },
		{ from: 'proxy', to: 'db', path: 'M 500 440 L 500 620', type: 'solid' },
		{
			from: 'proxy',
			to: 'storage',
			path: 'M 500 440 L 500 520 L 810 520 L 810 620',
			type: 'solid'
		},

		// Scrapper Async writes
		{ from: 'scrapper', to: 'db', path: 'M 810 440 L 810 570 L 540 570 L 540 620', type: 'dashed' },
		{ from: 'scrapper', to: 'storage', path: 'M 810 440 L 810 620', type: 'dashed' },

		// API resolving data
		{ from: 'api', to: 'db', path: 'M 280 660 L 410 660', type: 'dotted' },
		{ from: 'api', to: 'storage', path: 'M 190 700 L 190 750 L 810 750 L 810 700', type: 'dotted' }
	];

	function isConnected(a: string, b: string) {
		return a === b || relations[a]?.includes(b) || relations[b]?.includes(a);
	}

	function isActiveConnection(conn: (typeof connections)[0]) {
		if (!hoveredNode) return false;
		return (
			(hoveredNode === conn.from || hoveredNode === conn.to) && isConnected(conn.from, conn.to)
		);
	}
</script>

<!-- DESKTOP INTERACTIVE DIAGRAM -->
<div
	class="relative mx-auto hidden w-full max-w-5xl overflow-hidden border-y border-surface-2 bg-surface-0/50 select-none lg:block"
>
	<!-- Subtle Architectural Background Grid -->
	<div
		class="bg-size:24px_24px pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] opacity-[0.03] dark:opacity-[0.06]"
	></div>

	<!-- SVG Coordinate Space (1000 x 800) -->
	<div class="relative w-full" style="aspect-ratio: 1000 / 800;">
		<!-- SVG Lines Layer -->
		<svg viewBox="0 0 1000 800" class="pointer-events-none absolute inset-0 h-full w-full">
			<defs>
				<marker
					id="arrow-solid"
					viewBox="0 0 10 10"
					refX="5"
					refY="5"
					markerWidth="4"
					markerHeight="4"
					orient="auto-start-reverse"
				>
					<path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-surface-3)" />
				</marker>
				<marker
					id="arrow-active"
					viewBox="0 0 10 10"
					refX="5"
					refY="5"
					markerWidth="4"
					markerHeight="4"
					orient="auto-start-reverse"
				>
					<path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-accent)" />
				</marker>
			</defs>

			<!-- Bounded Zones (Dashed outlines) -->
			<!-- Client Space -->
			<rect
				x="40"
				y="40"
				width="880"
				height="180"
				fill="none"
				stroke="var(--color-surface-2)"
				stroke-width="1"
				stroke-dasharray="4 4"
				class="transition-opacity duration-300 {hoveredNode ? 'opacity-30' : 'opacity-100'}"
			/>
			<text
				x="50"
				y="60"
				class="fill-text-muted font-mono text-xs font-bold tracking-widest opacity-80 transition-opacity duration-300 {hoveredNode
					? 'opacity-30'
					: 'opacity-100'}">CLIENT / USER SPACE</text
			>

			<!-- App Boundary -->
			<rect
				x="350"
				y="280"
				width="570"
				height="200"
				fill="none"
				stroke="var(--color-surface-2)"
				stroke-width="1"
				stroke-dasharray="4 4"
				class="transition-opacity duration-300 {hoveredNode ? 'opacity-30' : 'opacity-100'}"
			/>
			<text
				x="360"
				y="300"
				class="fill-text-muted font-mono text-xs font-bold tracking-widest opacity-80 transition-opacity duration-300 {hoveredNode
					? 'opacity-30'
					: 'opacity-100'}">APPLICATION BOUNDARY</text
			>

			<!-- Infrastructure Space -->
			<rect
				x="40"
				y="560"
				width="880"
				height="200"
				fill="none"
				stroke="var(--color-surface-2)"
				stroke-width="1"
				stroke-dasharray="4 4"
				class="transition-opacity duration-300 {hoveredNode ? 'opacity-30' : 'opacity-100'}"
			/>
			<text
				x="50"
				y="580"
				class="fill-text-muted font-mono text-xs font-bold tracking-widest opacity-80 transition-opacity duration-300 {hoveredNode
					? 'opacity-30'
					: 'opacity-100'}">EDGE INFRASTRUCTURE / PERSISTENCE</text
			>

			<!-- Connection Lines -->
			{#each connections as conn (conn.from + '-' + conn.to)}
				{@const active = isActiveConnection(conn)}
				{@const dimmed = hoveredNode && !active}

				<!-- Base Path -->
				<path
					d={conn.path}
					fill="none"
					stroke={active ? 'var(--color-accent)' : 'var(--color-surface-3)'}
					stroke-width={active ? '1.5' : '1'}
					stroke-dasharray={conn.type === 'solid' ? 'none' : conn.type === 'dashed' ? '4 4' : '1 3'}
					class="transition-all duration-300 {dimmed ? 'opacity-10' : 'opacity-100'}"
					marker-end={active ? 'url(#arrow-active)' : 'url(#arrow-solid)'}
				/>

				<!-- Animated Data Dot (Only on active solid/dashed connections, respects reduced motion via CSS) -->
				{#if active && (conn.type === 'solid' || conn.type === 'dashed')}
					<circle r="2.5" fill="var(--color-accent)" class="motion-safe:animate-data-flow">
						<!-- Native SVG SMIL animation as fallback for path following -->
						<animateMotion
							dur="2s"
							repeatCount="indefinite"
							path={conn.path}
							keyPoints="0;1"
							keyTimes="0;1"
							calcMode="linear"
						/>
					</circle>
				{/if}
			{/each}
		</svg>

		<!-- HTML Nodes Layer -->
		{#each nodes as node (node.id)}
			{@const connected = !hoveredNode || isConnected(hoveredNode, node.id)}
			<!-- svelte-ignore a11y_mouse_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="absolute flex cursor-default flex-col justify-between rounded-md border bg-surface-0 p-3 shadow-sm transition-all duration-300
					{connected ? 'border-surface-3/80 opacity-100' : 'border-surface-2 opacity-20'}"
				style="left: {node.x / 10}%; top: {node.y / 8}%; width: 20%;"
				onmouseover={() => (hoveredNode = node.id)}
				onmouseleave={() => (hoveredNode = null)}
			>
				<!-- Top Header -->
				<div class="flex w-full items-center justify-between">
					<div class="flex items-center gap-1.5">
						<node.icon
							size={14}
							class="{connected && hoveredNode
								? 'text-accent'
								: 'text-text-muted'} transition-colors duration-300"
						/>
						<span class="font-mono text-[9px] font-bold tracking-wider text-text-primary uppercase"
							>{node.type}</span
						>
					</div>
					<div
						class="h-1.5 w-1.5 rounded-full {connected && hoveredNode
							? 'animate-pulse bg-accent'
							: 'bg-surface-3'} transition-colors duration-300"
					></div>
				</div>

				<!-- Center Content -->
				<div class="mt-2 flex flex-col">
					<span
						class="text-sm leading-tight font-bold text-text-primary {connected && hoveredNode
							? 'text-accent'
							: ''} transition-colors duration-300">{node.label}</span
					>
					<span class="mt-0.5 text-xs font-medium text-text-secondary">{node.tech}</span>
				</div>

				<!-- Bottom Metadata -->
				<div class="mt-3 flex items-center justify-between border-t border-surface-2 pt-2">
					<span class="font-mono text-[9px] font-bold tracking-widest text-text-primary"
						>{node.status}</span
					>
				</div>
			</div>
		{/each}
	</div>
</div>

<!-- MOBILE FALLBACK: Stacked Editorial Layout -->
<div class="mx-auto my-8 block w-full max-w-md px-4 lg:hidden">
	<!-- Zones stacked vertically -->
	<div class="flex flex-col gap-6">
		<!-- Client Zone -->
		<div
			class="relative mt-4 flex flex-col rounded-lg border border-dashed border-surface-2 p-3 pt-5"
		>
			<span
				class="absolute top-0 left-3 -translate-y-1/2 bg-surface-0 px-2 font-mono text-[10px] font-bold tracking-widest text-text-primary"
				>CLIENT SPACE</span
			>
			<div class="grid grid-cols-1 gap-3">
				{#each nodes.filter((n) => n.y === 100) as node (node.id)}
					<div class="flex flex-col rounded-md border border-surface-2 bg-surface-0 p-3 shadow-sm">
						<div class="mb-2 flex items-center gap-1.5">
							<node.icon size={14} class="text-text-muted" />
							<span
								class="font-mono text-[9px] font-bold tracking-wider text-text-primary uppercase"
								>{node.type}</span
							>
						</div>
						<span class="text-sm font-bold text-text-primary">{node.label}</span>
						<span class="text-xs font-medium text-text-secondary">{node.tech}</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- App Boundary -->
		<div
			class="relative mt-5 flex flex-col rounded-lg border border-dashed border-surface-2 p-3 pt-5"
		>
			<span
				class="absolute top-0 left-3 -translate-y-1/2 bg-surface-0 px-2 font-mono text-[10px] font-bold tracking-widest text-text-primary"
				>APP BOUNDARY</span
			>
			<div class="grid grid-cols-1 gap-3">
				{#each nodes.filter((n) => n.y === 360) as node (node.id)}
					<div
						class="relative flex flex-col rounded-md border border-surface-3 bg-surface-0 p-3 shadow-sm"
					>
						{#if node.id === 'proxy'}
							<div
								class="absolute top-3 right-3 h-2 w-2 animate-pulse rounded-full bg-accent"
							></div>
						{/if}
						<div class="mb-2 flex items-center gap-1.5">
							<node.icon size={14} class="text-text-muted" />
							<span
								class="font-mono text-[9px] font-bold tracking-wider text-text-primary uppercase"
								>{node.type}</span
							>
						</div>
						<span class="text-sm font-bold text-text-primary">{node.label}</span>
						<span class="text-xs font-medium text-text-secondary">{node.tech}</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- Edge Infrastructure -->
		<div
			class="relative mt-5 flex flex-col rounded-lg border border-dashed border-surface-2 p-3 pt-5"
		>
			<span
				class="absolute top-0 left-3 -translate-y-1/2 bg-surface-0 px-2 font-mono text-[10px] font-bold tracking-widest text-text-primary"
				>EDGE INFRASTRUCTURE</span
			>
			<div class="grid grid-cols-1 gap-3">
				{#each nodes.filter((n) => n.y === 620) as node (node.id)}
					<div class="flex flex-col rounded-md border border-surface-2 bg-surface-0 p-3 shadow-sm">
						<div class="mb-2 flex items-center gap-1.5">
							<node.icon size={14} class="text-text-muted" />
							<span
								class="font-mono text-[9px] font-bold tracking-wider text-text-primary uppercase"
								>{node.type}</span
							>
						</div>
						<span class="text-sm font-bold text-text-primary">{node.label}</span>
						<span class="text-xs font-medium text-text-secondary">{node.tech}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	/* Use CSS media queries to respect reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.animate-pulse,
		circle {
			animation: none !important;
			display: none !important; /* Hide tiny indicator dot if motion is reduced */
		}
	}
</style>
