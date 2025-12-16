// types/project.ts

export type Category =
  | 'Commercial'
  | 'Music Video'
  | 'Wedding'
  | 'Short Film'
  | 'Personal';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: Category;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  featured: boolean;
  order: number;
  // Optional fields for future expansion
  client?: string;
  date?: string;
  tags?: string[];
  role?: string;
  gallery?: string[];
}
