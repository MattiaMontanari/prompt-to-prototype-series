# Class website

A static article for the 8 December 2025 class, using plain HTML, CSS and JavaScript. The article is adapted from the existing class notes; no transcript has been supplied. It uses local images and needs no package installation or API key.

## Local development

From the repository root:

```bash
python3 -m http.server 8000 --directory site
```

The document is `site/index.html`. Update its text and files in `site/assets/` directly. All site URLs are relative so the same files work under the GitHub Pages project path.

Before publishing:

```bash
python3 scripts/check_site.py
node --check site/assets/script.js
```

## GitHub Pages

In the repository's **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source. The workflow in `.github/workflows/pages.yml` validates pull requests and deploys website changes on `main`. It can also be started manually from the Actions tab.

Only `site/` is uploaded. The dated course folders, Python agent and any future source transcripts outside `site/` are not included in the website artifact. The expected project URL is:

```text
https://mattiamontanari.github.io/prompt-to-prototype-series/
```

The workflow uses the repository's automatic `GITHUB_TOKEN`; no personal token or AI credential is needed for deployment. Generated HTML does not need a separate `gh-pages` branch.

## Sources and attribution

- [Original class notes](../2025-12-08/README.md)
- Images copied from `2025-12-08/input.png` and `2025-12-08/lesson/mermaid-diagram-2025-12-08-134132.png`
- Layout inspired by [Distill](https://distill.pub/)

Mattia Montanari · University of Oxford · IT Services · Digital Capabilities

[![CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

This work is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).
