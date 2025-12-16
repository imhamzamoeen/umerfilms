# Epic 2: Portfolio & Project Display

## Goal
Create the Work/Portfolio page showcasing projects in a grid layout with video thumbnails, and individual project detail pages with full video playback.

---

## Story 2.1: Project Data Structure & Content

**As a** developer,
**I want** a well-defined project data structure with sample content,
**so that** portfolio components can render project information consistently.

### Acceptance Criteria

1. TypeScript interface/type is defined for Project with fields: id, title, slug, category, description, thumbnailUrl, videoUrl, featured (boolean), order (number)
2. Category type is defined as union of allowed values (e.g., "Commercial", "Music Video", "Wedding", "Short Film", "Personal")
3. Sample project data file exists with at least 6 placeholder projects across different categories
4. Data file exports helper functions: getAllProjects(), getProjectBySlug(), getFeaturedProjects(), getProjectsByCategory()
5. Placeholder thumbnail images are added to public folder (can be solid color placeholders)
6. Placeholder video files or references are included (can reuse hero video or use test videos)
7. Data structure supports future expansion (tags, client name, date, etc. as optional fields)

---

## Story 2.2: Project Card Component

**As a** visitor,
**I want** to see project thumbnails that preview the content,
**so that** I can quickly scan and find projects that interest me.

### Acceptance Criteria

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

## Story 2.3: Work Page with Portfolio Grid

**As a** visitor,
**I want** to browse all of Umer's projects on the Work page,
**so that** I can explore the full range of his portfolio.

### Acceptance Criteria

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

## Story 2.4: Project Detail Page

**As a** visitor,
**I want** to view a single project with its full video and details,
**so that** I can appreciate the work and understand the context.

### Acceptance Criteria

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

## Story 2.5: Related Projects Section

**As a** visitor,
**I want** to see related projects after viewing one,
**so that** I can continue exploring similar work.

### Acceptance Criteria

1. Related projects section appears below the main project content
2. Section displays 3 project cards from the same category (excluding current)
3. If fewer than 3 in same category, fill with other projects
4. Section heading: "More Work" or "Related Projects"
5. Project cards link to their respective detail pages
6. Section is responsive (1-3 columns based on viewport)
7. Section does not appear if there are no other projects

---

## Story 2.6: Update Homepage Featured Work

**As a** visitor,
**I want** the homepage featured work section to show real projects,
**so that** I can preview Umer's best work before going to the full portfolio.

### Acceptance Criteria

1. Homepage featured section pulls from getFeaturedProjects() (projects with featured: true)
2. Displays 3-4 featured project cards
3. Cards link to individual project detail pages
4. "View All Work" link navigates to Work page
5. Section uses same ProjectCard component as Work page
6. Featured projects are curated (not random) based on data

---
