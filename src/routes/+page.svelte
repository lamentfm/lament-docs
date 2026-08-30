<script lang="ts">
	import { resolve } from '$app/paths';
	import { ArrowRight, Globe } from 'lucide-svelte';
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
<div class="relative h-[calc(100vh-4rem)] overflow-hidden">
	<!-- Subtle Background Glow -->
	<div
		class="pointer-events-none absolute -top-32 left-1/2 h-96 w-160 -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
	></div>

	<section
		class="relative z-10 mx-auto -mt-8 flex h-full max-w-4xl flex-col justify-center px-6 text-center"
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
			Multi repository music discovery platform powered by Bun, featuring automated metadata
			ingestion from YouTube, Last.fm, and Deezer, HLS audio streaming, a dual authenticated Edge
			API, and a SvelteKit frontend.
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
