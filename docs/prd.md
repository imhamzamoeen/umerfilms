# UmerFilms Portfolio - Product Requirements Document (PRD)

---

## Goals and Background Context

### Goals

- Establish a professional, memorable online presence that differentiates Umer from competitors
- Convert portfolio visitors into client inquiries through clear CTAs and easy contact
- Showcase Umer's unique personality and humor alongside technical videography/photography skills
- Create a video-first experience that aligns with Umer's medium and strengths
- Deliver a fast, responsive portfolio that works seamlessly across all devices
- Provide a foundation for future expansion (mood filtering, BTS content, testimonials)

### Background Context

The videography/photography market is saturated with talented creators using generic, template-based portfolios that fail to communicate personality or differentiate their work. Umer's competitive advantage lies in his unique perspective, technical craft (slow-motion, distinctive angles), and authentic humor - qualities that cannot be conveyed through static image grids and boilerplate "About Me" text.

This portfolio solves the differentiation problem by adopting a video-first, personality-forward approach. With Umer's social media presence growing, the portfolio serves as a professional hub where brands, agencies, and followers can quickly assess his style, understand his personality, and take action (request a quote). The MVP focuses on three core experiences: an impactful hero showreel, a video-based About page, and a clear "Work With Me" section with contact form.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-12-09 | 0.1 | Initial PRD draft from Project Brief | PM (John) |

---

## Requirements

### Functional Requirements

**FR1:** The system shall display a hero section on the homepage featuring a 10-second autoplay video showreel with Umer's voice/humor overlay.

**FR2:** The system shall provide a Work/Portfolio page displaying projects in a grid layout with video thumbnails, titles, and categories.

**FR3:** The system shall allow users to click on a portfolio item to view the full project with video playback and project details.

**FR4:** The system shall include a Video About page featuring an embedded 60-90 second video introduction with supporting text bio.

**FR5:** The system shall provide a "Work With Me" section listing services offered with a "Get Quote" call-to-action.

**FR6:** The system shall include a contact form capturing: name, email, project type (dropdown), and message fields.

**FR7:** The system shall send email notifications to Umer when a contact form is submitted.

**FR8:** The system shall provide a navigation menu accessible from all pages (Home, Work, About, Work With Me/Contact).

**FR9:** The system shall support self-hosted video playback with optimized loading (lazy loading, compression).

**FR10:** The system shall include social media links (Instagram, YouTube, TikTok) in the footer or header.

### Non-Functional Requirements

**NFR1:** The site shall load in under 3 seconds on 4G mobile connections.

**NFR2:** The site shall achieve Core Web Vitals scores in the "Good" range (LCP < 2.5s, FID < 100ms, CLS < 0.1).

**NFR3:** The site shall be fully responsive and functional on mobile, tablet, and desktop devices.

**NFR4:** The site shall support modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions).

**NFR5:** The site shall implement HTTPS encryption for all connections.

**NFR6:** The contact form shall include spam protection (honeypot field or reCAPTCHA).

**NFR7:** Videos shall be optimized for streaming (progressive loading, not full download before play).

**NFR8:** The site shall be deployed on Vercel with automatic CI/CD from the repository.

**NFR9:** The codebase shall use Next.js 15 with TypeScript for type safety.

**NFR10:** The site shall follow SEO best practices (meta tags, semantic HTML, sitemap).

---

## User Interface Design Goals

### Overall UX Vision

A cinematic, immersive portfolio experience that feels like watching a film trailer rather than browsing a website. The design should be dark, moody, and video-forward - letting Umer's work speak first while his personality shines through subtle copy and the video About page. The experience should feel premium yet approachable, professional yet fun - matching Umer's brand of "skilled but not arrogant, funny but not goofy."

### Key Interaction Paradigms

