# AGENTS.md

## Project Overview

This repository contains course materials for "From Prompt to Prototype: A 60 Minute AI Experiment," a series of live coding sessions at the University of Oxford exploring practical AI-assisted development.

Each dated folder (e.g., `2025-11-24/`, `2025-12-01/`) represents a self-contained session with working code, documentation, and demos.

## Tone of Voice

When editing or creating documentation in this repository, maintain a **professional, educational tone**:

- Use plain English without jargon where possible
- Be direct and factual
- Avoid enthusiastic language, exclamation marks (except in commands/warnings), and excessive emojis
- Focus on technical accuracy and clarity
- Write as if documenting for peers, not marketing to customers

Examples:
- Good: "This session explores the differences between LLMs and agents."
- Avoid: "Get ready to dive into the amazing world of AI agents!"

## License

All content in this repository is licensed under **CC BY-NC-SA 4.0 International** (Creative Commons Attribution-NonCommercial-ShareAlike 4.0).

Key requirements:
- **Attribution**: Credit must be given to the University of Oxford, IT Services, Digital Capabilities
- **NonCommercial**: Materials cannot be used for commercial purposes
- **ShareAlike**: Derivative works must use the same license
- Link to license: https://creativecommons.org/licenses/by-nc-sa/4.0/

When adding or modifying content:
1. Ensure the license badge and link appear at the bottom of all README files
2. Do not remove or modify license attributions
3. If creating derivative works, apply the same license

## Repository Structure

```
ox-prompt-to-prototype-series/
├── README.md              # Main landing page
├── AGENTS.md              # This file
├── 2025-11-24/           # Session 1: Hugo static sites
│   ├── README.md
│   └── lesson/
├── 2025-12-01/           # Session 2: AI agents
│   ├── agent.py
│   ├── server.py
│   ├── README.md
│   └── lesson/
└── [future sessions]/
```

## Main README Structure

The main README.md should follow this order:

1. **Title and registration badge**
2. **About This Course** - Brief overview (3 short paragraphs)
3. **Course Sessions table** - Listed in reverse chronological order (latest first)
4. **Course Details** - Format, duration, level, audience, provider, fee
5. **Learning Objectives**
6. **Digital Capabilities Covered**
7. **Course Registration**
8. **Session Materials**
9. **Prerequisites**
10. **Repository Structure**
11. **Connect & Learn More**
12. **License**

### Course Sessions Table Requirements

- Order: Reverse chronological (newest session first)
- Description: Maximum length of a long title (approximately one sentence, 10-15 words)
- Columns: Date, Topic (with link), Description, Demo (image/GIF)
- Keep descriptions concise and factual

## Session README Structure

Each session README should follow this structure:

1. **Title** - Clear session topic
2. **Session metadata** - Date, course name, topic
3. **Overview** - Brief description of what was covered
4. **What We Built** - Bullet list of deliverables
5. **Key Concepts** - Main technical concepts explained
6. **Setup/Installation** - Technical instructions
7. **Usage** - How to run the code
8. **Resources** - External links (optional)
9. **Session Outcome** - Visual demo (screenshot/GIF)
10. **Footer** - Navigation back to main README and license

## Code Style

When working with Python code (e.g., in `2025-12-01/`):
- Follow PEP 8 conventions
- Use type hints where applicable
- Keep functions focused and single-purpose
- Add docstrings to classes and non-trivial functions
- Virtual environments should be in `venv/` (not committed)

## Documentation Guidelines

### README Files

- Keep main README concise with overview and navigation
- Session READMEs should be comprehensive but scannable
- Use code blocks with language tags for syntax highlighting
- Include setup instructions assuming basic technical knowledge
- Link between documents using relative paths

### Images and Media

- Store demo materials in `lesson/` subdirectories
- Use descriptive filenames (e.g., `p2p-course-01-12-2025-create-agent.gif`)
- Reference images with relative paths
- GIFs should be under 5MB for GitHub display

### Links

- Use full URLs for external resources
- Use relative paths for internal navigation (e.g., `../README.md`)
- Ensure all links are functional before committing

## Course Context

These materials support live teaching sessions where:
- Sessions are 60 minutes long
- Format is unscripted live coding
- Audience includes educators, developers, and AI-interested university members
- Focus is on practical demonstration of AI tools in real development scenarios

When updating materials, consider that they may be used both:
1. During live sessions as reference
2. By students afterward for self-study

## Testing

Before committing changes:
- Verify all relative links work
- Check that code examples run as documented
- Ensure images display correctly
- Validate that license information is present and correct
- Review for tone consistency

## Questions or Modifications

If you need to make significant structural changes or are unsure about tone/style, consult the main README and existing session materials as reference examples.

