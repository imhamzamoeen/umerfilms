import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BlogPostPage from './page';

describe('BlogPostPage', () => {
  it('renders blog post title', async () => {
    const params = Promise.resolve({ slug: 'cinematic-video-production-tips' });
    render(await BlogPostPage({ params }));

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('5 Tips for Cinematic Video Production');
  });

  it('renders post category', async () => {
    const params = Promise.resolve({ slug: 'cinematic-video-production-tips' });
    render(await BlogPostPage({ params }));

    expect(screen.getByText('Tips & Tricks')).toBeInTheDocument();
  });

  it('renders reading time', async () => {
    const params = Promise.resolve({ slug: 'cinematic-video-production-tips' });
    render(await BlogPostPage({ params }));

    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('renders back to blog link', async () => {
    const params = Promise.resolve({ slug: 'cinematic-video-production-tips' });
    render(await BlogPostPage({ params }));

    const backLink = screen.getByRole('link', { name: /back to blog/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/blog');
  });

  it('renders post content', async () => {
    const params = Promise.resolve({ slug: 'cinematic-video-production-tips' });
    render(await BlogPostPage({ params }));

    // Check for some content from the post
    expect(screen.getByText(/Master Your Lighting/)).toBeInTheDocument();
  });

  it('renders author section', async () => {
    const params = Promise.resolve({ slug: 'cinematic-video-production-tips' });
    render(await BlogPostPage({ params }));

    expect(screen.getByText('Umer Films')).toBeInTheDocument();
    expect(screen.getByText('Written by')).toBeInTheDocument();
  });

  it('renders tags when available', async () => {
    const params = Promise.resolve({ slug: 'cinematic-video-production-tips' });
    render(await BlogPostPage({ params }));

    expect(screen.getByText('cinematography')).toBeInTheDocument();
    expect(screen.getByText('tips')).toBeInTheDocument();
  });

  it('renders related posts section', async () => {
    const params = Promise.resolve({ slug: 'cinematic-video-production-tips' });
    render(await BlogPostPage({ params }));

    expect(screen.getByRole('heading', { name: /related posts/i })).toBeInTheDocument();
  });

  it('renders featured image', async () => {
    const params = Promise.resolve({ slug: 'cinematic-video-production-tips' });
    render(await BlogPostPage({ params }));

    const image = screen.getByRole('img', { name: '5 Tips for Cinematic Video Production' });
    expect(image).toBeInTheDocument();
  });
});