- **Video-First Browsing:** Videos are the primary content; images serve as thumbnails/previews only
- **Minimal Clicks to Action:** Max 3 clicks from landing to contact form submission
- **Scroll-Driven Discovery:** Homepage guides users through showreel → featured work → CTA naturally
- **Hover-to-Preview:** Portfolio grid items show video preview on hover (desktop)
- **Tap-to-Play:** Mobile users tap thumbnails to enter full video view
- **Sticky Navigation:** Persistent nav for easy access to key sections
- **Smooth Transitions:** Subtle fade/slide animations matching cinematic feel (not distracting)

### Core Screens and Views

| Screen | Purpose | Key Elements |
|--------|---------|--------------|
| **Home** | First impression & hook | Hero showreel, brief intro, featured work preview, CTA |
| **Work/Portfolio** | Showcase projects | Grid of project thumbnails, category filter, video playback |
| **Project Detail** | Deep dive on single project | Full video, project description, category, related work |
| **About** | Personality & connection | Video introduction, text bio, skills/gear (optional) |
| **Work With Me** | Conversion & contact | Services list, "Get Quote" CTA, contact form |

### Accessibility

**Target: WCAG AA Compliance**

- Sufficient color contrast (especially important with dark theme)
- Keyboard navigation support
- Video captions available (for About video at minimum)
- Alt text for all images
- Focus indicators visible
- Screen reader compatible navigation

### Branding

**Status:** No existing brand assets - visual identity to be created

| Element | Direction |
|---------|-----------|
| **Color Palette** | Dark/moody base (deep blacks, charcoals) with accent color TBD |
| **Typography** | Modern, clean sans-serif; possibly cinematic display font for headers |
| **Visual Style** | Cinematic, editorial, premium feel |
| **Tone** | Professional but approachable, hints of humor in microcopy |
| **Imagery** | Video-dominant; high contrast, dramatic lighting aesthetic |

### Target Devices and Platforms

**Web Responsive** - optimized for:

| Device | Considerations |
|--------|----------------|
| **Mobile (Primary)** | Touch interactions, vertical video consideration, performance-critical |
| **Tablet** | Hybrid touch/hover, landscape/portrait support |
| **Desktop** | Hover states, larger video playback, multi-column layouts |

**Browser Support:** Chrome, Firefox, Safari, Edge (last 2 versions)

---

## Technical Assumptions

### Repository Structure: Monorepo

Single repository containing the Next.js 15 application with all frontend and API code.

### Service Architecture

**JAMstack / Serverless Hybrid**

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 15 (App Router) | Static generation + client-side interactivity |
| **API** | Next.js API Routes / Server Actions | Contact form submission, email sending |
| **Hosting** | Vercel | Optimized for Next.js, automatic CI/CD, edge network |
| **Email Service** | Resend or SendGrid | Transactional email for contact form notifications |
| **Analytics** | Vercel Analytics | Performance monitoring and visitor tracking |
| **Video Storage** | Self-hosted (public folder or CDN) | Optimized video files served via Vercel's edge network |

### Testing Requirements

**Unit + Integration Testing**

| Type | Scope | Tools |
|------|-------|-------|
| **Unit Tests** | Component logic, utility functions | Vitest or Jest |
| **Integration Tests** | Contact form submission, API routes | Vitest + Testing Library |
| **E2E Tests** | Critical user flows (optional for MVP) | Playwright (if needed) |
| **Manual Testing** | Cross-browser, responsive, video playback | Developer verification |

### Additional Technical Assumptions

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

## Epic List

| Epic | Title | Goal Statement |
|------|-------|----------------|
| **Epic 1** | Foundation & Homepage | Establish project infrastructure, design system, and deliver the homepage with hero showreel |
| **Epic 2** | Portfolio & Project Display | Create the Work page with project grid and individual project detail views with video playback |
| **Epic 3** | About & Contact | Build the Video About page and Work With Me section with functional contact form |

---

## Epic 1: Foundation & Homepage

### Goal
Establish project foundation (layout, navigation, styling, video infrastructure) and deliver the homepage with hero showreel as the first deployable increment.

---

### Story 1.1: Project Foundation & Base Layout

**As a** developer,
**I want** the project configured with design tokens, dark theme, and base layout structure,
**so that** all subsequent pages have a consistent foundation to build upon.

