export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  profileUrl?: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

export interface Article {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content?: string;
  author: Author;
  tags: BlogTag[];
  readTime: number; // in minutes
  slug?: string;
  url?: string;
  coverImage?: string;
}

export interface Resource {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  link?: string;
  featured?: boolean;
}

export interface BlogFilters {
  selectedTags: string[];
  searchQuery: string;
}
