<script lang="ts">
	import { resolve } from '$app/paths';
	import {
		ArrowRight,
		ArrowDown,
		Monitor,
		Database,
		Server,
		Cloud,
		Music,
		Radio,
		HardDrive,
		Search,
		Shield,
		Layers,
		Terminal,
		Globe
	} from 'lucide-svelte';
	import { IconBrandGithub } from '@tabler/icons-svelte';
	import Logo from '$lib/components/ui/Logo.svelte';
</script>

<svelte:head>
	<title>Lament Docs - Music Streaming Infrastructure</title>
	<meta
		name="description"
		content="Music streaming infrastructure and discovery platform. Edge-deployed API, HLS audio streaming, and multi-repo system."
	/>
	<meta property="og:title" content="Lament - Music Streaming Infrastructure" />
	<meta
		property="og:description"
		content="Music streaming infrastructure and discovery platform."
	/>
	<meta property="og:type" content="website" />
</svelte:head>

<!-- Hero -->
<div class="relative overflow-hidden">
	<!-- Subtle Background Glow -->
	<div
		class="pointer-events-none absolute -top-32 left-1/2 h-96 w-160 -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
	></div>

	<section
		class="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl flex-col justify-center px-6 pt-12 pb-32 text-center"
	>
		<div class="mb-8 flex justify-center">
			<Logo size="100px" class="text-accent" />
		</div>
		<h1 class="text-3xl font-semibold tracking-tight text-balance text-text-primary sm:text-4xl">
			Music streaming infrastructure and discovery platform
		</h1>
		<p
			class="animate-in fade-in slide-in-from-bottom-4 mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text-primary delay-200 duration-700"
		>
			A multi-repository music platform powered by Bun, with automated metadata scraping (YouTube/Last.fm/Deezer),
			HLS audio streaming, closed dual-auth Edge API, and SvelteKit frontend proxy.
		</p>
		<div
			class="animate-in fade-in slide-in-from-bottom-4 fill-mode-both mt-8 flex flex-col items-center justify-center gap-3 delay-300 duration-700 sm:flex-row"
		>
			<a
				href={resolve('/docs')}
				class="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-accent-hover sm:w-auto sm:min-w-37.5"
			>
				Documentation
				<ArrowRight size={14} />
			</a>
			<a
				href="https://lament.rynds.my.id/"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex w-full items-center justify-center gap-2 rounded-md border border-surface-3 bg-surface-2 px-5 py-2.5 text-sm font-medium text-text-primary shadow-sm transition-colors hover:bg-surface-3 hover:text-text-primary sm:w-auto sm:min-w-37.5"
			>
				<Globe size={16} />
				Demo
			</a>
			<a
				href="https://github.com/lamentfm/"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex w-full items-center justify-center gap-2 rounded-md border border-surface-2 bg-surface-1 px-5 py-2.5 text-sm font-medium text-text-primary shadow-sm transition-colors hover:border-surface-2 hover:text-text-primary sm:w-auto sm:min-w-37.5"
			>
				<IconBrandGithub size={16} />
				GitHub
			</a>
		</div>
	</section>
</div>

