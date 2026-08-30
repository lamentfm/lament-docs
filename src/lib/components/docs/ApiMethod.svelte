<script lang="ts">
	let {
		method
	}: {
		method: string;
	} = $props();

	const colors: Record<string, string> = {
		GET: 'bg-success/15 text-success',
		POST: 'bg-accent/15 text-accent',
		PUT: 'bg-secondary/15 text-secondary',
		DELETE: 'bg-error/15 text-error',
		PATCH: 'bg-secondary/15 text-secondary'
	};

	const colorClass = $derived(colors[method.toUpperCase()] ?? colors.GET);
</script>

<span
	class="{colorClass} rounded-md inline-flex items-center px-2 py-0.5 font-mono text-xs font-bold uppercase"
>
	{method}
</span>
