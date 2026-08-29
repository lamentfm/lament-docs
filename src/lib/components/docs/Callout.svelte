<script lang="ts">
	import { Info, Lightbulb, AlertTriangle, ShieldAlert, CircleAlert } from 'lucide-svelte';

	let {
		type = 'note',
		title,
		children
	}: {
		type?: 'note' | 'tip' | 'warning' | 'caution' | 'important';
		title?: string;
		children?: import('svelte').Snippet;
	} = $props();

	const config = {
		note: {
			icon: Info,
			label: 'Note',
			borderClass: 'border-l-',
			iconClass: 'text-text-primary',
			bgClass: 'bg-surface-1'
		},
		tip: {
			icon: Lightbulb,
			label: 'Tip',
			borderClass: 'border-l-',
			iconClass: 'text-text-primary',
			bgClass: 'bg-[rgba(125,171,134,0.08)]'
		},
		warning: {
			icon: AlertTriangle,
			label: 'Warning',
			borderClass: 'border-l-',
			iconClass: 'text-text-primary',
			bgClass: 'bg-surface-1'
		},
		caution: {
			icon: ShieldAlert,
			label: 'Caution',
			borderClass: 'border-l-',
			iconClass: 'text-text-primary',
			bgClass: 'bg-[rgba(196,113,108,0.08)]'
		},
		important: {
			icon: CircleAlert,
			label: 'Important',
			borderClass: 'border-l-',
			iconClass: 'text-text-primary',
			bgClass: 'bg-surface-1'
		}
	};

	const c = $derived(config[type]);
	const Icon = $derived(c.icon);
</script>

<div class="{c.bgClass} {c.borderClass} rounded-r- my-4 border-l-[3px] px-4 py-3" role="note">
	<div class="mb-1 flex items-center gap-2">
		<Icon size={16} class={c.iconClass} />
		<span class="{c.iconClass} text-sm font-semibold">{title ?? c.label}</span>
	</div>
	<div class="text-text-primary text-sm leading-relaxed">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
