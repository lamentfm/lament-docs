<script lang="ts">
	type Param = {
		name: string;
		type: string;
		required?: boolean;
		description: string;
		default?: string;
	};

	let {
		title = 'Parameters',
		params
	}: {
		title?: string;
		params: Param[];
	} = $props();
</script>

{#if params.length > 0}
	<div class="my-4">
		<h4 class="text-text-primary mb-2 text-sm font-semibold">{title}</h4>
		<div class="rounded-md border-surface-2 overflow-hidden border">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-surface-2 bg-surface-1 border-b">
						<th class="text-text-primary px-4 py-2 text-left text-xs font-semibold tracking-wider uppercase"
							>Name</th
						>
						<th class="text-text-primary px-4 py-2 text-left text-xs font-semibold tracking-wider uppercase"
							>Type</th
						>
						<th class="text-text-primary px-4 py-2 text-left text-xs font-semibold tracking-wider uppercase"
							>Description</th
						>
					</tr>
				</thead>
				<tbody>
					{#each params as param (param.name)}
						<tr class="border-surface-2 border-b last:border-b-0">
							<td class="px-4 py-2.5">
								<code class="rounded-md bg-surface-1 text-text-primary px-1.5 py-0.5 text-xs font-medium"
									>{param.name}</code
								>
								{#if param.required}
									<span class="text-text-primary ml-1 text-xs">*</span>
								{/if}
							</td>
							<td class="px-4 py-2.5">
								<span class="text-text-primary text-xs">{param.type}</span>
							</td>
							<td class="text-text-primary px-4 py-2.5">
								{param.description}
								{#if param.default}
									<span class="text-text-primary ml-1 text-xs">Default: {param.default}</span>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
{/if}
