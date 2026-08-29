<script lang="ts">
	let {
		method
	}: {
		method: string;
	} = $props();

	const colors: Record<string, string> = {
		GET: 'bg-[rgba(125,171,134,0.15)] text-success',
		POST: 'bg-[rgba(212,132,122,0.15)] text-accent',
		PUT: 'bg-[rgba(201,169,122,0.15)] text-secondary',
		DELETE: 'bg-[rgba(196,113,108,0.15)] text-error',
		PATCH: 'bg-[rgba(201,169,122,0.15)] text-secondary'
	};

	const colorClass = $derived(colors[method.toUpperCase()] ?? colors.GET);
</script>

<span
	class="{colorClass} rounded-md inline-flex items-center px-2 py-0.5 font-mono text-xs font-bold uppercase"
>
	{method}
</span>
