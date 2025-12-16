# Requirements

## Functional Requirements

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

## Non-Functional Requirements

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
