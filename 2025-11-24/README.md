# Building Multilingual Websites with Hugo

**Session Date:** November 24, 2025  
**Course:** From Prompt to Prototype  
**Topic:** Static Site Generation with Hugo

## Overview

In this session, we migrated a personal website to a fresh Hugo template with automatic multilingual content generation.

## What We Built

- Template migration from existing site to modern Hugo theme
- Automated multilingual content management (EN/IT)
- Static site generation workflow

## Key Concepts

### Hugo Fundamentals
- Static site generation with markdown
- Go templates and theming
- Content organization

### Multilingual Implementation
- i18n configuration
- Language-specific content directories
- Automatic language switching

### Template Migration
- Theme selection and installation
- Content transfer and adaptation
- Build and deployment

## Quick Start

### Installation

```bash
# macOS
brew install hugo

# Linux
sudo apt-get install hugo

# Windows
choco install hugo-extended -confirm
```

### Basic Commands

```bash
hugo new site mysite
hugo server -D
hugo --minify
```

### Multilingual Configuration

```toml
[languages]
  [languages.en]
    languageName = "English"
    weight = 1
    contentDir = "content/en"
    
  [languages.it]
    languageName = "Italiano"
    weight = 2
    contentDir = "content/it"
```

## Resources

- [Hugo Documentation](https://gohugo.io/documentation/)
- [Hugo Themes](https://themes.gohugo.io/)
- [Multilingual Mode](https://gohugo.io/content-management/multilingual/)

---

## Session Outcome

Fresh template for personal page with automatically generated multilingual content:

![Session Outcome](lesson/2025-12-01-13-46-48.png)

---

<div align="center">

**[← Back to Course Home](../README.md)**

*Part of the "From Prompt to Prototype" series*  
*University of Oxford | Digital Capabilities*

---

[![CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

</div>