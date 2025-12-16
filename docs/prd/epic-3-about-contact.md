# Epic 3: About & Contact

## Goal
Build the About page with video introduction and the Work With Me section with services list and functional contact form with email notifications.

---

## Story 3.1: About Page with Video Introduction

**As a** visitor,
**I want** to watch a video introduction from Umer and read about his background,
**so that** I can understand his personality and decide if he's the right fit for my project.

### Acceptance Criteria

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

## Story 3.2: Work With Me Page with Services List

**As a** visitor,
**I want** to see what services Umer offers,
**so that** I can understand how he can help with my project.

### Acceptance Criteria

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

## Story 3.3: Contact Form Component

**As a** visitor,
**I want** to fill out a contact form with my project details,
**so that** I can request a quote from Umer.

### Acceptance Criteria

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

## Story 3.4: Contact Form API & Email Notification

**As** Umer,
**I want** to receive email notifications when someone submits the contact form,
**so that** I can respond to potential client inquiries promptly.

### Acceptance Criteria

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

## Story 3.5: Final Integration & Launch Readiness

**As a** developer,
**I want** to verify all pages work together and the site is launch-ready,
**so that** the portfolio can be deployed to production.

### Acceptance Criteria

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
