<script lang="ts">
	import { onMount } from 'svelte';
	import { someoneLikeYouLyrics } from '$lib/data/lyrics';

	let currentTime = $state(0);

	// Find the current active lyric
	let activeIndex = $derived.by(() => {
		// Find the last lyric whose time is less than or equal to current time
		for (let i = someoneLikeYouLyrics.length - 1; i >= 0; i--) {
			if (currentTime >= someoneLikeYouLyrics[i].time) {
				return i;
			}
		}
		return -1;
	});

	let containerRef: HTMLElement | null = $state(null);

	// Simulate playback
	onMount(() => {
		let animationFrame: number;
		let lastTime = performance.now();

		// Start playback 3 seconds before the first lyric so user can see it scroll in
		currentTime = someoneLikeYouLyrics[0].time - 3;

		const updateTime = (time: number) => {
			const deltaTime = (time - lastTime) / 1000;
			lastTime = time;

			currentTime += deltaTime;

			// Loop back to start if we reach the end
			const lastLyric = someoneLikeYouLyrics[someoneLikeYouLyrics.length - 1];
			if (currentTime > lastLyric.time + 5) {
				currentTime = someoneLikeYouLyrics[0].time - 3;
			}

			animationFrame = requestAnimationFrame(updateTime);
		};

		animationFrame = requestAnimationFrame(updateTime);

		return () => {
			cancelAnimationFrame(animationFrame);
		};
	});

	// Custom smooth scroll function (easeOutQuart for smooth deceleration like GSAP power3.out)
	function smoothScrollTo(element: HTMLElement, targetTop: number, duration: number) {
		const startTop = element.scrollTop;
		const distance = targetTop - startTop;
		let startTime: number | null = null;

		function animation(currentTime: number) {
			if (startTime === null) startTime = currentTime;
			const timeElapsed = currentTime - startTime;
			const progress = Math.min(timeElapsed / duration, 1);

			// easeOutQuart
			const easeProgress = 1 - Math.pow(1 - progress, 4);

			element.scrollTop = startTop + distance * easeProgress;

			if (timeElapsed < duration) {
				requestAnimationFrame(animation);
			}
		}
		requestAnimationFrame(animation);
	}

	// Auto-scroll
	$effect(() => {
		if (activeIndex >= 0 && containerRef) {
			const activeElement = containerRef.children[activeIndex] as HTMLElement;
			if (activeElement) {
				const containerHeight = containerRef.clientHeight;
				const elementOffset = activeElement.offsetTop;
				const elementHeight = activeElement.clientHeight;

				const targetTop = elementOffset - containerHeight / 2.5 + elementHeight / 2;
				smoothScrollTo(containerRef, targetTop, 1000); // Slower 1000ms transition
			}
		}
	});
</script>

<div
	class="relative flex h-100 w-full flex-col overflow-hidden rounded-2xl border border-surface-2 bg-surface-0 shadow-xl transition-colors"
>
	<!-- Glowing background accent -->
	<div
		class="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[100px]"
	></div>

	<!-- Fading edges for the scrolling effect -->
	<div
		class="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-linear-to-b from-surface-0 to-transparent"
	></div>
	<div
		class="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-linear-to-t from-surface-0 to-transparent"
	></div>

	<div
		bind:this={containerRef}
		class="scrollbar-hidden flex h-full w-full flex-col gap-10 overflow-y-auto px-8 pt-37.5 pb-75 md:gap-14"
	>
		{#each someoneLikeYouLyrics as lyric, i (lyric.time)}
			<p
				class="lyric-line wrap-break-words mx-auto block w-full max-w-[80%] origin-center py-2 text-center text-balance whitespace-normal outline-none
                {i === activeIndex
					? 'active-line text-text-primary opacity-100'
					: 'scale-[0.95] text-text-muted/60 opacity-50 blur-[2px] filter'}"
			>
				{lyric.text}
			</p>
		{/each}
	</div>
</div>

<style>
	.lyric-line {
		transition: all 1s cubic-bezier(0.23, 1, 0.32, 1);
		will-change: transform, opacity, filter;
		font-weight: 800;
		font-size: 1.5rem;
		line-height: 1.2;
		letter-spacing: -0.02em;
	}

	@media (min-width: 768px) {
		.lyric-line {
			font-size: 2.5rem;
		}
	}

	.active-line {
		transform: scale(1.15);
		text-shadow: 0 0 30px var(--color-accent-glow);
	}
</style>