#### Acceptance Criteria

1. Tailwind CSS is configured with custom design tokens (colors: dark background, accent color; spacing scale; border radius)
2. Dark theme colors are defined (background: near-black, surface: dark gray, text: white/light gray, accent: TBD)
3. Typography scale is configured with font families (display + body fonts via Google Fonts or next/font)
4. Root layout (`app/layout.tsx`) includes HTML metadata (title, description, viewport, theme-color)
5. Base page wrapper component exists with consistent max-width and padding
6. Global CSS includes reset/normalize and base dark theme styles
7. Page renders without errors on mobile and desktop viewports
8. Lighthouse accessibility score is 90+ on empty page shell

---

### Story 1.2: Navigation Component

**As a** visitor,
**I want** a navigation menu visible on all pages,
**so that** I can easily move between Home, Work, About, and Work With Me sections.

#### Acceptance Criteria

1. Header component displays site name/logo (text-based "UmerFilms" for MVP)
2. Navigation links are visible: Home, Work, About, Work With Me
3. Current page link is visually indicated (active state)
4. Navigation is sticky/fixed at top on scroll
5. Mobile: hamburger menu icon toggles a mobile menu overlay
6. Mobile menu closes when a link is clicked
7. Navigation is keyboard accessible (Tab navigation, Enter to activate)
8. Header has appropriate contrast against dark background
9. Navigation renders correctly on viewports 320px to 1920px+

---

### Story 1.3: Footer Component

**As a** visitor,
**I want** a footer with social media links,
**so that** I can connect with Umer on other platforms.

#### Acceptance Criteria

1. Footer component displays at bottom of all pages
2. Social media icons/links are included: Instagram, YouTube, TikTok (open in new tab)
3. Copyright text displays: "© 2025 UmerFilms. All rights reserved."
4. Footer styling is consistent with dark theme
5. Social links have hover states and are keyboard accessible
6. Footer is responsive (stacks appropriately on mobile)
7. Icons use accessible labels (aria-label or sr-only text)

---

### Story 1.4: Video Player Component

**As a** developer,
**I want** a reusable video player component with optimization features,
**so that** videos across the site load efficiently and play smoothly.

#### Acceptance Criteria

1. VideoPlayer component accepts props: src, poster, autoplay, muted, loop, className
2. Component supports autoplay with muted attribute (browser requirement)
3. Lazy loading is implemented (video loads when near viewport)
4. Poster image displays while video loads
5. Play/pause toggle is available on click/tap
6. Component handles loading and error states gracefully
7. Video uses `playsinline` attribute for iOS compatibility
8. Component is responsive (fills container width, maintains aspect ratio)
9. Multiple video formats supported via source elements (MP4 primary, WebM fallback)

---

### Story 1.5: Homepage Hero Section

**As a** visitor,
**I want** to see an impactful hero showreel when I land on the homepage,
**so that** I immediately understand Umer's style and quality of work.

#### Acceptance Criteria

1. Hero section spans full viewport height (100vh) on initial load
2. Showreel video autoplays muted and loops continuously
3. Video covers full hero area (object-fit: cover)
4. Overlay displays Umer's name/brand and tagline
5. Unmute button is visible and functional
6. Scroll indicator (arrow or text) hints at content below
7. Hero is responsive: video scales appropriately on all devices
8. Fallback poster image displays if video fails to load
9. Performance: hero video file is optimized (<5MB for 10-second clip)
10. Text overlay has sufficient contrast and is readable over video

---

### Story 1.6: Homepage Content Sections & CTA

**As a** visitor,
**I want** to see an introduction, featured work preview, and clear call-to-action below the hero,
**so that** I understand who Umer is and how to work with him.

#### Acceptance Criteria

