<script lang="ts">
	import Logo from '$lib/components/ui/Logo.svelte';
</script>

<footer class="border-t border-surface-2 bg-surface-1">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
		<div class="flex items-center gap-3">
			<Logo size="24px" class="text-text-primary" />
			<span class="text-xs text-text-primary">
				&copy; {new Date().getFullYear()} Lament. Music Streaming Infrastructure.
				<span class="mx-1 text-text-muted">|</span>
				Made by
				<a
					href="https://rynds.my.id/"
					target="_blank"
					rel="noopener noreferrer"
					class="text-text-primary transition-colors hover:text-accent hover:underline">Roni.</a
				>
			</span>
		</div>
		<a
			href="https://github.com/ryndsr/lament"
			target="_blank"
			rel="noopener noreferrer"
			class="text-xs text-text-secondary transition-colors hover:text-text-primary"
		>
			GitHub
		</a>
	</div>
</footer>
