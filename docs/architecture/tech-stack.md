# Tech Stack

## Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|----------|------------|---------|---------|-----------|
| Frontend Language | TypeScript | 5.x | Type-safe development | Catches errors at compile time, better DX |
| Frontend Framework | Next.js | 15.x | React framework with SSG/SSR | Best-in-class for performance, SEO, DX |
| UI Component Library | Custom + Tailwind | - | UI components | No external dependency, full control |
| State Management | React useState/useReducer | Built-in | Local component state | Simple app, no complex global state needed |
| Backend Language | TypeScript | 5.x | API route development | Shared types with frontend |
| Backend Framework | Next.js API Routes | 15.x | Serverless API endpoints | Integrated with frontend, zero config |
| API Style | REST | - | Contact form endpoint | Simple, single endpoint, REST is sufficient |
| Database | None (Static JSON) | - | Project data storage | MVP doesn't need dynamic data |
| Cache | Vercel Edge Cache | - | Static asset caching | Built into platform, zero config |
| File Storage | Vercel Blob / Public folder | - | Video and image hosting | Self-hosted per requirements |
| Authentication | None | - | N/A for MVP | No user accounts required |
| Frontend Testing | Vitest + Testing Library | Latest | Component and hook testing | Fast, modern, React-focused |
| Backend Testing | Vitest | Latest | API route testing | Consistent tooling with frontend |
| E2E Testing | Playwright | Latest | Critical path testing | Best cross-browser support |
| Build Tool | Next.js CLI | 15.x | Build and dev server | Integrated, optimized for Next.js |
| Bundler | Turbopack | Built-in | Development bundling | Faster than Webpack, Next.js default |
| IaC Tool | N/A | - | Not needed | Vercel handles infrastructure |
| CI/CD | Vercel + GitHub Actions | - | Automated deployment | Zero-config with Vercel |
| Monitoring | Vercel Analytics | - | Performance monitoring | Built-in, tracks Core Web Vitals |
| Logging | Console + Vercel Logs | - | Error and debug logging | Sufficient for MVP |
| CSS Framework | Tailwind CSS | 3.x | Utility-first styling | Rapid development, consistent design |

---
