import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BlogPreview from './BlogPreview';
import BlogCard from './BlogCard';
import { getBlogPosts, BlogPost } from '@/data/blog';

describe('BlogPreview', () => {
  it('renders section heading', () => {
    render(<BlogPreview />);
    expect(
      screen.getByRole('heading', { name: /latest insights/i })
    ).toBeInTheDocument();
  });

  it('renders section label', () => {
    render(<BlogPreview />);
    expect(screen.getByText(/blog/i)).toBeInTheDocument();
  });

  it('renders three blog posts', () => {
    render(<BlogPreview />);
    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(3);
  });

  it('renders View All Posts link', () => {
    render(<BlogPreview />);
    expect(
      screen.getByRole('link', { name: /view all posts/i })
    ).toBeInTheDocument();
  });

  it('View All Posts links to blog page', () => {
    render(<BlogPreview />);
    const link = screen.getByRole('link', { name: /view all posts/i });
    expect(link).toHaveAttribute('href', '/blog');
  });
});

describe('BlogCard', () => {
  const mockPost: BlogPost = {
    id: 'test-post',
    title: 'Test Blog Post Title',
    excerpt: 'This is a test excerpt for the blog post.',
    featuredImage: '/images/blog/test.jpg',
    category: 'Test Category',
    date: '2024-03-15',
    slug: 'test-blog-post',
  };

  it('renders post title', () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
  });

  it('renders post excerpt', () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText(mockPost.excerpt)).toBeInTheDocument();
  });

  it('renders post category', () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText(mockPost.category)).toBeInTheDocument();
  });

  it('renders formatted date', () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText('Mar 15, 2024')).toBeInTheDocument();
  });

  it('renders Read more link', () => {
    render(<BlogCard post={mockPost} />);
    expect(
      screen.getByRole('link', { name: /read more/i })
    ).toBeInTheDocument();
  });

  it('links to correct blog post page', () => {
    render(<BlogCard post={mockPost} />);
    const links = screen.getAllByRole('link');
    const blogLinks = links.filter((link) =>
      link.getAttribute('href')?.includes('/blog/test-blog-post')
    );
    expect(blogLinks.length).toBeGreaterThan(0);
  });

  it('renders featured image with alt text', () => {
    render(<BlogCard post={mockPost} />);
    const image = screen.getByAltText(mockPost.title);
    expect(image).toBeInTheDocument();
  });

  it('image has lazy loading attribute', () => {
    render(<BlogCard post={mockPost} />);
    const image = screen.getByAltText(mockPost.title);
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('has hover zoom class on image', () => {
    render(<BlogCard post={mockPost} />);
    const image = screen.getByAltText(mockPost.title);
    expect(image.className).toContain('group-hover:scale-105');
  });
});

describe('Blog Data', () => {
  it('getBlogPosts returns posts', () => {
    const posts = getBlogPosts();
    expect(posts.length).toBeGreaterThan(0);
  });

  it('getBlogPosts with limit returns correct number', () => {
    const posts = getBlogPosts(2);
    expect(posts).toHaveLength(2);
  });

  it('all posts have required fields', () => {
    const posts = getBlogPosts();
    posts.forEach((post) => {
      expect(post.id).toBeDefined();
      expect(post.title).toBeDefined();
      expect(post.excerpt).toBeDefined();
      expect(post.featuredImage).toBeDefined();
      expect(post.category).toBeDefined();
      expect(post.date).toBeDefined();
      expect(post.slug).toBeDefined();
    });
  });
});
