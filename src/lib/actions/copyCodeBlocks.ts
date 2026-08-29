export function copyCodeBlocks(node: HTMLElement) {
	function attachButtons() {
		const preElements = node.querySelectorAll('pre');

		preElements.forEach((pre) => {
			if (pre.querySelector('.copy-btn')) return; // Already attached

			if (window.getComputedStyle(pre).position === 'static') {
				pre.style.position = 'relative';
			}
			pre.classList.add('group');

			const btn = document.createElement('button');
			btn.className =
				'copy-btn absolute top-2 right-2 p-1.5 rounded-md bg-surface-1/80 text-text-muted hover:bg-surface-2 hover:text-text-primary transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm z-10 border border-surface-2';
			btn.setAttribute('aria-label', 'Copy code');
			btn.title = 'Copy code';

			const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
			const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

			btn.innerHTML = copyIcon;

			btn.addEventListener('click', async () => {
				const codeElement = pre.querySelector('code');
				const code = codeElement ? codeElement.innerText : pre.innerText;

				try {
					await navigator.clipboard.writeText(code);
					btn.innerHTML = checkIcon;
					setTimeout(() => {
						btn.innerHTML = copyIcon;
					}, 2000);
				} catch (err) {
					console.error('Failed to copy', err);
				}
			});

			pre.appendChild(btn);
		});
	}

	// Initial attachment
	attachButtons();

	// Observe for subsequent navigations/updates
	const observer = new MutationObserver(() => {
		attachButtons();
	});

	observer.observe(node, { childList: true, subtree: true });

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
