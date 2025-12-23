import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/data/blog';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <article className="blog-card group">
      {/* Featured Image with Category Badge */}
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Category Badge - Top Right */}
          <span className="absolute right-3 top-3 rounded bg-[#8B5CF6] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {post.category}
          </span>
        </div>
      </Link>

      {/* Card Content */}
      <div className="pt-4">
        {/* Meta: Author & Date */}
        <p className="mb-2 text-xs uppercase tracking-wide text-gray-500">
          By {post.author?.name || 'Admin'} &bull; {formattedDate}
        </p>

        {/* Title */}
        <h3 className="text-lg font-semibold leading-snug text-white transition-colors group-hover:text-[#8B5CF6]">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
      </div>
    </article>
  );
}
