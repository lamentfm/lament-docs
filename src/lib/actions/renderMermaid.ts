import mermaid from 'mermaid';

function initMermaidTheme() {
	const isLight = typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light';

	mermaid.initialize({
		startOnLoad: false,
		theme: isLight ? 'neutral' : 'dark',
		themeVariables: {
			darkMode: !isLight,
			background: isLight ? '#f2f0ec' : '#101012',
			primaryColor: isLight ? '#c07168' : '#d4847a',
			primaryTextColor: isLight ? '#2b2926' : '#f2f0ec',
			primaryBorderColor: isLight ? '#e3dfd8' : '#282830',
			lineColor: isLight ? '#c07168' : '#d4847a',
			secondaryColor: isLight ? '#ece9e4' : '#16161a',
			tertiaryColor: isLight ? '#f2f0ec' : '#101012'
		},
		securityLevel: 'loose'
	});
}

export function renderMermaid(node: HTMLElement) {
	if (typeof window === 'undefined') return;

	initMermaidTheme();

	async function renderDiagrams() {
		const codeBlocks = node.querySelectorAll<HTMLElement>('pre.language-mermaid, pre > code.language-mermaid');
		let idCounter = 0;

		for (const el of Array.from(codeBlocks)) {
			const pre = el.tagName === 'PRE' ? el : el.closest('pre');
			if (!pre || pre.dataset.rendered === 'true') continue;

			pre.dataset.rendered = 'true';
			const text = el.textContent || '';
			const id = `mermaid-diagram-${Date.now()}-${idCounter++}`;

			try {
				const { svg } = await mermaid.render(id, text);
				const container = document.createElement('div');
				container.className =
					'mermaid-container my-6 flex justify-center overflow-x-auto rounded-xl border border-surface-2 bg-surface-1/70 p-6 shadow-md backdrop-blur-md';
				container.innerHTML = svg;
				pre.replaceWith(container);
			} catch (err) {
				console.error('[Mermaid] Render error:', err);
				const errorEl = document.getElementById(`d${id}`);
				if (errorEl) errorEl.remove();
			}
		}
	}

	renderDiagrams();

	const observer = new MutationObserver(() => {
		renderDiagrams();
	});

	observer.observe(node, { childList: true, subtree: true });

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
