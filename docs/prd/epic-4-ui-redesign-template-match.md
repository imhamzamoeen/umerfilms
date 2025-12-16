# Epic 4: UI Redesign - Template Match

## Goal
Redesign the entire UmerFilms portfolio to match the idea.md specification, implementing purple-pink gradient color scheme, three-column hero layout, interactive components (sliders, lightbox, off-canvas menu), and additional sections (Services, Timeline, Testimonials, Blog) to achieve ~100% specification compliance.

---

## Story 4.1: Update Color Palette & CSS Variables

**As a** developer,
**I want** to replace the orange accent color scheme with purple-pink gradients throughout the application,
**so that** the site matches the idea.md color specification.

### Acceptance Criteria

1. CSS variables in `globals.css` updated with purple-pink gradient colors (#450E93 → #D5007F)
2. All orange accent colors replaced with purple-pink gradient equivalents
3. Gradient definition created for consistent use across components
4. Button hover states use purple-pink gradient instead of orange
5. Navigation active states use purple accent instead of orange
6. All components using accent colors are updated (buttons, links, highlights)
7. Dark theme background colors remain black (#000000) and dark grays (#1E1E1E)
8. White text colors remain unchanged
9. All existing tests pass after color changes
10. Visual regression testing confirms color changes applied correctly

---

## Story 4.2: Hero Section - Outline Stroke Typography

**As a** visitor,
**I want** the hero heading to use outline stroke typography,
**so that** it matches the template's distinctive visual style.

### Acceptance Criteria

1. Hero H1 heading uses outline stroke (webkit-text-stroke) instead of filled text
2. Stroke width is 2-3px
3. Text fill is transparent
4. Font size increased to 8-9rem (128-144px) on desktop
5. All-caps style applied to hero heading
6. Responsive scaling works on mobile/tablet (clamp function)
7. Heading remains accessible (sufficient contrast, readable)
8. Animation/transitions preserved during scroll
9. Tests updated to verify stroke styling
10. Cross-browser compatibility verified (Chrome, Firefox, Safari)

---

## Story 4.3: Hero Section - Three Column Layout Restructure

**As a** visitor,
**I want** the hero section restructured into three columns with biography, circular portrait, and statistics,
**so that** the layout matches the template specification.

### Acceptance Criteria

1. Hero section uses three-column grid on desktop
2. Left column displays biography labels and skills list
3. Center column displays circular portrait (400-500px)
4. Circular portrait has purple-pink gradient overlay
5. Circular portrait has thin white stroke border
6. Right column displays statistics (years experience, projects, awards)
7. Layout is responsive (two-column on tablet, single-column on mobile)
8. All columns align vertically centered
9. Spacing between columns is consistent (2-3rem)
10. Component tests verify three-column layout structure
11. Mobile layout stacks elements in correct order
12. Accessibility maintained (semantic HTML, ARIA labels)

---

## Story 4.4: Preloader Animation Component

**As a** visitor,
**I want** to see a loading animation when the page first loads,
**so that** I have visual feedback during content loading.

### Acceptance Criteria

1. Preloader component created with "LOADING" text animation
2. Each letter fades in sequentially
3. After completion (~2-3s), page content slides in from bottom
4. Preloader only shows on initial page load (not on navigation)
5. State stored in sessionStorage to prevent repeat on same session
6. Smooth transition between preloader and main content
7. Accessible (screen reader announces loading state)
8. Component is lazy-loaded to avoid blocking main content
9. Tests verify animation sequence and timing
10. Works across all browsers

---

## Story 4.5: Off-Canvas Fullscreen Menu

**As a** visitor,
**I want** a fullscreen menu that slides in when I click the menu button,
**so that** I can navigate the site with a rich interactive experience.

### Acceptance Criteria

1. Pill-shaped "Menu" button added to header (top right)
2. Menu button has white background, black text, purple dot indicator
3. Clicking menu button toggles fullscreen overlay
4. Overlay has dark background with navigation links
5. Navigation links are large and prominent in overlay
6. Smooth expand/collapse animation (0.4s ease-out)
7. Clicking link or outside overlay closes menu
8. Menu is keyboard accessible (Escape key closes)
9. Focus trapped within menu when open
10. Mobile responsive (works on all screen sizes)
11. Component tests verify menu toggle functionality
12. Accessibility tested (ARIA labels, focus management)

---

## Story 4.6: Services Section with Cards

**As a** visitor,
**I want** to see a services/skills section with icon cards,
**so that** I understand what services are offered.

### Acceptance Criteria

1. Services section component created
2. Grid layout: 3 cards per row (desktop), 2 (tablet), 1 (mobile)
3. Each card has dark background (#1E1E1E), 1rem border radius
4. Cards have subtle drop shadow
5. Colored icon at top of each card (purple-pink gradient)
6. Service title and description included
7. Hover effect: slight elevation (scale 1.02 or translate)
8. Icons use Bootstrap Icons or similar icon set
9. Services data structure created in `data/services.ts`
10. Responsive grid adjusts properly on all breakpoints
11. Component tests verify card layout and hover states
12. Accessibility: proper heading hierarchy, alt text on icons

---

## Story 4.7: Experience Timeline Component

**As a** visitor,
**I want** to see a timeline of experience and work history,
**so that** I can learn about the professional background.

### Acceptance Criteria

1. Timeline component with vertical layout created
2. Items display in accordion/slide-open style
3. Each entry shows year/date range, position, company, description
4. Purple-pink accent line connects timeline items vertically
5. Clicking item expands/collapses content
6. Smooth accordion animation
7. Timeline data structure created in `data/timeline.ts`
8. Icons or markers indicate each timeline point
9. Responsive layout on mobile (simplified timeline)
10. Keyboard accessible (Enter/Space to expand)
11. Component tests verify accordion functionality
12. ARIA attributes for expandable sections

---

## Story 4.8: Install Swiper.js & Portfolio Slider

**As a** visitor,
**I want** the portfolio section to use a slider instead of static grid,
**so that** I can browse projects with smooth animations.

### Acceptance Criteria

1. Swiper.js installed (`npm install swiper`)
2. PortfolioSlider component created using Swiper
3. Multiple projects per view (3 on desktop, 2 on tablet, 1 on mobile)
4. Each slide shows project image with overlay (title + category)
5. Pagination bullets with purple-pink active state
6. Navigation arrows visible on hover
7. Smooth transitions (0.4s ease-out)
8. Clicking project opens lightbox (Story 4.9 dependency)
9. Swiper configuration optimized for performance
10. Component tests verify slider functionality
11. Keyboard navigation supported (arrow keys)
12. Touch/swipe gestures work on mobile

---

## Story 4.9: Lightbox Component for Portfolio

**As a** visitor,
**I want** to view portfolio images in a lightbox when clicked,
**so that** I can see project details in full screen.

### Acceptance Criteria

1. Lightbox component created
2. Opens when portfolio image is clicked
3. Dark overlay backdrop
4. Large image display with next/previous navigation
5. Caption/description below image
6. Close button (X) in top right
7. Clicking outside image closes lightbox
8. Keyboard navigation: arrow keys (prev/next), Escape (close)
9. Focus trapped within lightbox when open
10. Smooth open/close animations
11. Component tests verify navigation and keyboard controls
12. Accessible (ARIA labels, focus management)

---

## Story 4.10: Testimonials Slider Component

**As a** visitor,
**I want** to see client testimonials in a slider format,
**so that** I can read reviews from past clients.

### Acceptance Criteria

1. Testimonials component created using Swiper
2. Dark cards (#1E1E1E) with gradient highlights
3. Each testimonial shows circular client photo, quote, name, company/role
4. Auto-play enabled (5-6s per slide)
5. Navigation bullets with purple-pink active state
6. Pause on hover
7. Testimonial data structure created in `data/testimonials.ts`
8. Responsive layout (1 testimonial on mobile, 2 on desktop)
9. Component tests verify slider and auto-play
10. Keyboard accessible (can pause/navigate with keys)
11. Smooth transitions between slides
12. Quote marks or styling indicates testimonial content

---

## Story 4.11: Blog Preview Section

**As a** visitor,
**I want** to see a blog preview section with recent posts,
**so that** I can discover written content.

### Acceptance Criteria

1. BlogPreview component created
2. Displays three blog post cards
3. Each card shows featured image on top, dark body (#1E1E1E) below
4. Card contains post title, excerpt, "Read more" link
5. Date and category labels included
6. Hover effect: image zoom (scale 1.05)
7. Blog data structure created in `data/blog.ts`
8. Links to individual blog post pages (stub pages OK for MVP)
9. Responsive grid (3 columns desktop, 2 tablet, 1 mobile)
10. Component tests verify card layout and hover effects
11. Images lazy-loaded for performance
12. Accessibility: semantic HTML, alt text

---

## Story 4.12: Contact Section - Form & Google Maps

**As a** visitor,
**I want** to see a contact form and Google Map in the contact section,
**so that** I can easily get in touch and see location.

### Acceptance Criteria

1. Contact section restructured to two-column layout
2. Left column: Contact form in dark card
3. Form fields: Name, Email, Subject, Message (white labels, dark backgrounds)
4. Submit button uses purple-pink gradient
5. Success/error alerts (green for success, red for errors)
6. Right column: Google Maps embed with dark styling
7. Map location configured (user provides coordinates)
8. Form validation matches existing ContactForm behavior
9. Submission connects to existing `/api/contact` endpoint
10. Google Maps API key configured in environment variables
11. Component tests verify form and map rendering
12. Responsive: stacks on mobile (form above map)

---

## Story 4.13: Scroll Animations & Interactions

**As a** visitor,
**I want** sections to animate as I scroll down the page,
**so that** the site feels dynamic and engaging.

### Acceptance Criteria

1. Animation library installed (Framer Motion or AOS)
2. Sections fade up with slight motion on viewport entry
3. Headings slide horizontally on reveal
4. Icons scale up slightly on reveal
5. Smooth easing curves applied
6. Scroll triggers configured for all major sections
7. Reduced motion preference respected (prefers-reduced-motion)
8. Performance optimized (no jank, smooth 60fps)
9. Animations work across all browsers
10. Component tests verify animation triggers
11. Keyboard/screen reader users not disrupted by animations
12. Animations can be disabled via user preference

---

## Story 4.14: Button & Hover Effect Updates

**As a** developer,
**I want** all buttons and interactive elements to use purple-pink gradients on hover,
**so that** the site has consistent interactive styling.

### Acceptance Criteria

1. All buttons invert colors on hover
2. Purple-pink gradient background activates on hover
3. Smooth transition (0.3s ease) applied
4. Navigation links show sliding underline bar on hover
5. Portfolio cards enlarge slightly (scale 1.05) on hover
6. Card overlay shows gradient background on hover
7. CSS transitions defined in globals.css or component styles
8. All hover states tested across components
9. Touch devices show active states appropriately
10. Keyboard focus states match hover states
11. Component tests verify hover transitions
12. Accessibility: focus indicators visible and clear

---

## Story 4.15: Typography & Spacing Audit

**As a** developer,
**I want** to audit and update typography and spacing to match the template specification,
**so that** the visual hierarchy and rhythm are correct.

### Acceptance Criteria

1. All section labels converted to uppercase
2. Letter-spacing increased for labels (0.1-0.15em)
3. Section padding updated to 6-8rem (top/bottom) on desktop
4. Consistent margins: 1-1.5rem between elements
5. Card padding updated to 2-3rem
6. Line-height set to 1.5 for body text
7. CSS variables created for spacing rhythm
8. All components use spacing variables consistently
9. Responsive spacing scales properly (clamp or breakpoints)
10. Visual regression testing confirms spacing changes
11. Component tests verify spacing classes applied
12. Accessibility: text remains readable, touch targets adequate

---

## Implementation Phases

### Phase 1: Critical Visual Changes (Stories 4.1-4.3)
- Update color palette
- Fix hero heading outline stroke
- Restructure hero to three-column layout

### Phase 2: Core Interactive Components (Stories 4.4-4.5)
- Implement preloader animation
- Build off-canvas menu

### Phase 3: Content Sections (Stories 4.6-4.7)
- Create services section
- Add timeline/experience section

### Phase 4: Sliders & Lightbox (Stories 4.8-4.10)
- Install Swiper.js and build portfolio slider
- Create lightbox component
- Build testimonials slider

### Phase 5: Additional Features (Stories 4.11-4.12)
- Blog preview section
- Contact form + Google Maps

### Phase 6: Polish & Refinement (Stories 4.13-4.15)
- Scroll animations
- Hover effects and transitions
- Typography and spacing audit

---

## Notes

**Scope:** This is a major redesign representing ~60-70% new work. The epic transforms the current minimal portfolio into a rich, interactive template-matching experience.

**Dependencies:**
- All stories depend on Story 4.1 (color palette) being completed first
- Story 4.9 (Lightbox) depends on Story 4.8 (Portfolio Slider)
- Story 4.14 (Hover effects) should be done after color palette and component stories

**Technical Debt:**
- Consider creating a design system component library for reusable gradient buttons, cards, etc.
- May need to refactor existing components to use new color system
- Performance monitoring recommended after adding animations and sliders

**Risk:**
- Large scope may require multiple sprints
- Existing functionality must remain stable during redesign
- User acceptance testing needed to validate against idea.md specification
