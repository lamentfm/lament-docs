<script lang="ts">
	import { resolve } from '$app/paths';
	import BentoCard from '$lib/components/design/BentoCard.svelte';
	import ColorSwatch from '$lib/components/design/ColorSwatch.svelte';
	import LyricsPlayer from '$lib/components/design/LyricsPlayer.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Input } from '$lib/components/ui/input';
	import { Play, Heart, Plus, Shuffle, Disc3 } from 'lucide-svelte';
	import {
		colorPalette,
		chartData,
		radiusItems,
		recentTracks,
		artists,
		albums
	} from '$lib/data/design';

	const maxVal = Math.max(...chartData);

	let offlineSync = $state(true);
</script>

<svelte:head>
	<title>Design System - Lament</title>
</svelte:head>

<div class="relative min-h-screen overflow-hidden pb-32">
	<!-- Glowing Gradients (Background) -->
	<div
		class="pointer-events-none absolute -top-32 left-1/4 h-96 w-160 -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]"
	></div>
	<div
		class="pointer-events-none absolute top-96 -right-20 h-120 w-120 rounded-full bg-secondary/15 blur-[140px]"
	></div>
	<div
		class="pointer-events-none absolute bottom-1/3 -left-20 h-96 w-96 rounded-full bg-accent/10 blur-[130px]"
	></div>

	<!-- Technical Dot Pattern -->
	<div
		class="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:24px_24px] dark:bg-[radial-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)]"
	></div>

	<div class="mx-auto max-w-6xl px-4 pt-24 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="mb-16 max-w-2xl">
			<h1 class="font-sans text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
				Design <span class="text-accent">System</span>
			</h1>
			<p class="mt-4 text-lg text-text-muted">
				A comprehensive guide to the colors, typography, components, and visual tokens that power
				the Lament ecosystem.
			</p>
		</div>

		<div class="flex flex-col gap-12">
			<!-- Colors Section -->
			<section>
				<h2 class="mb-6 text-2xl font-medium tracking-tight">Colors</h2>
				<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
					{#each colorPalette as color (color.name)}
						<ColorSwatch {...color} />
					{/each}
				</div>
			</section>

			<!-- Typography & Spacing Bento -->
			<section>
				<h2 class="mb-6 text-2xl font-medium tracking-tight">Typography & Tokens</h2>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
					<BentoCard title="Typefaces" class="md:col-span-2">
						<div class="mt-4 flex flex-col gap-8">
							<div class="flex flex-col gap-2">
								<div class="flex items-center justify-between">
									<span class="text-sm font-medium text-text-secondary">Space Grotesk</span>
									<span
										class="rounded-full bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-text-muted"
										>Display & Headings</span
									>
								</div>
								<p
									class="font-sans text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl"
								>
									Aa Bb Cc Dd Ee Ff Gg
								</p>
								<div class="mt-1 flex gap-4 text-xs text-text-muted">
									<span class="font-normal">Regular 400</span>
									<span class="font-medium text-text-primary">Medium 500</span>
									<span class="font-semibold">SemiBold 600</span>
									<span class="font-bold">Bold 700</span>
								</div>
							</div>

							<div class="h-px w-full bg-surface-2"></div>

							<div class="flex flex-col gap-2">
								<div class="flex items-center justify-between">
									<span class="text-sm font-medium text-text-secondary">Inter</span>
									<span
										class="rounded-full bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-text-muted"
										>Body & UI</span
									>
								</div>
								<p
									class="text-xl text-text-primary sm:text-2xl"
									style="font-family: 'Inter', sans-serif;"
								>
									Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn
								</p>
								<div class="mt-1 flex gap-4 text-xs text-text-muted">
									<span class="font-normal text-text-primary">Regular 400</span>
									<span class="font-medium">Medium 500</span>
									<span class="font-semibold">SemiBold 600</span>
								</div>
							</div>

							<div class="h-px w-full bg-surface-2"></div>

							<!-- Text Styles Example -->
							<div class="flex flex-col gap-3">
								<h3 class="text-[10px] font-medium tracking-wider text-text-muted uppercase">
									Paragraph & Links
								</h3>
								<p class="max-w-md text-sm leading-relaxed text-text-muted">
									Music is the universal language of mankind. Discover new tracks, follow your
									favorite <span class="font-medium text-text-primary">artists</span>, and curate
									the perfect playlist.
									<a
										href={resolve('/docs')}
										class="text-accent underline-offset-4 transition-all hover:underline"
										>Learn more about Lament</a
									>.
								</p>
							</div>
						</div>
					</BentoCard>

					<div class="flex flex-col gap-4">
						<BentoCard title="Shape & Depth" class="flex-1">
							<div class="mt-4">
								<h3 class="mb-3 text-[10px] font-medium tracking-wider text-text-muted uppercase">
									Radius
								</h3>
								<div class="grid grid-cols-4 gap-x-4 gap-y-6">
									{#each radiusItems as item, i (item.label + i)}
										<div class="group relative flex items-center justify-center">
											<img
												src={item.image}
												alt=""
												class="h-12 w-12 {item.roundedClass} border border-surface-3 object-cover shadow-sm"
											/>
											<span
												class="pointer-events-none absolute -top-8 left-1/2 z-50 -translate-x-1/2 rounded bg-surface-3 px-2 py-1 font-mono text-[10px] whitespace-nowrap text-text-primary opacity-0 shadow-md transition-opacity group-hover:opacity-100"
												>{item.label}</span
											>
										</div>
									{/each}
								</div>
							</div>
						</BentoCard>

						<BentoCard title="Materials" class="flex-1">
							<div
								class="group relative mt-4 flex h-32 w-full cursor-default items-center justify-center overflow-hidden rounded-xl border border-surface-3"
							>
								<!-- Background pattern to show off blur -->
								<div
									class="absolute inset-0 bg-linear-to-br from-accent/30 via-surface-1 to-secondary/30"
								></div>

								<!-- Glass container -->
								<div
									class="relative z-10 flex h-20 w-[80%] items-center justify-center rounded-lg border border-surface-3/50 bg-surface-0/60 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5"
								>
									<span class="font-mono text-xs font-medium text-text-primary">backdrop-blur-md</span>
								</div>

								<!-- Tooltip -->
								<span
									class="pointer-events-none absolute top-4 left-1/2 z-50 -translate-x-1/2 rounded bg-surface-3 px-2 py-1 font-mono text-[10px] whitespace-nowrap text-text-primary opacity-0 shadow-md transition-opacity group-hover:opacity-100"
									>glassmorphism</span
								>
							</div>
						</BentoCard>
					</div>
				</div>
			</section>

			<!-- Components & Data Viz Bento -->
			<section>
				<h2 class="mb-6 text-2xl font-medium tracking-tight">Components & Data</h2>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2">
					<!-- Data Viz: Donut Chart -->
					<BentoCard title="API Requests" class="flex flex-col md:col-span-4 md:row-span-2">
						<div class="flex flex-1 items-center justify-center py-8">
							<div
								class="relative flex h-48 w-48 items-center justify-center rounded-full border-16 border-surface-2"
							>
								<!-- Pseudo donut segments -->
								<div
									class="absolute inset-0 rounded-full border-16 border-accent"
									style="clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)"
								></div>
								<div
									class="absolute inset-0 rounded-full border-16 border-accent-muted"
									style="clip-path: polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)"
								></div>

								<div class="text-center">
									<span class="block text-3xl font-semibold tracking-tight">84.2K</span>
									<span class="text-xs text-text-muted">Total Requests</span>
								</div>
							</div>
						</div>
						<div class="mt-auto space-y-3">
							<div class="flex items-center justify-between text-sm">
								<div class="flex items-center gap-2">
									<div class="h-2 w-2 rounded-full bg-accent"></div>
									/api/tracks
								</div>
								<span class="font-mono text-text-muted">42,100</span>
							</div>
							<div class="flex items-center justify-between text-sm">
								<div class="flex items-center gap-2">
									<div class="h-2 w-2 rounded-full bg-accent-muted"></div>
									/api/artists
								</div>
								<span class="font-mono text-text-muted">25,200</span>
							</div>
							<div class="flex items-center justify-between text-sm">
								<div class="flex items-center gap-2">
									<div class="h-2 w-2 rounded-full bg-surface-3"></div>
									Other endpoints
								</div>
								<span class="font-mono text-text-muted">16,900</span>
							</div>
						</div>
					</BentoCard>

					<!-- Music Track List Showcase -->
					<BentoCard title="Track List" class="flex flex-col gap-4 md:col-span-4 md:row-span-2">
						<div class="mt-2 flex items-center justify-between">
							<h3 class="text-sm font-medium">Recently Played</h3>
							<Button variant="ghost" size="xs">View All</Button>
						</div>

						<div class="flex flex-1 flex-col gap-2">
							{#each recentTracks as track (track.title)}
								<div
									class="group flex cursor-pointer items-center justify-between rounded-lg border border-transparent p-2 transition-colors hover:border-surface-3 hover:bg-surface-2"
								>
									<div class="flex items-center gap-3">
										<div
											class="flex h-10 w-10 items-center justify-center rounded-md bg-surface-3 text-text-muted transition-colors group-hover:bg-accent group-hover:text-bg"
										>
											<Play size={16} class="ml-0.5" />
										</div>
										<div class="flex flex-col">
											<span class="text-sm font-medium text-text-primary">{track.title}</span>
											<span class="text-xs text-text-muted">{track.artist}</span>
										</div>
									</div>
									<div class="flex items-center gap-3">
										<Heart
											size={14}
											class="cursor-pointer text-text-muted opacity-0 transition-opacity group-hover:opacity-100 hover:text-accent"
										/>
										<span class="font-mono text-xs text-text-muted">{track.time}</span>
									</div>
								</div>
							{/each}
						</div>
					</BentoCard>

					<!-- Data Viz: Bar Chart -->
					<BentoCard title="Traffic Activity" class="md:col-span-4 md:row-span-1">
						<div class="mt-6 flex h-24 items-end gap-2 px-2">
							{#each chartData as val, i (i)}
								<div class="group relative flex h-full w-full flex-1 flex-col justify-end">
									<div
										class="absolute -top-8 left-1/2 z-10 -translate-x-1/2 rounded bg-surface-3 px-2 py-1 text-xs whitespace-nowrap opacity-0 shadow-md transition-opacity group-hover:opacity-100"
									>
										{val} reqs
									</div>
									<div
										class="w-full origin-bottom rounded-t-sm bg-accent transition-all duration-300 group-hover:scale-y-105 group-hover:bg-accent-hover"
										style="height: {(val / maxVal) * 100}%"
									></div>
									<div class="mt-2 text-center text-[10px] text-text-muted">
										{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
									</div>
								</div>
							{/each}
						</div>
					</BentoCard>

					<!-- Inputs & Controls -->
					<BentoCard title="Inputs & Controls" class="md:col-span-4 md:row-span-1">
						<div class="mt-2 flex flex-col gap-4">
							<div class="flex flex-wrap gap-2">
								<Badge variant="default">New Release</Badge>
								<Badge variant="outline">Live</Badge>
							</div>
							<div class="flex w-full items-center space-x-2">
								<Input
									type="text"
									placeholder="Search tracks..."
									class="h-9 flex-1 border-surface-2 bg-surface-0"
								/>
								<Button size="icon" class="h-9 w-9 shrink-0"><Plus size={16} /></Button>
							</div>
							<!-- Switch -->
							<div
								class="flex items-center justify-between rounded-xl border border-surface-2 bg-surface-0 p-3"
							>
								<div class="space-y-0.5">
									<p class="text-xs font-medium">Offline Sync</p>
									<p class="text-[10px] text-text-muted">Download tracks automatically.</p>
								</div>
								<button
									class="flex h-5 w-9 cursor-pointer items-center rounded-full p-0.5 shadow-inner transition-colors focus:outline-none {offlineSync
										? 'bg-accent'
										: 'bg-surface-3'}"
									onclick={() => (offlineSync = !offlineSync)}
									aria-label="Toggle Offline Sync"
								>
									<div
										class="h-4 w-4 rounded-full bg-white shadow-sm transition-transform {offlineSync
											? 'translate-x-4'
											: 'translate-x-0'}"
									></div>
								</button>
							</div>
						</div>
					</BentoCard>
				</div>
			</section>

			<!-- Media Components & Controls Bento -->
			<section>
				<h2 class="mb-6 text-2xl font-medium tracking-tight">Media & Player Controls</h2>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2">
					<!-- Playback Controls -->
					<!-- Playback Controls -->
					<BentoCard title="Playback Controls" class="md:col-span-4 md:row-span-1">
						<div class="mt-4 flex flex-col gap-4">
							<!-- Variant 1: White Play Theme -->
							<div
								class="flex w-full items-center justify-between rounded-2xl border border-surface-2 bg-surface-1 p-4 shadow-sm"
							>
								<!-- Play Button Combo -->
								<div class="flex items-center gap-4">
									<button
										class="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-sm transition-colors hover:bg-surface-2 hover:text-white focus:outline-none"
									>
										<Play fill="currentColor" class="ml-1" size={20} />
									</button>
									<button
										class="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-surface-2 focus:outline-none"
									>
										<Shuffle
											class="text-text-muted transition-colors hover:text-text-primary"
											size={18}
										/>
									</button>
								</div>
								<div class="h-6 w-px bg-surface-2"></div>
								<!-- Tabs/Filters Combo -->
								<div class="flex items-center gap-3">
									<button
										class="flex h-10 w-10 items-center justify-center rounded-full border border-surface-3 bg-surface-2 transition-colors hover:bg-surface-3 focus:outline-none"
									>
										<Disc3 class="text-text-primary" size={18} />
									</button>
									<button
										class="flex h-8 items-center justify-center rounded-full border border-transparent bg-surface-2 px-4 text-xs font-medium text-text-primary transition-colors hover:border-surface-3 hover:bg-surface-3 focus:outline-none"
									>
										Albums
									</button>
								</div>
							</div>

							<!-- Variant 2: Surface Play Theme -->
							<div
								class="flex w-full items-center justify-between rounded-2xl border border-surface-2 bg-surface-1 p-4 shadow-sm"
							>
								<!-- Play Button Combo -->
								<div class="flex items-center gap-4">
									<button
										class="flex h-12 w-12 items-center justify-center rounded-full border border-surface-3 bg-surface-2 text-text-primary shadow-sm transition-colors hover:bg-surface-3 focus:outline-none"
									>
										<Play fill="currentColor" class="ml-1" size={20} />
									</button>
									<button
										class="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-surface-2 focus:outline-none"
									>
										<Shuffle
											class="text-text-muted transition-colors hover:text-text-primary"
											size={18}
										/>
									</button>
								</div>
								<div class="h-6 w-px bg-surface-2"></div>
								<!-- Tabs/Filters Combo -->
								<div class="flex items-center gap-3">
									<button
										class="flex h-10 w-10 items-center justify-center rounded-full border border-surface-3 bg-surface-2 transition-colors hover:bg-surface-3 focus:outline-none"
									>
										<Disc3 class="text-text-primary" size={18} />
									</button>
									<button
										class="flex h-8 items-center justify-center rounded-full border border-transparent bg-surface-2 px-4 text-xs font-medium text-text-primary transition-colors hover:border-surface-3 hover:bg-surface-3 focus:outline-none"
									>
										Albums
									</button>
								</div>
							</div>

							<!-- Variant 3: Accent Play Theme -->
							<div
								class="flex w-full items-center justify-between rounded-2xl border border-surface-2 bg-surface-1 p-4 shadow-sm"
							>
								<!-- Play Button Combo -->
								<div class="flex items-center gap-4">
									<button
										class="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-surface-0 shadow-sm transition-colors hover:bg-accent-hover focus:outline-none"
									>
										<Play fill="currentColor" class="ml-1" size={20} />
									</button>
									<button
										class="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-surface-2 focus:outline-none"
									>
										<Shuffle
											class="text-text-muted transition-colors hover:text-text-primary"
											size={18}
										/>
									</button>
								</div>
								<div class="h-6 w-px bg-surface-2"></div>
								<!-- Tabs/Filters Combo -->
								<div class="flex items-center gap-3">
									<button
										class="flex h-10 w-10 items-center justify-center rounded-full border border-surface-3 bg-surface-2 transition-colors hover:bg-surface-3 focus:outline-none"
									>
										<Disc3 class="text-text-primary" size={18} />
									</button>
									<button
										class="flex h-8 items-center justify-center rounded-full border border-transparent bg-surface-2 px-4 text-xs font-medium text-text-primary transition-colors hover:border-surface-3 hover:bg-surface-3 focus:outline-none"
									>
										Albums
									</button>
								</div>
							</div>
						</div>
					</BentoCard>

					<!-- Artists (Circular) -->
					<BentoCard title="Artists" class="md:col-span-8 md:row-span-1">
						<div class="mt-2 flex items-center justify-between">
							<div class="scrollbar-hidden flex w-full gap-4 overflow-x-auto pt-2 pb-4">
								{#each artists as artist (artist.name)}
									<div class="group flex w-24 cursor-pointer flex-col items-center gap-3">
										<div
											class="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-surface-3 bg-surface-2 shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
										>
											<img
												src={artist.image}
												alt={artist.name}
												class="h-full w-full object-cover"
											/>
										</div>
										<span
											class="w-full truncate text-center text-xs font-medium text-text-primary transition-colors group-hover:text-accent"
											>{artist.name}</span
										>
									</div>
								{/each}
							</div>
						</div>
					</BentoCard>

					<!-- Albums (Square) -->
					<BentoCard title="Albums for you" class="md:col-span-12 md:row-span-1">
						<div class="scrollbar-hidden mt-2 flex gap-4 overflow-x-auto pt-2 pb-4">
							{#each albums as album (album.title)}
								<div class="group flex w-36 cursor-pointer flex-col gap-3">
									<div
										class="flex aspect-square w-36 items-center justify-center overflow-hidden rounded-xl border border-surface-3 bg-surface-2 shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg"
									>
										<img src={album.image} alt={album.title} class="h-full w-full object-cover" />
									</div>
									<div class="flex flex-col">
										<span class="truncate text-sm font-medium text-text-primary">{album.title}</span
										>
										<span class="truncate text-[10px] text-text-muted"
											>{album.artist} • {album.year}</span
										>
									</div>
								</div>
							{/each}
						</div>
					</BentoCard>
				</div>
			</section>

			<!-- Immersive Lyrics Showcase -->
			<section>
				<div class="mb-6">
					<h2 class="text-2xl font-medium tracking-tight">Immersive Lyrics</h2>
				</div>
				<div class="w-full">
					<LyricsPlayer />
				</div>
			</section>
		</div>
	</div>
</div>
