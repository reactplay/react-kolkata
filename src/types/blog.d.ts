export interface Author {
  name: string;
  profilePicture: string;
  bio?: {
    text: string;
  };
  profileUrl?: string;
}

export interface BlogTag {
  id: string;
  name: string;
}

export interface BlogFilters {
  selectedTags: string[];
  searchQuery: string;
}

export interface Blog {
  id: string;
  title: string;
  brief: string;
  url: string;
  publishedAt: string;
  readTimeInMinutes: number;
  author: Author;
  tags: BlogTag[];
  coverImage?: { url: string };
}

interface APIResponse<T> {
  isLoading: boolean;
  data: T[];
  error: string | null;
}

// Type for Hashnode API response starts
export interface HashnodePostEdge {
  node: Blog;
}

export interface HashnodePosts {
  edges: HashnodePostEdge[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
  };
}

export interface HashnodePublication {
  posts: HashnodePosts;
}

export interface HashnodeAPIResponse {
  data: {
    publication: HashnodePublication;
  };
}

export interface BlogFetchResponse {
  posts: Blog[];
  endCursor: string | null;
  error: string | null;
}

export interface BlogSectionProps {
  initialBlogs: Blog[];
  initialEndCursor: string | null;
  error: string | null;
}
// Type for Hashnode API response ends

export type BlogResponse = APIResponse<Blog>;
export type { BlogSectionProps };
