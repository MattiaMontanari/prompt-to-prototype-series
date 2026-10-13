# Course website

A static lecture collection using plain HTML, CSS and JavaScript. The four articles are adapted from the original dated class notes, source code and saved artifacts. Transcripts have not been supplied. The website needs no package installation or AI API key.

## Content and pages

- `site/index.html`: lecture catalogue, search, topic filters and course introduction.
- `site/lectures/2025-11-24/index.html`: Hugo and multilingual content.
- `site/lectures/2025-12-01/index.html`: language models, tools and the agent loop.
- `site/lectures/2025-12-08/index.html`: legacy charts and Mermaid.
- `site/lectures/2025-12-15/index.html`: Gemini, equations, charts and a PDF viewer.

The dated repository folders remain the original source materials. Website articles link back to them and describe missing artifacts where that affects what can be verified.

## Design and learning tools

All pages use `site/assets/style.css`. Shared tokens define the blue accent, neutral surfaces, spacing, rounded cards and controls. The catalogue combines a publication-style introduction with a browsable card collection inspired by Facebook Marketplace. Articles retain a focused reading column with margin notes and wider figures.

`site/assets/script.js` handles catalogue filters and source copying. `site/assets/learning.js` provides one small teaching tool for each lecture:

| Lecture | Opportunity | Tool and scope |
| --- | --- | --- |
| Hugo | Make the relationship between source, template and output visible | A simple Markdown preview with independent English/Italian drafts and illustrative output paths; it does not run Hugo or translate text |
| Agents | Show the return path from a tool result into model context | A deterministic trace with two example requests and conversation history; it does not call a model or access the visitor's filesystem |
| Mermaid | Make the branching structure inspectable | A stepper tracing the homogeneous and unhomogeneous routes, with an explicitly simplified flowchart |
| Gemini | Show why chart appearance alone is insufficient to check data | An editable illustrative CSV chart with zero/cropped axes, sorting, input validation and a text list of the actual values |

Each interaction is labelled as a teaching example. The Gemini chart does not use the missing original CSV. The PDF viewer is shown through its saved recording, rather than an invented reconstruction of unavailable application code.

Lecture text, navigation, figures and source links remain available without JavaScript. The catalogue then displays all lectures; learning tools show their example descriptions or values. Interactive controls are keyboard accessible. Source copying selects the text for manual copying if clipboard access is unavailable.

## Local development

From the repository root:

```bash
python3 -m http.server 8000 --directory site
```

Edit the HTML pages directly. Header, byline, footer and adjacent-lecture links use the same markup conventions across articles. All site URLs are relative so they work under the GitHub Pages project path.

Before publishing:

```bash
python3 scripts/check_site.py
for script in site/assets/*.js; do
  node --check "$script"
done
```

The checker validates local links, anchors, copy targets, image descriptions, page headings, and credits/license on every page. Browser checks should also exercise catalogue filters, language drafts, agent/flow step controls, CSV errors and resets, and narrow layouts when those features change.

## Media

Existing PNGs are copied into `site/assets/`. Demo recordings are compressed as MP4 with fast-start metadata, and load on demand. The original source media remain in the dated course folders. No remote rendering service or JavaScript CDN is required.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` validates pull requests and deploys website changes on `main`. It can also be started manually from the Actions tab. Pages uses **GitHub Actions** as its publishing source.

Only `site/` is uploaded. Source transcripts, Python applications and development documentation outside that directory are not included in the deployment. The published project URL is:

```text
https://mattiamontanari.github.io/prompt-to-prototype-series/
```

The workflow uses the repository's automatic `GITHUB_TOKEN`; no personal token or AI credential is needed. A separate `gh-pages` branch is unnecessary.

## Attribution

Original class materials: Mattia Montanari · University of Oxford · IT Services · Digital Capabilities.

Design references: [Distill](https://distill.pub/) for explanatory articles and [Facebook Marketplace](https://www.facebook.com/marketplace/) for the catalogue's visual conventions. This is an independent course website.

[![CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

This work is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).
