# Data Models

## Project Model

**Purpose:** Represents a portfolio project/work item displayed on the Work page

**Key Attributes:**
- id: string - Unique identifier
- title: string - Project display name
- slug: string - URL-friendly identifier
- category: Category - Project category for filtering
- description: string - Project description
- thumbnailUrl: string - Path to thumbnail image
- videoUrl: string - Path to project video
- featured: boolean - Whether to show on homepage
- order: number - Sort priority

### TypeScript Interface

```typescript
// types/project.ts

export type Category =
  | 'Commercial'
  | 'Music Video'
  | 'Wedding'
  | 'Short Film'
  | 'Personal';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: Category;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  featured: boolean;
  order: number;
  // Optional fields for future expansion
  client?: string;
  date?: string;
  tags?: string[];
}
```

### Relationships

- Projects are standalone entities (no relationships for MVP)
- Category is a simple enum, not a separate entity

---

## Contact Submission Model

**Purpose:** Represents a contact form submission sent to Umer

**Key Attributes:**
- name: string - Sender's name
- email: string - Sender's email address
- projectType: ProjectType - Type of project inquiry
- message: string - Inquiry message
- timestamp: string - Submission timestamp
- honeypot: string - Spam detection field (should be empty)

### TypeScript Interface

```typescript
// types/contact.ts

export type ProjectType =
  | 'Commercial'
  | 'Music Video'
  | 'Wedding'
  | 'Short Film'
  | 'Other';

export interface ContactSubmission {
  name: string;
  email: string;
  projectType: ProjectType;
  message: string;
  honeypot?: string; // Spam detection - must be empty
}

export interface ContactResponse {
  success: boolean;
  message: string;
  error?: string;
}
```

### Relationships

- Contact submissions are sent via email, not stored in database

---

## Site Content Model

**Purpose:** Static content for pages (about bio, services, etc.)

### TypeScript Interface

```typescript
// types/content.ts

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface SocialLink {
  platform: 'instagram' | 'youtube' | 'tiktok';
  url: string;
  label: string;
}

export interface SiteContent {
  hero: {
    title: string;
    tagline: string;
    showreelUrl: string;
    posterUrl: string;
  };
  about: {
    videoUrl: string;
    posterUrl: string;
    bio: string[];
    skills?: string[];
  };
  services: Service[];
  social: SocialLink[];
}
```

---
