# Testing Strategy

## Testing Pyramid

```
        E2E Tests
       /         \
    Integration Tests
   /                 \
  Component    API Route
    Tests        Tests
```

## Test Organization

### Frontend Tests

```
components/
├── ui/
│   ├── Button.tsx
│   └── Button.test.tsx
├── video/
│   ├── VideoPlayer.tsx
│   └── VideoPlayer.test.tsx
└── contact/
    ├── ContactForm.tsx
    └── ContactForm.test.tsx
```

### Backend Tests

```
app/
└── api/
    └── contact/
        ├── route.ts
        └── route.test.ts
```

### E2E Tests

```
e2e/
├── home.spec.ts
├── portfolio.spec.ts
├── contact.spec.ts
└── navigation.spec.ts
```

## Test Examples

### Frontend Component Test

```typescript
// components/ui/Button.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button isLoading>Submit</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies variant styles', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-white');
  });
});
```

### Backend API Test

```typescript
// app/api/contact/route.test.ts

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import { NextRequest } from 'next/server';

// Mock Resend
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({ id: 'test-id' }),
    },
  })),
}));

describe('POST /api/contact', () => {
  const createRequest = (body: object) =>
    new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify(body),
    });

  it('returns 400 for missing fields', async () => {
    const request = createRequest({ name: 'Test' });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it('returns 400 for honeypot filled', async () => {
    const request = createRequest({
      name: 'Test',
      email: 'test@example.com',
      projectType: 'Commercial',
      message: 'Test message here',
      honeypot: 'spam',
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it('returns 200 for valid submission', async () => {
    const request = createRequest({
      name: 'Test User',
      email: 'test@example.com',
      projectType: 'Commercial',
      message: 'This is a test message for the contact form.',
    });
    const response = await POST(request);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
  });
});
```

### E2E Test

```typescript
// e2e/contact.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('displays contact form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /work with me/i })).toBeVisible();
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/project type/i)).toBeVisible();
    await expect(page.getByLabel(/message/i)).toBeVisible();
  });

  test('shows validation errors for empty form', async ({ page }) => {
    await page.getByRole('button', { name: /send/i }).click();
    await expect(page.getByText(/name is required/i)).toBeVisible();
  });

  test('submits form successfully', async ({ page }) => {
    await page.getByLabel(/name/i).fill('Test User');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/project type/i).selectOption('Commercial');
    await page.getByLabel(/message/i).fill('This is a test inquiry for the portfolio.');

    await page.getByRole('button', { name: /send/i }).click();

    await expect(page.getByText(/thank you/i)).toBeVisible();
  });
});
```

---
