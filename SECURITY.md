# Security Guidelines

This document outlines security best practices for the OX Prompt-to-Prototype Series projects.

## 🔐 API Key Protection

### ✅ What We Do Right

All projects in this repository follow secure API key management:

1. **Never Hardcode API Keys**
   - API keys are NEVER stored directly in code files
   - Keys are read from external sources at runtime

2. **External Storage**
   - API keys are stored in `~/ANTHROPIC_API_KEY` (your home directory)
   - This file is **outside** the git repository
   - Each user maintains their own key file

3. **Git Protection**
   - `.gitignore` excludes all sensitive files:
     ```
     ANTHROPIC_API_KEY
     *.key
     .env
     ```
   - Even if you accidentally create a key file in the repo, it won't be committed

### 🛡️ How API Keys Are Used

```python
# ✅ CORRECT: Read from external source
api_key = os.environ.get("ANTHROPIC_API_KEY")
if not api_key:
    api_key_path = Path.home() / "ANTHROPIC_API_KEY"
    with open(api_key_path, 'r') as f:
        api_key = f.read().strip()
```

```python
# ❌ WRONG: Never do this!
api_key = "sk-ant-your-actual-key-here"  # DON'T!
```

### 🚨 Before Pushing to GitHub

**Always check for secrets before committing:**

```bash
# 1. Check for API key patterns
grep -r "sk-ant-" .
grep -r "ANTHROPIC_API_KEY.*=" .

# 2. Check git status
git status

# 3. Review changes
git diff

# 4. Verify .gitignore is working
git ls-files | grep -i key
```

If this returns nothing, you're good! ✅

### 📋 Setup Instructions for New Users

When someone clones this repository, they should:

1. **Create their own API key file:**
   ```bash
   echo "your-api-key-here" > ~/ANTHROPIC_API_KEY
   ```

2. **Or use environment variable:**
   ```bash
   export ANTHROPIC_API_KEY="your-api-key-here"
   ```

3. **Get an API key from:**
   - Anthropic Console: https://console.anthropic.com/

### 🔍 What If I Accidentally Commit a Secret?

If you accidentally commit an API key:

1. **Immediately revoke the key** at https://console.anthropic.com/
2. **Remove it from git history:**
   ```bash
   # Remove the file from git
   git rm --cached path/to/file
   
   # Amend the commit if it was the last one
   git commit --amend
   
   # Or use git filter-branch for older commits
   # (consider using tools like git-filter-repo or BFG Repo-Cleaner)
   ```
3. **Generate a new API key**
4. **Force push** (only if you haven't shared the repo):
   ```bash
   git push --force
   ```

⚠️ **Important:** Once a secret is pushed to GitHub, consider it compromised even if you delete it later, since it's still in the git history!

## 🔒 Additional Security Best Practices

### Virtual Environment Security

- Always use virtual environments (`venv/`)
- Never commit `venv/` folder (it's in `.gitignore`)
- Keep dependencies up to date:
  ```bash
  pip list --outdated
  pip install --upgrade package-name
  ```

### File Permissions

Restrict API key file permissions:
```bash
chmod 600 ~/ANTHROPIC_API_KEY
```

This makes the file readable/writable only by you.

### Environment Variables

For production deployments, use environment variables instead of files:

```bash
# In your shell profile (~/.bashrc, ~/.zshrc)
export ANTHROPIC_API_KEY="your-key-here"

# Or in a .env file (never commit this!)
ANTHROPIC_API_KEY=your-key-here
```

### Code Review Checklist

Before committing, verify:
- [ ] No hardcoded API keys or secrets
- [ ] No actual API keys in comments or documentation
- [ ] `.gitignore` is properly configured
- [ ] Only example/placeholder values in documentation
- [ ] Sensitive files are outside the repository

## 📚 Resources

- [Anthropic API Best Practices](https://docs.anthropic.com/)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)

## 🐛 Reporting Security Issues

If you discover a security vulnerability in this repository:

1. **Do NOT** open a public issue
2. Email the maintainer directly
3. Include details about the vulnerability
4. Allow time for the issue to be fixed before public disclosure

## ✅ Security Checklist for Contributors

When contributing to this repository:

- [ ] I have not included any API keys or secrets in my code
- [ ] I have not committed any `.env` files
- [ ] I have tested with my own API key stored externally
- [ ] I have reviewed the changes with `git diff` before committing
- [ ] I have verified `.gitignore` is working correctly
- [ ] All sensitive data is loaded from environment or external files

---

**Remember:** Security is everyone's responsibility. When in doubt, ask! 🛡️

