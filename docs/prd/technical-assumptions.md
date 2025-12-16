# Technical Assumptions

## Repository Structure: Monorepo

Single repository containing the Next.js 15 application with all frontend and API code.

## Service Architecture

**JAMstack / Serverless Hybrid**

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 15 (App Router) | Static generation + client-side interactivity |
| **API** | Next.js API Routes / Server Actions | Contact form submission, email sending |
| **Hosting** | Vercel | Optimized for Next.js, automatic CI/CD, edge network |
| **Email Service** | Resend or SendGrid | Transactional email for contact form notifications |
| **Analytics** | Vercel Analytics | Performance monitoring and visitor tracking |
| **Video Storage** | Self-hosted (public folder or CDN) | Optimized video files served via Vercel's edge network |

## Testing Requirements

**Unit + Integration Testing**

| Type | Scope | Tools |
|------|-------|-------|
| **Unit Tests** | Component logic, utility functions | Vitest or Jest |
| **Integration Tests** | Contact form submission, API routes | Vitest + Testing Library |
| **E2E Tests** | Critical user flows (optional for MVP) | Playwright (if needed) |
| **Manual Testing** | Cross-browser, responsive, video playback | Developer verification |

## Additional Technical Assumptions

- **TypeScript:** Strict mode enabled for type safety
- **Styling:** Tailwind CSS for rapid UI development
- **Video Formats:** MP4 (H.264) as primary format; WebM as fallback
- **Video Optimization:** Compressed to 2-5 Mbps, lazy loading, poster images
- **Image Optimization:** Next.js Image component with automatic optimization
- **Content Management:** Static JSON/TypeScript data files for MVP
- **Environment Variables:** Email service API keys stored in Vercel environment
- **SEO:** Next.js Metadata API for dynamic meta tags, sitemap generation
- **Linting/Formatting:** ESLint + Prettier
- **Git Workflow:** Main branch with feature branches; direct deploy from main

---
