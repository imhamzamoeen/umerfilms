import { Metadata } from 'next';
import { getAllBlogPosts } from '@/data/blog';

export const revalidate = 604800; // Revalidate every week (7 days)
import BlogHeader from '@/components/blog/BlogHeader';
import BlogSearch from '@/components/blog/BlogSearch';

export const metadata: Metadata = {
  title: 'Journal - UmerFilms',
  description: 'Insights into videography, storytelling, and the creative process.',
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <BlogHeader />
      <BlogSearch initialPosts={posts} />
    </main>
  );
}
