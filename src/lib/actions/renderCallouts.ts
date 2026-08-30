export function renderCallouts(node: HTMLElement) {
	if (typeof window === 'undefined') return;

	function transformBlockquotes() {
		const blockquotes = node.querySelectorAll<HTMLQuoteElement>('blockquote');

		blockquotes.forEach((bq) => {
			if (bq.dataset.renderedCallout === 'true') return;

			const html = bq.innerHTML;
			const text = bq.textContent || '';

			// Match [!NOTE], [!TIP], [!IMPORTANT], [!WARNING], [!CAUTION]
			const match = text.match(/\[\!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
			if (!match) return;

			bq.dataset.renderedCallout = 'true';
			const type = match[1].toUpperCase();

			const configs: Record<
				string,
				{
					label: string;
					iconSvg: string;
					styleAttr: string;
				}
			> = {
				IMPORTANT: {
					label: 'Important',
					iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-accent);"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>`,
					styleAttr: 'border-left: 3px solid var(--color-accent); background-color: var(--color-accent-glow);'
				},
				NOTE: {
					label: 'Note',
					iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-text-secondary);"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
					styleAttr: 'border-left: 3px solid var(--color-surface-4); background-color: var(--color-surface-1);'
				},
				TIP: {
					label: 'Tip',
					iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-secondary);"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
					styleAttr: 'border-left: 3px solid var(--color-secondary); background-color: var(--color-secondary-glow);'
				},
				WARNING: {
					label: 'Warning',
					iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-secondary);"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>`,
					styleAttr: 'border-left: 3px solid var(--color-secondary); background-color: var(--color-secondary-glow);'
				},
				CAUTION: {
					label: 'Caution',
					iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-error);"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
					styleAttr: 'border-left: 3px solid var(--color-error); background-color: rgba(196, 113, 108, 0.12);'
				}
			};

			const cfg = configs[type] || configs.NOTE;

			// Clean content: remove "[!TYPE]" tag and leading quotes/spaces
			let cleanHtml = html
				.replace(/\[\!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/gi, '')
				.replace(/^(\s*<p[^>]*>)?\s*“?\s*/, '$1')
				.replace(/\s*”?\s*(<\/p>\s*)?$/, '$1');

			const container = document.createElement('div');
			container.className = 'callout-box my-5 rounded-r-md px-4 py-3.5 text-sm not-italic shadow-xs';
			container.setAttribute('style', `${cfg.styleAttr} color: var(--color-text-primary);`);
			container.innerHTML = `
				<div class="callout-header mb-1.5 flex items-center gap-2 font-semibold text-sm" style="color: var(--color-text-primary);">
					${cfg.iconSvg}
					<span>${cfg.label}</span>
				</div>
				<div class="callout-content leading-relaxed not-italic [&_p]:my-1 [&_p]:not-italic [&_p]:text-[var(--color-text-primary)]" style="color: var(--color-text-primary);">
					${cleanHtml}
				</div>
			`;

			bq.replaceWith(container);
		});
	}

	transformBlockquotes();

	const observer = new MutationObserver(() => {
		transformBlockquotes();
	});

	observer.observe(node, { childList: true, subtree: true });

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
