"use strict";

for (const button of document.querySelectorAll('[data-copy-target]')) {
  const source = document.getElementById(button.dataset.copyTarget);
  const status = button.parentElement.querySelector('[role="status"]');
  if (!source || !status) continue;
  button.hidden = false;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(source.textContent.trim());
      status.textContent = 'Copied to clipboard.';
    } catch {
      const selection = window.getSelection();
      if (!selection) return;
      const range = document.createRange();
      range.selectNodeContents(source);
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Source selected. Use your device’s copy command.';
    }
  });
}

const catalogue = document.getElementById('catalogue-controls');
if (catalogue) {
  catalogue.hidden = false;
  const search = document.getElementById('lecture-search');
  const cards = [...document.querySelectorAll('.lecture-card')];
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const count = document.getElementById('lecture-count');
  const empty = document.getElementById('no-lectures');
  let filter = 'all';
  const normalize = text => text.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
  function update() {
    const query = normalize(search.value.trim());
    let visible = 0;
    for (const card of cards) {
      card.hidden = !((filter === 'all' || card.dataset.topic === filter) && normalize(card.dataset.search).includes(query));
      if (!card.hidden) visible++;
    }
    count.textContent = `${visible} ${visible === 1 ? 'lecture' : 'lectures'}`;
    empty.hidden = visible !== 0;
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
  }
  for (const button of buttons) button.addEventListener('click', () => { filter = button.dataset.filter; update(); });
  search.addEventListener('input', update);
  document.getElementById('clear-filters').addEventListener('click', () => {
    search.value = '';
    filter = 'all';
    update();
    search.focus();
  });
  update();
}
