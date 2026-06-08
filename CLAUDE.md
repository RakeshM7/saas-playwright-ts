# Playwright Framework Development Guide

## 📋 Context & Session Management

**IMPORTANT:** Before starting ANY work, read these files to understand current state:

1. **Read CONTEXT.md** — Complete session summary, phase checklist, decisions made
2. **Read PROGRESS_TRACKER.md** — Detailed breakdown of completed files
3. **Reference memory/** — Development approach and framework structure

## 🎯 Development Approach

- **File-by-file development** — One file at a time with explicit guidance
- **NO auto-implementation** — Only write code when explicitly requested
- **Always review before proceeding** — Review created files before moving to next
- **Update all trackers after each file:**
  - CONTEXT.md (session summary)
  - PROGRESS_TRACKER.md (checklist)
  - Notion pages (via agent)

## 📊 Current Project State

**Status:** Phase 1 Complete ✅ → Ready for Phase 2  
**Completed:** 5/50 files (10% overall)  
**Last Updated:** 2026-06-08

**Phase 1 Files (Complete):**
- ✅ playwright.config.ts
- ✅ smoke.config.ts
- ✅ tsconfig.json
- ✅ .env.example
- ✅ package.json

**Next:** Phase 2 - Base Classes & Infrastructure

## 🔗 Important Resources

**Notion Pages (Updated automatically after each file):**
- Playwright Tracker: https://www.notion.so/Playwright-36eb45b1be6d800b85b3fc9cfb14bece
- SDET Roadmap: https://www.notion.so/SDET-Mastery-Roadmap-Rakesh-Manoharan-372b45b1be6d8107bbd6c641014e23b3

**Local Files:**
- CONTEXT.md — Full session context
- PROGRESS_TRACKER.md — Phase checklist
- CLAUDE.md — This file

## ✨ Key Decisions Made

| Decision | Choice | Reason |
|----------|--------|--------|
| Development Style | File-by-file guidance | Learning + control |
| Workers | Environment variable | Flexibility |
| Artifacts | Only on failure | Save storage |
| Reporters | HTML (GitHub), Allure (Jenkins) | Tool-optimized |
| Test Retries | Per-test-suite | Fine-grained control |
| TypeScript | Strict mode | Type safety |

## 🚀 Workflow

1. User requests guidance on a new file
2. I provide step-by-step guidance (NO code)
3. User writes the file in IDE
4. I review the created file
5. Update CONTEXT.md + PROGRESS_TRACKER.md + Notion
6. Move to next file

## 📚 Architecture (12 Phases)

```
Phase 1: Configuration & Core Setup ✅ (5/5 - 100%)
Phase 2: Base Classes & Infrastructure 🚀 (Next)
Phase 3: Page Object Model Foundation
Phase 4: Helper Classes
Phase 5: API Testing Infrastructure
Phase 6: Test Data & Factories
Phase 7: API Schema Validation
Phase 8: Test Fixtures & Setup
Phase 9: Test Implementation
Phase 10: CI/CD & Automation
Phase 11: Docker & Containerization
Phase 12: Documentation & Extras
```

---

**When you start a new thread:** I automatically read this file and load your context from CONTEXT.md. No explanations needed!