1. Introduction section displays brief text about Umer (2-3 sentences)
2. Featured work section shows 3-4 project thumbnails in a grid (placeholder images acceptable for this story)
3. Featured work thumbnails link to Work page (or are non-functional placeholders with correct styling)
4. CTA section includes heading ("Let's Work Together" or similar) and button linking to Work With Me page
5. Sections have appropriate vertical spacing and visual hierarchy
6. Content is centered with max-width constraint for readability
7. All sections are responsive and stack appropriately on mobile
8. Smooth scroll behavior when using scroll indicator from hero
9. Page metadata (title, description) is set for SEO

---

## Epic 2: Portfolio & Project Display

### Goal
Create the Work/Portfolio page showcasing projects in a grid layout with video thumbnails, and individual project detail pages with full video playback.

---

### Story 2.1: Project Data Structure & Content

**As a** developer,
**I want** a well-defined project data structure with sample content,
**so that** portfolio components can render project information consistently.

#### Acceptance Criteria

1. TypeScript interface/type is defined for Project with fields: id, title, slug, category, description, thumbnailUrl, videoUrl, featured (boolean), order (number)
2. Category type is defined as union of allowed values (e.g., "Commercial", "Music Video", "Wedding", "Short Film", "Personal")
3. Sample project data file exists with at least 6 placeholder projects across different categories
4. Data file exports helper functions: getAllProjects(), getProjectBySlug(), getFeaturedProjects(), getProjectsByCategory()
5. Placeholder thumbnail images are added to public folder (can be solid color placeholders)
6. Placeholder video files or references are included (can reuse hero video or use test videos)
7. Data structure supports future expansion (tags, client name, date, etc. as optional fields)

---

### Story 2.2: Project Card Component

**As a** visitor,
**I want** to see project thumbnails that preview the content,
**so that** I can quickly scan and find projects that interest me.

#### Acceptance Criteria

1. ProjectCard component displays thumbnail image, title, and category
2. Card has hover state with subtle animation (scale, overlay, or border effect)
3. Desktop: video preview plays on hover (first 3-5 seconds, muted)
4. Mobile: tap navigates directly to project (no hover preview)
5. Card is a clickable link to the project detail page
6. Card maintains consistent aspect ratio (16:9 recommended for video content)
7. Loading state shows placeholder/skeleton while thumbnail loads
8. Card is keyboard accessible (focusable, Enter to navigate)
9. Component accepts Project data as props

---

### Story 2.3: Work Page with Portfolio Grid

**As a** visitor,
**I want** to browse all of Umer's projects on the Work page,
**so that** I can explore the full range of his portfolio.

#### Acceptance Criteria

1. Work page is accessible at `/work` route
2. Page displays heading ("Work" or "Portfolio")
3. Category filter buttons are displayed (All + each category)
4. Clicking a category filters the grid to show only matching projects
5. "All" filter shows all projects (default state)
6. Portfolio grid displays ProjectCard components in responsive layout (1 col mobile, 2 col tablet, 3 col desktop)
7. Projects are sorted by order field (featured/priority first)
8. Grid has appropriate gap spacing consistent with design system
9. Page metadata (title, description) is set for SEO
10. Empty state displays message if no projects in selected category

---

### Story 2.4: Project Detail Page

**As a** visitor,
**I want** to view a single project with its full video and details,
**so that** I can appreciate the work and understand the context.

#### Acceptance Criteria

1. Project detail page is accessible at `/work/[slug]` dynamic route
2. Page displays project title as heading
3. Full video player is prominently displayed (not autoplay, user-initiated)
4. Video player uses the VideoPlayer component from Story 1.4
5. Project description is displayed below or alongside video
6. Category badge/tag is visible
7. "Back to Portfolio" link returns user to Work page
8. 404 page displays if project slug doesn't exist
9. Page metadata is dynamically set (title: project name, description: project description)
10. Page is responsive with video scaling appropriately on all devices

---

### Story 2.5: Related Projects Section

**As a** visitor,
**I want** to see related projects after viewing one,
**so that** I can continue exploring similar work.

#### Acceptance Criteria

1. Related projects section appears below the main project content
2. Section displays 3 project cards from the same category (excluding current)
3. If fewer than 3 in same category, fill with other projects
4. Section heading: "More Work" or "Related Projects"
5. Project cards link to their respective detail pages
6. Section is responsive (1-3 columns based on viewport)
7. Section does not appear if there are no other projects

