# Frontend Architecture

## Component Architecture

### Component Organization

```
src/
├── components/
│   ├── ui/                    # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Textarea.tsx
│   │   └── index.ts
│   ├── layout/                # Layout components
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── PageWrapper.tsx
│   │   └── index.ts
│   ├── video/                 # Video-related components
│   │   ├── VideoPlayer.tsx
│   │   ├── HeroVideo.tsx
│   │   └── index.ts
│   ├── portfolio/             # Portfolio components
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectGrid.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── RelatedProjects.tsx
│   │   └── index.ts
│   ├── contact/               # Contact components
│   │   ├── ContactForm.tsx
│   │   ├── ServiceList.tsx
│   │   └── index.ts
│   └── home/                  # Homepage components
│       ├── HeroSection.tsx
│       ├── IntroSection.tsx
│       ├── FeaturedWork.tsx
│       ├── CTASection.tsx
│       └── index.ts
```

### Component Template

```typescript
// components/ui/Button.tsx

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-white text-black hover:bg-gray-200': variant === 'primary',
            'bg-transparent border border-white text-white hover:bg-white/10': variant === 'secondary',
            'bg-transparent text-white hover:bg-white/10': variant === 'ghost',
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-base': size === 'md',
            'h-12 px-6 text-lg': size === 'lg',
          },
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

## State Management Architecture

### State Structure

```typescript
// No global state management needed for MVP
// Component-level state using React hooks

// Example: CategoryFilter state
const [selectedCategory, setSelectedCategory] = useState<string>('All');

// Example: ContactForm state
const [formState, setFormState] = useState<{
  status: 'idle' | 'loading' | 'success' | 'error';
  error?: string;
}>({ status: 'idle' });

// Example: Mobile menu state
const [isMenuOpen, setIsMenuOpen] = useState(false);
```

### State Management Patterns

- Use `useState` for simple component state (form inputs, UI toggles)
- Use `useReducer` for complex form state if needed
- Lift state up when siblings need to share data
- No global state library needed - app is mostly static content
- Server state (projects) is pre-rendered at build time

## Routing Architecture

### Route Organization

```
app/
├── layout.tsx              # Root layout (nav, footer)
├── page.tsx                # Home page (/)
├── work/
│   ├── page.tsx            # Portfolio grid (/work)
│   └── [slug]/
│       └── page.tsx        # Project detail (/work/[slug])
├── about/
│   └── page.tsx            # About page (/about)
├── contact/
│   └── page.tsx            # Work With Me page (/contact)
├── api/
│   └── contact/
│       └── route.ts        # Contact form API (/api/contact)
└── not-found.tsx           # 404 page
```

### Protected Route Pattern

N/A - No authentication required for this portfolio site.

## Frontend Services Layer

### API Client Setup

```typescript
// lib/api.ts

const API_BASE = '/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || 'An error occurred' };
    }

    return { data };
  } catch (error) {
    return { error: 'Network error. Please try again.' };
  }
}

export const api = {
  get: <T>(endpoint: string) => apiRequest<T>(endpoint),
  post: <T>(endpoint: string, body: unknown) =>
    apiRequest<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};
```

### Service Example

```typescript
// services/contact.ts

import { api } from '@/lib/api';
import { ContactSubmission, ContactResponse } from '@/types/contact';

export async function submitContactForm(
  data: ContactSubmission
): Promise<{ success: boolean; error?: string }> {
  const response = await api.post<ContactResponse>('/contact', data);

  if (response.error) {
    return { success: false, error: response.error };
  }

  return { success: true };
}
```

---
