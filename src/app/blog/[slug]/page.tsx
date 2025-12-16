// src/app/blog/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowLeft, BsClock, BsCalendar } from 'react-icons/bs';
import { getBlogPostBySlug, getAllBlogPosts, getRelatedBlogPosts } from '@/data/blog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found - UmerFilms Blog',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} | UmerFilms Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post.id, post.category, 3);
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh]">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-12 md:pb-16">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-6 focus:outline-none focus:ring-2 focus:ring-[#D5007F] focus:ring-offset-2 focus:ring-offset-black rounded"
            aria-label="Back to Blog"
          >
            <BsArrowLeft className="text-lg" aria-hidden="true" />
            <span>Back to Blog</span>
          </Link>

          {/* Category */}
          <p className="text-sm uppercase tracking-widest text-[#D5007F] font-bold mb-4">
            {post.category}
          </p>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-gray-300">
            <span className="flex items-center gap-2">
              <BsCalendar className="text-[#D5007F]" aria-hidden="true" />
              <time dateTime={post.date}>{formattedDate}</time>
            </span>
            <span className="flex items-center gap-2">
              <BsClock className="text-[#D5007F]" aria-hidden="true" />
              <span>{post.readingTime}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="container mx-auto px-6 py-16 max-w-4xl">
        <div
          className="prose prose-lg prose-invert max-w-none
            prose-headings:text-white prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-[#D5007F] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white
            prose-ul:text-gray-300 prose-li:mb-2
            prose-code:text-gray-300 prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-800">
            <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-[#1E1E1E] rounded-full text-sm text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author */}
        {post.author && (
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex items-center gap-4">
              {post.author.avatar ? (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#450E93] to-[#D5007F] flex items-center justify-center text-white text-2xl font-bold">
                  {post.author.name.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-sm uppercase tracking-wider text-gray-400 mb-1">Written by</p>
                <p className="text-xl font-bold text-white">{post.author.name}</p>
              </div>
            </div>
          </div>
        )}
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-[#0A0A0A] py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-8">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block focus:outline-none focus:ring-2 focus:ring-[#D5007F] focus:ring-offset-2 focus:ring-offset-[#0A0A0A] rounded-lg"
                >
                  <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
                    <Image
                      src={relatedPost.featuredImage}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <p className="text-xs uppercase tracking-wider text-[#D5007F] font-bold mb-2">
                    {relatedPost.category}
                  </p>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#D5007F] transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">{relatedPost.readingTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