<!-- Features Pipeline -->
<section class="relative overflow-hidden border-t border-surface-2 bg-surface-0">
	<!-- Subtle gradient wash -->
	<div
		class="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent to-surface-1/30"
	></div>
	<div class="relative mx-auto max-w-4xl px-6 py-20">
		<h2 class="mb-12 text-center text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
			How it works
		</h2>
		<div class="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-0">
			{#each [{ label: 'Scrape', desc: 'Spotify · YouTube', icon: Search }, { label: 'Process', desc: 'Metadata · Audio', icon: Layers }, { label: 'Store', desc: 'LibSQL · R2 · HLS', icon: HardDrive }, { label: 'API', desc: 'Hono · Edge · Cache', icon: Server }, { label: 'Stream', desc: 'SvelteKit · HLS.js', icon: Radio }] as step, i (step.label)}
				{#if i > 0}
					<div class="hidden h-px w-6 bg-surface-2 sm:block"></div>
					<div class="h-6 w-px bg-surface-2 sm:hidden"></div>
				{/if}
				<div
					class="group relative flex w-36 flex-col items-center gap-2 rounded-xl border border-surface-2 bg-linear-to-b from-surface-1 to-surface-0 px-4 py-5 text-center transition-colors hover:border-surface-3/80"
				>
					<div
						class="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-surface-2/50 ring-1 ring-surface-3 transition-colors group-hover:bg-surface-2"
					>
						<step.icon
							size={18}
							class="text-text-primary transition-colors group-hover:text-accent"
						/>
					</div>
					<span class="text-sm font-bold text-text-primary">{step.label}</span>
					<span class="text-[10px] leading-tight text-text-secondary">{step.desc}</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Architecture -->
<section class="relative border-t border-surface-2 bg-surface-0">
	<!-- Elegant dot pattern background -->
	<div
		class="bg-size:24px_24px pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)]"
	></div>

	<div class="relative mx-auto max-w-4xl px-6 py-20">
		<h2 class="mb-4 text-center text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
			Architecture
		</h2>
		<p class="mb-12 text-center text-sm text-text-secondary">
			Proxy architecture with edge-deployed API and object storage.
		</p>
		<div class="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-4 sm:px-0">
			<!-- Browser / Client & SSR -->
			<div
				class="relative z-20 w-full max-w-sm rounded-xl border border-surface-2 bg-surface-1/80 p-4 backdrop-blur-sm transition-colors hover:border-surface-3"
			>
				<div class="flex items-center justify-center gap-4">
					<div
						class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/20"
					>
						<Monitor size={24} strokeWidth={1.5} />
					</div>
					<div>
						<h3 class="text-sm font-semibold text-text-primary">Browser / Client</h3>
						<p class="mt-0.5 text-xs text-text-secondary">SvelteKit SSR · HLS.js</p>
					</div>
				</div>
			</div>

			<!-- Line down -->
			<div class="h-8 w-px bg-surface-2"></div>

			<!-- WAF Shield -->
			<div class="relative z-10 flex flex-col items-center">
				<div
					class="flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-1.5 text-orange-600 shadow-sm ring-1 ring-orange-500/20"
				>
					<Shield size={16} strokeWidth={2} />
					<span class="text-xs font-bold tracking-wide">Cloudflare WAF</span>
				</div>
				<span
					class="mt-2 text-center text-[10px] font-medium tracking-wider text-text-secondary uppercase"
					>Auth · DDoS Protection</span
				>
			</div>

			<!-- Split container -->
			<div class="relative mt-6 flex w-full sm:mt-8">
				<!-- Top horizontal connecting line (Desktop only) -->
				<div class="absolute top-0 right-1/4 left-1/4 hidden h-px bg-surface-2 sm:block"></div>

				<!-- Left Side: API Pipeline -->
				<div class="flex flex-1 flex-col items-center">
					<!-- Vertical line connecting horizontal to Server -->
					<div class="hidden h-8 w-px bg-surface-2 sm:block"></div>
					<div class="h-8 w-px bg-surface-2 sm:hidden"></div>
					<!-- Mobile only line -->

					<!-- SvelteKit Server (Proxy) -->
					<div
						class="w-full max-w-65 rounded-xl border border-surface-2 bg-surface-1/80 p-4 backdrop-blur-sm transition-colors hover:border-surface-3"
					>
						<div class="flex items-center gap-3">
							<div
								class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20"
							>
								<Server size={20} strokeWidth={1.5} />
							</div>
							<div>
								<h3 class="text-sm font-semibold text-text-primary">Svelte Proxy</h3>
								<p class="mt-0.5 text-[10px] text-text-secondary">Secure routing</p>
							</div>
						</div>
					</div>

					<div class="flex flex-col items-center">
						<div class="h-6 w-px bg-surface-2"></div>
						<div class="rounded-full bg-surface-1 p-1 text-text-muted ring-1 ring-surface-2">
							<ArrowDown size={12} />
						</div>
						<div class="h-6 w-px bg-surface-2"></div>
					</div>

					<!-- Hono API -->
					<div
						class="relative w-full max-w-65 rounded-xl border border-surface-2 bg-surface-1/80 p-4 backdrop-blur-sm transition-colors hover:border-surface-3"
					>
						<div class="flex items-center gap-3">
							<div
								class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-text-primary shadow-inner ring-1 ring-surface-3"
							>
								<Cloud size={20} strokeWidth={1.5} />
							</div>
							<div>
								<h3 class="text-sm font-semibold text-text-primary">Hono Edge API</h3>
								<p class="mt-0.5 text-[10px] text-text-secondary">Cloudflare Workers</p>
							</div>
						</div>
					</div>

					<!-- Split Databases -->
					<div class="relative mt-4 flex w-full max-w-65 justify-center pt-4">
						<div class="absolute top-0 h-px w-2/3 bg-surface-2"></div>

						<div class="flex w-full justify-between px-6">
							<div class="flex flex-col items-center gap-2">
								<div class="absolute top-0 h-4 w-px bg-surface-2"></div>
								<div
									class="mt-4 rounded-full bg-surface-1 p-2 text-text-primary shadow-sm ring-1 ring-surface-2"
								>
									<Database size={16} />
								</div>
								<span class="text-xs font-semibold text-text-primary">Turso DB</span>
							</div>

							<div class="flex flex-col items-center gap-2">
								<div class="absolute top-0 h-4 w-px bg-surface-2"></div>
								<div
									class="mt-4 rounded-full bg-surface-1 p-2 text-text-primary shadow-sm ring-1 ring-surface-2"
								>
									<Layers size={16} />
								</div>
								<span class="text-xs font-semibold text-text-primary">Cache</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Right Side: Direct Media (Desktop only) -->
				<div class="hidden flex-1 flex-col items-center sm:flex">
					<div class="h-8 w-px bg-surface-2"></div>

					<!-- Media Node -->
					<div
						class="w-full max-w-65 rounded-xl border border-surface-2 bg-surface-1/80 p-4 backdrop-blur-sm transition-colors hover:border-surface-3"
					>
						<div class="flex items-center gap-3">
							<div
								class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500 ring-1 ring-purple-500/20"
							>
								<Globe size={20} strokeWidth={1.5} />
							</div>
							<div>
								<h3 class="text-sm font-semibold text-text-primary">Media Delivery</h3>
								<p class="mt-0.5 text-[10px] text-text-secondary">Direct HLS access</p>
							</div>
						</div>
					</div>

					<div class="flex flex-col items-center">
						<div class="h-6 w-px bg-surface-2"></div>
						<div class="rounded-full bg-surface-1 p-1 text-text-muted ring-1 ring-surface-2">
							<ArrowDown size={12} />
						</div>
						<div class="h-6 w-px bg-surface-2"></div>
					</div>

					<!-- Cloudflare R2 -->
					<div class="flex flex-col items-center gap-2">
						<div
							class="rounded-full bg-surface-1 p-2 text-text-primary shadow-sm ring-1 ring-surface-2"
						>
							<HardDrive size={16} />
						</div>
						<span class="text-xs font-semibold text-text-primary">Cloudflare R2</span>
						<span class="text-[10px] text-text-secondary">Object Storage</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Technologies -->
<section class="border-t border-surface-2 bg-surface-1">
	<div class="mx-auto max-w-4xl px-6 py-20">
		<h2 class="mb-12 text-center text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
			Built with
		</h2>
		<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
			{#each [{ name: 'Bun', desc: 'JavaScript runtime', icon: Terminal }, { name: 'SvelteKit', desc: 'Frontend & SSR Proxy', icon: Layers }, { name: 'Hono', desc: 'Closed Edge API', icon: Server }, { name: 'Cloudflare', desc: 'Edge runtime', icon: Cloud }, { name: 'LibSQL', desc: 'Turso DB', icon: Database }, { name: 'R2 Storage', desc: 'HLS Object storage', icon: HardDrive }, { name: 'HLS.js', desc: 'Audio streaming', icon: Music }, { name: 'Tailwind v4', desc: 'Styling', icon: Layers }] as tech (tech.name)}
				<div
					class="group flex flex-col items-center rounded-xl border border-surface-2 bg-linear-to-b from-surface-1 to-surface-0 px-4 py-4 text-center transition-colors hover:border-surface-3/80"
				>
					<div
						class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2/50 ring-1 ring-surface-3 transition-colors group-hover:bg-surface-2"
					>
						<tech.icon
							size={18}
							class="text-text-primary transition-colors group-hover:text-accent"
						/>
					</div>
					<span class="text-sm font-semibold text-text-primary">{tech.name}</span>
					<p class="mt-1 text-xs text-text-secondary">{tech.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA -->
<section class="border-t border-surface-2 bg-linear-to-b from-surface-0 to-surface-1">
	<div class="mx-auto max-w-4xl px-6 py-24 text-center">
		<div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center">
			<Terminal size={60} class="text-accent" />
		</div>
		<h2 class="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
			Explore the documentation
		</h2>
		<p class="mx-auto mt-4 max-w-md text-base leading-relaxed text-text-secondary">
			Understand the architecture, run Lament locally, and build modern high-fidelity audio streaming applications.
		</p>
		<div class="mt-8 flex justify-center">
			<a
				href={resolve('/docs')}
				class="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white"
			>
				Start Reading
				<ArrowRight size={16} />
			</a>
		</div>
	</div>
</section>
