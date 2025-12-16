'use client';

import { useState, FormEvent } from 'react';
import { cn } from '@/lib/utils';

interface FormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
  honeypot: string; // Spam protection
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    projectType: 'Commercial',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmissionState('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionState('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          projectType: 'Commercial',
          message: '',
          honeypot: '',
        });
        setErrors({});

        // Auto-dismiss success message after 5 seconds
        setTimeout(() => setSubmissionState('idle'), 5000);
      } else {
        setSubmissionState('error');
      }
    } catch {
      setSubmissionState('error');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-2xl mx-auto space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={cn(
            'w-full px-4 py-3 rounded-lg bg-gray-800 border',
            'focus:outline-none focus:ring-2 focus:ring-[#D5007F]',
            errors.name ? 'border-red-500' : 'border-gray-700'
          )}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-500">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={cn(
            'w-full px-4 py-3 rounded-lg bg-gray-800 border',
            'focus:outline-none focus:ring-2 focus:ring-[#D5007F]',
            errors.email ? 'border-red-500' : 'border-gray-700'
          )}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-500">
            {errors.email}
          </p>
        )}
      </div>

      {/* Project Type Field */}
      <div>
        <label htmlFor="projectType" className="block text-sm font-medium mb-2">
          Project Type
        </label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D5007F]"
        >
          <option value="Commercial">Commercial</option>
          <option value="Music Video">Music Video</option>
          <option value="Wedding">Wedding</option>
          <option value="Short Film">Short Film</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className={cn(
            'w-full px-4 py-3 rounded-lg bg-gray-800 border',
            'focus:outline-none focus:ring-2 focus:ring-[#D5007F]',
            errors.message ? 'border-red-500' : 'border-gray-700'
          )}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-500">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot Field (hidden spam protection) */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="honeypot">Leave this field empty</label>
        <input
          type="text"
          id="honeypot"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Success Message */}
      {submissionState === 'success' && (
        <div role="alert" className="p-4 bg-green-900/20 border border-green-500 rounded-lg text-green-400">
          Thanks! I&apos;ll get back to you within 24-48 hours.
        </div>
      )}

      {/* Error Message */}
      {submissionState === 'error' && (
        <div role="alert" className="p-4 bg-red-900/20 border border-red-500 rounded-lg text-red-400">
          Something went wrong. Please try again.
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submissionState === 'loading'}
        className={cn(
          'w-full px-8 py-4 rounded-lg font-medium transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-[#D5007F] focus:ring-offset-2',
          submissionState === 'loading'
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-[#450E93] to-[#D5007F] text-white hover:from-[#5a1bb8] hover:to-[#e6009a]'
        )}
      >
        {submissionState === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
