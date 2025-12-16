# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server
```

## Tech Stack

- **Next.js 16** with App Router
- **React 19**
- **TypeScript 5** (strict mode enabled)
- **Tailwind CSS 4** via PostCSS
- **ESLint 9** with next/core-web-vitals and next/typescript configs

## Project Structure

```
src/app/           # App Router pages and layouts
  layout.tsx       # Root layout with Geist font configuration
  page.tsx         # Home page
  globals.css      # Global styles (Tailwind + CSS variables)
public/            # Static assets
```

Uses `@/*` path alias mapping to `./src/*`.

## BMad Method Framework

This project includes the BMad Method framework (`.bmad-core/`) for structured development workflows. Key documents are expected in:

- `docs/prd.md` or `docs/prd/` - Product Requirements
- `docs/architecture.md` or `docs/architecture/` - Architecture documentation
- `docs/stories/` - User stories for development
- `docs/qa/` - QA documentation

When developing stories, reference files from `docs/architecture/` including:
- `coding-standards.md`
- `tech-stack.md`
- `source-tree.md`
