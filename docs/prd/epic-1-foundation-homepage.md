# Epic 1: Foundation & Homepage

## Goal
Establish project foundation (layout, navigation, styling, video infrastructure) and deliver the homepage with hero showreel as the first deployable increment.

---

## Story 1.1: Project Foundation & Base Layout

**As a** developer,
**I want** the project configured with design tokens, dark theme, and base layout structure,
**so that** all subsequent pages have a consistent foundation to build upon.

### Acceptance Criteria

1. Tailwind CSS is configured with custom design tokens (colors: dark background, accent color; spacing scale; border radius)
2. Dark theme colors are defined (background: near-black, surface: dark gray, text: white/light gray, accent: TBD)
3. Typography scale is configured with font families (display + body fonts via Google Fonts or next/font)
4. Root layout (`app/layout.tsx`) includes HTML metadata (title, description, viewport, theme-color)
5. Base page wrapper component exists with consistent max-width and padding
6. Global CSS includes reset/normalize and base dark theme styles
7. Page renders without errors on mobile and desktop viewports
8. Lighthouse accessibility score is 90+ on empty page shell

---

## Story 1.2: Navigation Component

**As a** visitor,
**I want** a navigation menu visible on all pages,
**so that** I can easily move between Home, Work, About, and Work With Me sections.

### Acceptance Criteria

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

## Story 1.3: Footer Component

**As a** visitor,
**I want** a footer with social media links,
**so that** I can connect with Umer on other platforms.

### Acceptance Criteria

1. Footer component displays at bottom of all pages
2. Social media icons/links are included: Instagram, YouTube, TikTok (open in new tab)
3. Copyright text displays: "© 2025 UmerFilms. All rights reserved."
4. Footer styling is consistent with dark theme
5. Social links have hover states and are keyboard accessible
6. Footer is responsive (stacks appropriately on mobile)
7. Icons use accessible labels (aria-label or sr-only text)

---

## Story 1.4: Video Player Component

**As a** developer,
**I want** a reusable video player component with optimization features,
**so that** videos across the site load efficiently and play smoothly.

### Acceptance Criteria

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

## Story 1.5: Homepage Hero Section

**As a** visitor,
**I want** to see an impactful hero showreel when I land on the homepage,
**so that** I immediately understand Umer's style and quality of work.

### Acceptance Criteria

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

## Story 1.6: Homepage Content Sections & CTA

**As a** visitor,
**I want** to see an introduction, featured work preview, and clear call-to-action below the hero,
**so that** I understand who Umer is and how to work with him.

### Acceptance Criteria

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