---

### Story 2.6: Update Homepage Featured Work

**As a** visitor,
**I want** the homepage featured work section to show real projects,
**so that** I can preview Umer's best work before going to the full portfolio.

#### Acceptance Criteria

1. Homepage featured section pulls from getFeaturedProjects() (projects with featured: true)
2. Displays 3-4 featured project cards
3. Cards link to individual project detail pages
4. "View All Work" link navigates to Work page
5. Section uses same ProjectCard component as Work page
6. Featured projects are curated (not random) based on data

---

## Epic 3: About & Contact

### Goal
Build the About page with video introduction and the Work With Me section with services list and functional contact form with email notifications.

---

### Story 3.1: About Page with Video Introduction

**As a** visitor,
**I want** to watch a video introduction from Umer and read about his background,
**so that** I can understand his personality and decide if he's the right fit for my project.

#### Acceptance Criteria

1. About page is accessible at `/about` route
2. Page displays heading ("About" or "Meet Umer")
3. Video introduction is prominently displayed using VideoPlayer component
4. Video does NOT autoplay (user-initiated playback)
5. Video has poster image showing Umer (thumbnail before play)
6. Text bio section appears below/beside video (2-3 paragraphs about Umer)
7. Bio content includes: who he is, his passion, what makes him unique
8. Optional: skills/specialties list (videography, photography, editing, etc.)
9. Optional: equipment/gear section (camera, software - can be deferred)
10. Page is responsive with video and text stacking on mobile
11. Page metadata (title, description) is set for SEO
12. CTA at bottom links to Work With Me page

---

### Story 3.2: Work With Me Page with Services List

**As a** visitor,
**I want** to see what services Umer offers,
**so that** I can understand how he can help with my project.

#### Acceptance Criteria

1. Work With Me page is accessible at `/contact` route (or `/work-with-me`)
2. Page displays heading ("Work With Me" or "Let's Create Together")
3. Brief intro paragraph sets expectations for working with Umer
4. Services section lists available service categories with descriptions:
   - Commercial/Brand Content
   - Music Videos
   - Wedding/Event Coverage
   - Short Films/Creative Projects
   - (Exact services TBD - use placeholders)
5. Each service displays: title, brief description (1-2 sentences)
6. "Get Quote" messaging is clear (no public pricing)
7. Page layout has services section above contact form section
8. Section heading for contact form: "Get in Touch" or "Request a Quote"
9. Page is responsive with appropriate spacing
10. Page metadata (title, description) is set for SEO

---

### Story 3.3: Contact Form Component

**As a** visitor,
**I want** to fill out a contact form with my project details,
**so that** I can request a quote from Umer.

#### Acceptance Criteria

1. Contact form component renders within Work With Me page
2. Form fields include:
   - Name (text input, required)
   - Email (email input, required, validated)
   - Project Type (dropdown: Commercial, Music Video, Wedding, Short Film, Other)
   - Message (textarea, required, min 10 characters)
3. All required fields show validation errors if empty on submit
4. Email field validates proper email format
5. Submit button displays "Send Message" or "Request Quote"
6. Form shows loading state while submitting (button disabled, spinner)
7. Success state displays confirmation message ("Thanks! I'll get back to you soon.")
8. Error state displays error message if submission fails
9. Form resets after successful submission
10. Form is keyboard accessible (Tab through fields, Enter to submit)
11. Form inputs have proper labels and are screen-reader accessible

---

### Story 3.4: Contact Form API & Email Notification

**As** Umer,
**I want** to receive email notifications when someone submits the contact form,
**so that** I can respond to potential client inquiries promptly.

#### Acceptance Criteria

