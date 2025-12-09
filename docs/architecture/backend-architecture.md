# Backend Architecture

## Service Architecture (Serverless)

### Function Organization

```
app/
└── api/
    └── contact/
        └── route.ts        # POST /api/contact
```

### Function Template

```typescript
// app/api/contact/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactSubmission } from '@/types/contact';

const resend = new Resend(process.env.RESEND_API_KEY);

// Validation helper
function validateSubmission(data: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const submission = data as ContactSubmission;

  if (!submission.name?.trim()) errors.push('Name is required');
  if (!submission.email?.trim()) errors.push('Email is required');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email || '')) {
    errors.push('Invalid email format');
  }
  if (!submission.projectType) errors.push('Project type is required');
  if (!submission.message?.trim()) errors.push('Message is required');
  if ((submission.message?.length || 0) < 10) {
    errors.push('Message must be at least 10 characters');
  }

  return { valid: errors.length === 0, errors };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot check
    if (body.honeypot) {
      return NextResponse.json(
        { success: false, message: 'Spam detected' },
        { status: 400 }
      );
    }

    // Validate
    const { valid, errors } = validateSubmission(body);
    if (!valid) {
      return NextResponse.json(
        { success: false, message: errors.join(', ') },
        { status: 400 }
      );
    }

    const { name, email, projectType, message } = body as ContactSubmission;

    // Send email
    await resend.emails.send({
      from: 'UmerFilms <noreply@yourdomain.com>',
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `New Portfolio Inquiry: ${projectType}`,
      html: `
        <h2>New Portfolio Inquiry</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Sent from UmerFilms Portfolio</small></p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
```

## Database Architecture

**N/A for MVP** - Using static data files instead of database.

## Authentication and Authorization

**N/A for MVP** - No user accounts or protected routes required.

---
