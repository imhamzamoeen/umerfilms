// src/app/blog/page.tsx

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BsClock } from 'react-icons/bs';
import { getAllBlogPosts } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Blog | UmerFilms',
  description: 'Insights, tips, and behind-the-scenes content from UmerFilms. Learn about cinematography, video production, and the creative process.',
  openGraph: {
    title: 'Blog | UmerFilms',
    description: 'Insights, tips, and behind-the-scenes content from UmerFilms.',
    type: 'website',
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <main className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <p className="text-sm uppercase tracking-widest text-[#D5007F] font-bold mb-4">
            Blog
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl">
            Insights & Stories
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl">
            Behind-the-scenes looks, industry insights, and practical tips from the world of video production.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="pb-16">
          <div className="container mx-auto px-6">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block focus:outline-none focus:ring-2 focus:ring-[#D5007F] focus:ring-offset-4 focus:ring-offset-black rounded-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-[#1E1E1E] rounded-2xl overflow-hidden">
                <div className="relative aspect-video lg:aspect-auto lg:min-h-[400px]">
                  <Image
                    src={featuredPost.featuredImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <p className="text-sm uppercase tracking-widest text-[#D5007F] font-bold mb-4">
                    Featured • {featuredPost.category}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-white group-hover:text-[#D5007F] transition-colors mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-300 mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span className="flex items-center gap-2">
                      <BsClock aria-hidden="true" />
                      {featuredPost.readingTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Other Posts Grid */}
      {otherPosts.length > 0 && (
        <section className="py-16 bg-[#0A0A0A]">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-12">Latest Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block bg-[#1E1E1E] rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#D5007F] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-wider text-[#D5007F] font-bold mb-3">
                      {post.category}
                    </p>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#D5007F] transition-colors mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <BsClock className="text-xs" aria-hidden="true" />
                        {post.readingTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
