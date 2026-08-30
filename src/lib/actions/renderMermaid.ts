import mermaid from 'mermaid';

function getMermaidConfig() {
	const isLight = typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light';

	return {
		startOnLoad: false,
		theme: 'base',
		themeVariables: {
			darkMode: !isLight,
			background: 'transparent',
			mainBkg: isLight ? '#eae5dc' : '#1e1e24',
			nodeBorder: isLight ? '#c07168' : '#d4847a',
			nodeTextColor: isLight ? '#2b2926' : '#f2f0ec',
			lineColor: isLight ? '#c07168' : '#d4847a',
			textColor: isLight ? '#2b2926' : '#f2f0ec',
			labelBackground: isLight ? '#dfd9cf' : '#282832',
			clusterBkg: isLight ? '#f2ede4' : '#141418',
			clusterBorder: isLight ? '#d6cfc4' : '#2e2e36',
			titleColor: isLight ? '#2b2926' : '#f2f0ec',
			edgeLabelBackground: isLight ? '#eae5dc' : '#1e1e24'
		},
		securityLevel: 'loose'
	};
}

export function renderMermaid(node: HTMLElement) {
	if (typeof window === 'undefined') return;

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
				mermaid.initialize(getMermaidConfig() as any);
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