1. API route exists at `/api/contact` (POST method)
2. API validates all required fields server-side
3. API returns appropriate error responses for invalid data (400 status)
4. Honeypot field is implemented for spam protection (hidden field, reject if filled)
5. Email is sent to Umer's email address on valid submission
6. Email includes: sender name, email, project type, message, timestamp
7. Email has clear subject line: "New Portfolio Inquiry: [Project Type]"
8. Email service integration uses Resend (or SendGrid as fallback)
9. API key is stored in environment variable (not committed to repo)
10. API returns success response (200) after email is sent
11. API handles email service errors gracefully (logs error, returns 500)
12. Rate limiting consideration: basic protection against spam submissions

---

### Story 3.5: Final Integration & Launch Readiness

**As a** developer,
**I want** to verify all pages work together and the site is launch-ready,
**so that** the portfolio can be deployed to production.

#### Acceptance Criteria

1. All navigation links work correctly across all pages
2. All internal links (CTAs, project cards, etc.) navigate correctly
3. 404 page exists and displays friendly message with link to homepage
4. Favicon is added (simple "U" or UmerFilms branding)
5. Open Graph meta tags are set for social sharing (title, description, image)
6. Sitemap is generated (next-sitemap or manual)
7. robots.txt allows search engine crawling
8. All pages pass Lighthouse audit (Performance > 80, Accessibility > 90, SEO > 90)
9. Contact form end-to-end test: submission sends email successfully
10. Cross-browser testing completed (Chrome, Firefox, Safari, Edge)
11. Mobile testing completed (iOS Safari, Android Chrome)
12. Environment variables documented in README or .env.example
13. Deployment to Vercel production is successful

---

## Checklist Results Report

### Executive Summary

| Metric | Assessment |
|--------|------------|
| **Overall PRD Completeness** | 88% |
| **MVP Scope Appropriateness** | Just Right |
| **Readiness for Architecture Phase** | Ready |
| **Critical Gaps** | Minor - no blockers identified |

### Category Statuses

| Category | Status | Critical Issues |
|----------|--------|-----------------|
| 1. Problem Definition & Context | **PASS** | No competitive analysis (minor) |
| 2. MVP Scope Definition | **PASS** | Timeline not specified (acceptable) |
| 3. User Experience Requirements | **PASS** | No formal user flow diagrams |
| 4. Functional Requirements | **PASS** | None |
| 5. Non-Functional Requirements | **PARTIAL** | Reliability/resilience minimal (appropriate for portfolio) |
| 6. Epic & Story Structure | **PASS** | None |
| 7. Technical Guidance | **PASS** | None |
| 8. Cross-Functional Requirements | **PARTIAL** | Integration testing could be more detailed |
| 9. Clarity & Communication | **PASS** | None |

### High Priority Items for Architect

- **Video optimization strategy** - Self-hosted video is a technical risk; architect should validate approach and define compression/delivery strategy

### Recommendations

1. Proceed to Architecture - PRD is ready; no blockers identified
2. Architect should focus on video delivery strategy and Resend integration
3. Consider Story 2.2 hover video preview as optional if timeline pressure emerges
4. Have fallback plan for video hosting if self-hosted proves problematic

### Final Decision

**READY FOR ARCHITECT** - The PRD and epics are comprehensive, properly structured, and ready for architectural design.

---

## Next Steps

### UX Expert Prompt

> **For UX/Design Architect:** Please review this PRD for UmerFilms Portfolio. Focus on the UI Design Goals section and create a design system including: color palette (dark/cinematic theme), typography scale, component specifications, and wireframes for the 5 core screens (Home, Work, Project Detail, About, Work With Me). Pay special attention to video-first interactions and mobile responsiveness. Reference the brand summary in `docs/brief.md` for tone and personality guidelines.

### Architect Prompt

> **For Technical Architect:** Please review this PRD for UmerFilms Portfolio and create the technical architecture document. The stack is Next.js 15 (App Router), TypeScript, Tailwind CSS, deployed on Vercel. Key technical considerations: self-hosted video optimization, Resend email integration, static data structure for projects, and performance targets (LCP < 2.5s). Create the architecture including: tech stack details, project structure, component hierarchy, API design, and deployment configuration.

---

*Document created using the BMAD-METHOD framework*
