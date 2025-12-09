# Coding Standards

## Critical Fullstack Rules

- **File Naming:** Use kebab-case for files (`video-player.tsx`), PascalCase for components (`VideoPlayer`)
- **Type Exports:** Export all types from `types/` directory, import from there consistently
- **Component Structure:** One component per file, co-locate tests with components
- **API Responses:** Always return consistent response shape `{ success, message, data?, error? }`
- **Error Handling:** Never expose internal errors to client, log server-side, return user-friendly messages
- **Environment Variables:** Access via `process.env` in API routes, use `NEXT_PUBLIC_` prefix for client
- **Imports:** Use absolute imports with `@/` alias, group by external/internal/relative
- **Video Files:** Store in `public/videos/`, use descriptive names, include poster images

## Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `VideoPlayer.tsx` |
| Hooks | camelCase with 'use' | `useVideoPlayer.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Types | PascalCase | `Project`, `ContactSubmission` |
| API Routes | kebab-case folders | `/api/contact/route.ts` |
| CSS Classes | Tailwind utilities | `className="flex items-center"` |
| Environment Variables | SCREAMING_SNAKE_CASE | `RESEND_API_KEY` |

---
