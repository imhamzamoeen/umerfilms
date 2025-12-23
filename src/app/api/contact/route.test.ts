import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

// Create mock sendEmail function using vi.hoisted
const { mockSendEmail } = vi.hoisted(() => ({
  mockSendEmail: vi.fn(),
}));

// Mock email module
vi.mock('@/lib/email', () => ({
  sendEmail: mockSendEmail,
}));

import { POST } from './route';

describe('POST /api/contact', () => {
  const createRequest = (body: object) =>
    new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify(body),
    });

  beforeEach(() => {
    vi.clearAllMocks();
    // Set default successful response
    mockSendEmail.mockResolvedValue({ success: true });
  });

  it('returns 400 for missing name field', async () => {
    const request = createRequest({
      email: 'test@example.com',
      projectType: 'Commercial',
      message: 'This is a test message',
    });

    const response = await POST(request);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
  });

  it('returns 400 for missing projectType field', async () => {
    const request = createRequest({
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message',
    });

    const response = await POST(request);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.message).toMatch(/all fields are required/i);
  });

  it('returns 400 for invalid email format', async () => {
    const request = createRequest({
      name: 'Test User',
      email: 'invalid-email',
      projectType: 'Commercial',
      message: 'This is a test message',
    });

    const response = await POST(request);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.message).toMatch(/invalid email/i);
  });

  it('returns 400 for honeypot filled', async () => {
    const request = createRequest({
      name: 'Test User',
      email: 'test@example.com',
      projectType: 'Commercial',
      message: 'This is a test message',
      honeypot: 'spam',
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it('sends email with correct data on valid submission', async () => {
    const request = createRequest({
      name: 'Test User',
      email: 'test@example.com',
      projectType: 'Commercial',
      message: 'This is a test message for the contact form.',
    });

    await POST(request);

    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: 'New Portfolio Inquiry: Commercial',
      })
    );
  });

  it('returns 200 on successful submission', async () => {
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

  it('returns 500 on email service error', async () => {
    // Override the default mock for this test
    mockSendEmail.mockResolvedValueOnce({
      success: false,
      error: 'SMTP connection failed',
    });

    const request = createRequest({
      name: 'Test User',
      email: 'test@example.com',
      projectType: 'Commercial',
      message: 'This is a test message for the contact form.',
    });

    const response = await POST(request);
    expect(response.status).toBe(500);

    const data = await response.json();
    expect(data.success).toBe(false);
  });

  it('returns 400 for message shorter than 10 characters', async () => {
    const request = createRequest({
      name: 'Test User',
      email: 'test@example.com',
      projectType: 'Commercial',
      message: 'Short',
    });

    const response = await POST(request);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.message).toMatch(/at least 10 characters/i);
  });

  it('trims whitespace from input fields', async () => {
    const request = createRequest({
      name: '  Test User  ',
      email: '  test@example.com  ',
      projectType: '  Commercial  ',
      message: '  This is a test message for the contact form.  ',
    });

    await POST(request);

    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        html: expect.stringContaining('<p><strong>Name:</strong> Test User</p>'),
      })
    );
  });

  it('returns 400 for fields with only whitespace', async () => {
    const request = createRequest({
      name: '   ',
      email: 'test@example.com',
      projectType: 'Commercial',
      message: 'This is a test message',
    });

    const response = await POST(request);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.message).toMatch(/all fields are required/i);
  });

  it('escapes HTML in email to prevent XSS', async () => {
    const request = createRequest({
      name: '<script>alert("xss")</script>',
      email: 'test@example.com',
      projectType: 'Commercial',
      message: 'This is a test <strong>message</strong>',
    });

    await POST(request);

    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        html: expect.stringContaining('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'),
      })
    );
    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        html: expect.stringContaining('&lt;strong&gt;message&lt;/strong&gt;'),
      })
    );
  });
});
