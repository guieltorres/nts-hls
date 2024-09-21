export type Video = {
  id: string;
  title: string;
  created_at: string;
  category: number;
  hls_path: string;
  description: string | null;
  thumbnail: string;
  site_id: number;
  views: number;
  likes: number;
};

export type VideoSlice = {
  data: Video[];
  likedVideos: { [key: string]: boolean };
  watchedVideos: { [key: string]: number };
};

export type PaginatedResponse<T> = {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: T[];
};
