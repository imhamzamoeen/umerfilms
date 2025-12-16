// types/blog.ts

export type BlogCategory =
  | 'Behind the Scenes'
  | 'Tips & Tutorials'
  | 'Gear Reviews'
  | 'Industry Insights'
  | 'Personal';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: BlogCategory;
  date: string;
  readingTime: string;
  author?: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
}
