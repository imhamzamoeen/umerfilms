1. Colour palette

Base background: solid black (#000000). Most sections use a pure black backdrop, creating high contrast with the content.

Primary text: pure white (#FFFFFF) for headings, large numbers and most body text. Secondary text (biography labels, skills list) uses a slightly muted white/light gray (approx. #D0D0D0) for hierarchy.

Accent colours:

The hero section uses a purple‑to‑pink gradient overlay on the circular photo. This appears to be a linear gradient beginning with a deep violet (around #450E93) and blending into a hot magenta/pink (#D5007F).

Small bullets and subtle highlights (e.g., the dot beside “MENU •” and gradient strokes on buttons) adopt similar purple/pink hues.

Buttons and cards:

The “Let’s Talk” pill button is very dark charcoal (#141414) with a thin white border. On hover it inverts to a purple gradient fill with white text.

The “Menu” button has a white background with black text and a tiny purple dot; on hover it reverses to black with white text.

Statistics & icons: numbers and icons remain white; the circular icon backgrounds for social links are very dark gray (#1E1E1E) with white icons.

Colour usage: Dark neutral base enhances legibility and highlights the colourful gradients. Keep gradients consistent in direction (left‑to‑right or top‑to‑bottom) and never introduce new hues.

2. Typography & spacing

Font family: The template uses a geometric sans‑serif (similar to Poppins or Inter). Headings are set in a heavy weight with all‑caps; the hero title uses an outline (stroke) rather than fill.

Font sizes:

H1 (hero heading): extremely large (~8–9 rem on desktop), outline stroke 2–3 px.

H2/section titles: ~3–4 rem, filled white text.

Body text: 1 rem (16 px) with regular weight.

Captions/labels: 0.75–0.875 rem (12–14 px), uppercase, letter‑spaced.

Line height & letter spacing: generous line height (1.5 for body text) and increased letter spacing for small labels.

Spacing: The layout breathes. Each section has substantial top and bottom padding (~6–8 rem on large screens) and plenty of margin around cards. Use consistent margin between headings, paragraphs and buttons (~1–1.5 rem). Maintain similar horizontal padding inside cards and buttons.

3. Layout & grids

Hero section: three‑column layout on desktop: left column for biography/skills, centre for the circular portrait, right for statistics. On tablets it becomes two columns (image and text stacked), and on mobile it collapses to one column.

Global container: content is centred with a max‑width around 1280 px and horizontal padding of 1–1.5 rem.

Sections:

About & Services: two‑column structure (text left, image or list right) with alternating image/text order to add variety.

Skills/Services cards: grid of 3 cards per row on desktop, 2 on tablets, and full‑width on mobile. Each card has a dark background, border radius (~1 rem), subtle drop shadow and a coloured icon at the top.

Portfolio: implemented with a swiper slider. Each slide contains an image with overlayed project title and category; clicking opens a lightbox.

Testimonials: slider with user avatars and quotes, using the same dark cards and gradient highlights.

Blog preview: three posts displayed in cards with images on top and dark bodies below.

Contact section: two columns—contact form on the left (dark card with white input text, purple button) and an embedded Google map on the right.

Navigation: top right contains a pill‑shaped “Menu” button that toggles a fullscreen off‑canvas menu with navigation links. A “Let’s Talk” button triggers a contact modal or scrolls to the contact section.

Order of sections: Hero → About → Services/Skills → Experience/Timeline → Portfolio → Testimonials → Blog → Contact → Footer with social links and copyright.

4. Animations & micro‑interactions

Preloader: on page load, a “LOADING” animation appears with each letter fading in sequentially. After completion, the page content slides in from the bottom.

Scroll animations: sections fade up with slight motion when they enter the viewport. Some headings slide horizontally; icons scale up slightly on reveal.

Hover effects:

Buttons invert colours or activate gradient backgrounds.

Portfolio cards enlarge slightly and show overlayed text.

Navigation links underline with a sliding bar.

Slider transitions: portfolio and testimonials use smooth sliding animations with easing curves (~0.4 s ease‑out) and pagination bullets. The bullets fill with the accent colour on active state.

Accordion/Toggle: the off‑canvas menu smoothly expands; timeline items slide open; contact form fields highlight on focus.

5. Icons & imagery

Icon set: The template bundles over 3 000 font icons
themes.aedevstudio.com
, likely using Bootstrap Icons and custom line icons. Use the same icons for social links, skills and services.

Images:

Circular hero portrait with a purple–pink overlay and a thin white stroke.

Services icons are simple outlines filled with the accent gradient.

Portfolio images maintain consistent aspect ratios (16:9 or square) with 0.75–1 rem border radii.

Placement: Avatars and icons are centred at the top of cards; images have margin below for titles and buttons.

6. Interactive components

Header toggle menu: The “Menu” pill opens a fullscreen overlay containing site navigation links. It darkens the background and shifts focus to the menu.

Portfolio slider: Shows multiple projects, each clickable to reveal a lightbox. Use Swiper.js as the underlying component (already included in the template).

Single pages: Provide individual project and blog pages with dark backgrounds and similar typography.

Contact form: Contains name, email, subject and message fields, styled with white labels and dark input backgrounds. On submission, it displays success or error messages using coloured alerts (green for success, red for errors).

Google Map: Embedded in the contact section with dark styling to match the theme.

Lightbox: When a portfolio image is clicked, open it in an overlay with next/previous navigation and caption.

7. Technical fidelity

Responsiveness: The design uses breakpoints at ~640 px, ~768 px and ~1024 px to adjust column counts and spacing. Ensure the layout stacks gracefully on small screens and maintains readability.

Performance: Follow the template’s emphasis on optimisation (page‑speed grade “A”
themes.aedevstudio.com
). Lazy‑load images, minify CSS/JS and use next/image for responsive images.

Semantic & accessible: Use semantic HTML5 elements (header, nav, section, article, footer), ARIA labels for interactive components, and alt text for images. Ensure sufficient colour contrast on text and interactive elements.

Tech stack: Built with Next.js 14 and Bootstrap 5 (SCSS). Swiper is used for sliders; Google Maps and a working contact form are integrated; SCSS files are included
themes.aedevstudio.com
.

8. Constraints & guidance for rebuilding with Antigravity

No improvisation: Do not introduce new colours, fonts, icons or animations. Every visual element must be based on the original template.

Do not remove features: Include the header toggle menu, portfolio slider, single pages, preloader, contact form and Google Map
themes.aedevstudio.com
. Replicate their behaviour and styling exactly.

Exact spacing & hierarchy: Mirror the typographic hierarchy, spacing rhythm and grid structure.

Consistent gradient: Use the same purple‑to‑pink gradient across all buttons, icons and highlights; do not alter its direction or hues.

Not a WordPress theme: Build the replica using Antigravity’s components (React‑based) and Next.js. Leverage Swiper for sliders, Bootstrap variables for spacing, and import the same icon set.