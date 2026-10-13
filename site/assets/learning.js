"use strict";

// The learning tools use local examples; no API calls or external libraries.
const hugoLab = document.getElementById('hugo-lab');
if (hugoLab) {
  const editor = document.getElementById('hugo-markdown');
  const language = document.getElementById('hugo-language');
  const preview = document.getElementById('hugo-preview');
  const defaults = {
    en: '# My first prototype\n\nA small experiment with a static website.\n\n## What I learned\nContent and presentation can be edited separately.',
    it: '# Il mio primo prototipo\n\nUn piccolo esperimento con un sito statico.\n\n## Cosa ho imparato\nContenuto e presentazione possono essere modificati separatamente.'
  };
  let drafts = { ...defaults };
  let current = language.value;
  function render() {
    drafts[current] = editor.value;
    preview.replaceChildren();
    let paragraph = [];
    const append = (tag, text) => {
      const node = document.createElement(tag);
      node.textContent = text;
      preview.append(node);
    };
    function flush() {
      if (paragraph.length) append('p', paragraph.join(' '));
      paragraph = [];
    }
    for (const line of editor.value.split(/\r?\n/)) {
      const heading = line.match(/^(#{1,3})\s+(.+)$/);
      if (heading) { flush(); append(`h${heading[1].length + 2}`, heading[2]); }
      else if (!line.trim()) flush();
      else paragraph.push(line);
    }
    flush();
    if (!preview.children.length) append('p', 'Write a heading or paragraph to see it here.');
    preview.lang = current;
    document.getElementById('hugo-source-path').textContent = `content/${current}/posts/hello.md`;
    document.getElementById('hugo-output-path').textContent = `public/${current}/posts/hello/index.html`;
  }
  editor.addEventListener('input', render);
  language.addEventListener('change', () => {
    current = language.value;
    editor.value = drafts[current];
    render();
  });
  document.getElementById('hugo-reset').addEventListener('click', () => {
    drafts = { ...defaults };
    editor.value = drafts[current];
    render();
  });
  render();
}

const agentLab = document.getElementById('agent-lab');
if (agentLab) {
  const task = document.getElementById('agent-task');
  const next = document.getElementById('agent-next');
  const memory = document.getElementById('agent-memory');
  const stages = [...agentLab.querySelectorAll('[data-stage]')];
  const examples = {
    read: [
      ['Receive a request', 'The request enters the conversation. The file contents are not yet available to the model.', 'User request', 'Read class-note.txt.'],
      ['Choose a tool', 'The assistant requests read_file. The application will execute the requested operation.', 'Assistant tool request', 'read_file({"file_path": "class-note.txt"})'],
      ['Return the file contents', 'The application returns the result as a tool_result inside a user message. The next model call receives this history.', 'Tool result (user message)', 'An agent combines a model, tools and a decision loop.'],
      ['Reply using the result', 'The assistant can now answer from the returned text. An end_turn response ends this trace.', 'Assistant reply', 'The note says an agent combines a model, tools and a decision loop.']
    ],
    list: [
      ['Receive a request', 'The request asks about the example environment. No directory contents have been returned yet.', 'User request', 'What files are in the example directory?'],
      ['Choose a tool', 'The assistant requests list_directory rather than inventing a list of files.', 'Assistant tool request', 'list_directory({"path": "."})'],
      ['Return the directory listing', 'The application returns the example filenames. They become input to the next model call.', 'Tool result (user message)', 'class-note.txt\noutline.txt'],
      ['Reply using the result', 'The assistant describes the returned listing. The tool supplied the information used in this answer.', 'Assistant reply', 'The example directory contains class-note.txt and outline.txt.']
    ]
  };
  let step = -1;
  function render() {
    const trace = examples[task.value];
    memory.replaceChildren();
    for (let i = 0; i <= step; i++) {
      const item = document.createElement('li');
      const role = document.createElement('strong');
      role.textContent = trace[i][2];
      item.append(role, document.createTextNode(trace[i][3]));
      memory.append(item);
    }
    if (step < 0) {
      const empty = document.createElement('li');
      empty.textContent = 'The conversation will appear here.';
      empty.className = 'empty-memory';
      memory.append(empty);
    }
    for (let i = 0; i < stages.length; i++) {
      stages[i].classList.toggle('is-active', i === step);
      stages[i].classList.toggle('is-done', i < step);
      if (i === step) stages[i].setAttribute('aria-current', 'step');
      else stages[i].removeAttribute('aria-current');
    }
    document.getElementById('agent-step-title').textContent = step < 0 ? 'Ready to start' : trace[step][0];
    document.getElementById('agent-explanation').textContent = step < 0 ? 'Start the trace to see how a request becomes a tool call and a reply.' : trace[step][1];
    document.getElementById('agent-event').textContent = step < 0 ? 'No request yet.' : trace[step][3];
    next.disabled = step === trace.length - 1;
    next.textContent = step < 0 ? 'Start trace' : next.disabled ? 'Trace complete' : 'Next step';
  }
  next.addEventListener('click', () => { if (step < examples[task.value].length - 1) step++; render(); });
  document.getElementById('agent-reset').addEventListener('click', () => { step = -1; render(); });
  task.addEventListener('change', () => { step = -1; render(); });
  render();
}

const flowLab = document.getElementById('flow-lab');
if (flowLab) {
  const branch = document.getElementById('flow-branch');
  const previous = document.getElementById('flow-back');
  const next = document.getElementById('flow-next');
  const routes = {
    homogeneous: ['input', 'split', 'homogeneous', 'pod', 'model', 'output'],
    unhomogeneous: ['input', 'split', 'unhomogeneous', 'output']
  };
  const descriptions = {
    input: ['Input snapshots', 'The saved diagram starts with the input snapshots used by the modelling workflow.'],
    split: ['Decompose the solution', 'The chart separates homogeneous and unhomogeneous contributions. Both branches ultimately contribute to the output.'],
    homogeneous: ['Homogeneous solution', 'This branch proceeds to a reduced-basis construction. It follows the longer modelling route in the saved chart.'],
    unhomogeneous: ['Unhomogeneous solution', 'This contribution connects directly to the output through the dashed edge. It does not pass through POD in the saved diagram.'],
    pod: ['Build a reduced basis', 'Proper orthogonal decomposition (POD) is used to construct the homogeneous reduced basis in this workflow.'],
    model: ['Construct and use the reduced model', 'The full diagram continues through weak formulation, discretization and postprocessing. Those three stages are grouped in this teaching view.'],
    output: ['Combine contributions in the output', 'Both routes reach Output Results. Tracing only the longer branch would miss the direct contribution from the unhomogeneous solution.']
  };
  let step = 0;
  function render() {
    const route = routes[branch.value];
    const current = route[step];
    const visited = new Set(route.slice(0, step + 1));
    for (const node of flowLab.querySelectorAll('[data-node]')) {
      node.classList.toggle('current', node.dataset.node === current);
      node.classList.toggle('visited', visited.has(node.dataset.node));
    }
    for (const edge of flowLab.querySelectorAll('[data-from]')) {
      edge.classList.toggle('visited', visited.has(edge.dataset.from) && visited.has(edge.dataset.to));
    }
    const viewport = flowLab.querySelector('.flow-viewport');
    const active = flowLab.querySelector('.flow-node.current');
    const nodeBounds = active.getBoundingClientRect();
    const viewportBounds = viewport.getBoundingClientRect();
    viewport.scrollLeft += nodeBounds.left - viewportBounds.left - (viewport.clientWidth - nodeBounds.width) / 2;
    document.getElementById('flow-title').textContent = descriptions[current][0];
    document.getElementById('flow-explanation').textContent = descriptions[current][1];
    document.getElementById('flow-progress').textContent = `Step ${step + 1} of ${route.length}`;
    const list = document.getElementById('flow-route');
    list.replaceChildren();
    for (const [i, id] of route.entries()) {
      const item = document.createElement('li');
      item.textContent = descriptions[id][0];
      if (i === step) { item.className = 'current'; item.setAttribute('aria-current', 'step'); }
      list.append(item);
    }
    previous.disabled = step === 0;
    next.disabled = step === route.length - 1;
  }
  branch.addEventListener('change', () => { step = 0; render(); });
  previous.addEventListener('click', () => { if (step > 0) step--; render(); });
  next.addEventListener('click', () => { if (step < routes[branch.value].length - 1) step++; render(); });
  document.getElementById('flow-reset').addEventListener('click', () => { step = 0; render(); });
  render();
}

const chartLab = document.getElementById('chart-lab');
if (chartLab) {
  const input = document.getElementById('chart-csv');
  const zero = document.getElementById('chart-zero');
  const sort = document.getElementById('chart-sort');
  const error = document.getElementById('chart-error');
  const chart = document.getElementById('data-chart');
  const insight = document.getElementById('chart-insight');
  const initial = input.value;
  let data = [];
  let dirty = false;
  const format = value => new Intl.NumberFormat('en', { maximumFractionDigits: 2, notation: Math.abs(value) >= 10000 ? 'compact' : 'standard' }).format(value);
  function parse(text) {
    if (text.length > 6000) throw new Error('Keep the example CSV under 6,000 characters.');
    const lines = text.trim().split(/\r?\n/).filter(line => line.trim());
    if (lines.length < 2 || !/^[^,]+,[^,]+$/.test(lines[0])) throw new Error('Use a two-column header, followed by a label and a number on each row.');
    if (lines.length > 13) throw new Error('Use at most 12 data rows so the chart remains readable.');
    const labels = new Set();
    return lines.slice(1).map((line, index) => {
      const match = line.match(/^\s*(?:"((?:[^"]|"")*)"|([^",]+))\s*,\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)\s*$/i);
      if (!match) throw new Error(`Row ${index + 2}: use a label and a numeric value. Quote labels that contain commas.`);
      const label = (match[1] === undefined ? match[2] : match[1].replace(/""/g, '"')).trim();
      const value = Number(match[3]);
      if (!label || label.length > 40 || labels.has(label)) throw new Error(`Row ${index + 2}: use a unique label of 1–40 characters.`);
      if (!Number.isFinite(value) || value < 0 || value > 1e12) throw new Error(`Row ${index + 2}: values must be between 0 and 1 trillion.`);
      labels.add(label);
      return { label, value };
    });
  }
  function element(tag, attrs = {}, text) {
    const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, String(value));
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function draw() {
    const rows = [...data];
    if (sort.value === 'descending') rows.sort((a, b) => b.value - a.value);
    const maximum = Math.max(...rows.map(row => row.value));
    const minimum = Math.min(...rows.map(row => row.value));
    const baseline = zero.checked || minimum === 0 ? 0 : minimum * .8;
    const top = maximum > 0 ? maximum * 1.1 : 1;
    const y = value => 290 - (value - baseline) / (top - baseline) * 265;
    chart.replaceChildren(
      element('title', { id: 'chart-svg-title' }, 'Illustrative data chart'),
      element('desc', { id: 'chart-svg-desc' }, `Vertical axis starts at ${format(baseline)}. ${rows.map(row => `${row.label}: ${row.value}`).join('; ')}.`)
    );
    for (let i = 0; i <= 4; i++) {
      const value = baseline + (top - baseline) * i / 4;
      chart.append(element('line', { x1: 58, x2: 615, y1: y(value), y2: y(value), stroke: '#dce1e7' }));
      chart.append(element('text', { x: 49, y: y(value) + 4, 'text-anchor': 'end', 'font-size': 11, fill: '#606770' }, format(value)));
    }
    const slot = 550 / rows.length;
    rows.forEach((row, i) => {
      const x = 65 + slot * i + slot * .15;
      const bar = element('rect', { x, y: y(row.value), width: slot * .7, height: Math.max(0, 290 - y(row.value)), rx: 4, class: 'chart-bar', tabindex: 0, role: 'img', 'aria-label': `${row.label}: ${row.value}` });
      bar.append(element('title', {}, `${row.label}: ${row.value}`));
      chart.append(bar);
      chart.append(element('text', { x: x + slot * .35, y: Math.max(15, y(row.value) - 8), 'text-anchor': 'middle', 'font-size': 11, fill: '#1c1e21' }, format(row.value)));
      chart.append(element('text', { x: x + slot * .35, y: 310, 'text-anchor': 'middle', 'font-size': rows.length > 6 ? 9 : 11, fill: '#606770' }, row.label.length > 11 ? row.label.slice(0, 10) + '…' : row.label));
    });
    const list = document.getElementById('chart-values');
    list.replaceChildren();
    for (const row of rows) {
      const item = document.createElement('li');
      item.textContent = `${row.label}: ${row.value}`;
      list.append(item);
    }
    insight.textContent = `Axis starts at ${format(baseline)}. ${baseline ? 'Cropping the axis makes differences look larger; compare the values as well as the bar heights.' : 'A zero baseline keeps bar lengths proportional to the values.'}${dirty ? ' CSV edits have not been drawn yet.' : ''}`;
  }
  function apply() {
    try {
      const next = parse(input.value);
      data = next;
      dirty = false;
      error.textContent = '';
      input.removeAttribute('aria-invalid');
      draw();
    } catch (e) {
      error.textContent = `${e.message} The previous chart is unchanged.`;
      input.setAttribute('aria-invalid', 'true');
    }
  }
  input.addEventListener('input', () => { dirty = true; insight.textContent = 'CSV edits have not been drawn yet. Select Draw chart to apply them.'; });
  document.getElementById('chart-update').addEventListener('click', apply);
  zero.addEventListener('change', draw);
  sort.addEventListener('change', draw);
  document.getElementById('chart-reset').addEventListener('click', () => { input.value = initial; zero.checked = true; sort.value = 'source'; apply(); });
  apply();
}
