<script lang="ts">
	import { onMount } from 'svelte';

	type MaintenanceStatus = {
		lament: boolean;
		lament_api: boolean;
		description: string;
		updated_at: string;
	};

	let status = $state<MaintenanceStatus | null>(null);
	let isError = $state(false);

	onMount(async () => {
		try {
			const res = await fetch('https://api.lament.rynds.my.id/maintenance');
			if (!res.ok) throw new Error('Failed to fetch status');
			status = await res.json();
		} catch (e) {
			console.error('Failed to fetch maintenance status:', e);
			isError = true;
		}
	});

	let isMaintenance = $derived(status ? status.lament || status.lament_api : false);
	let dotColor = $derived(
		isError
			? 'bg-yellow-500'
			: status === null
				? 'bg-gray-400'
				: isMaintenance
					? 'bg-red-500'
					: 'bg-green-500'
	);
	let pingColor = $derived(
		isError
			? 'bg-yellow-500'
			: status === null
				? 'bg-gray-400'
				: isMaintenance
					? 'bg-red-500'
					: 'bg-green-500'
	);

	let tooltipText = $derived.by(() => {
		if (isError) return 'Failed to fetch status';
		if (!status) return 'Checking status...';
		if (isMaintenance) {
			const systems = [];
			if (status.lament) systems.push('Web');
			if (status.lament_api) systems.push('API');
			return `Maintenance: ${systems.join(' & ')} ${status.description ? '- ' + status.description : ''}`;
		}
		return 'All systems operational';
	});
</script>

<div class="hover:bg-surface-2 flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors" title={tooltipText}>
	<div class="relative flex h-2.5 w-2.5 items-center justify-center">
		{#if status !== null && !isError && !isMaintenance}
			<span
				class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 {pingColor}"
			></span>
		{/if}
		<span class="relative inline-flex h-2.5 w-2.5 rounded-full {dotColor}"></span>
	</div>
	<span class="text-text-muted hidden text-xs font-medium sm:inline">
		{isMaintenance ? 'Maintenance' : 'Operational'}
	</span>
</div>
