import { Video } from "../../types/videos";

export const createMockVideo = (overrides: Partial<Video> = {}): Video => {
  const defaultVideo: Video = {
    id: "1",
    title: "Test Video",
    created_at: "2023-10-01T00:00:00Z",
    category: 1,
    hls_path: "path/to/hls",
    description: "This is a test video",
    thumbnail: "path/to/thumbnail",
    site_id: 1,
    views: 100,
    likes: 10,
  };

  return { ...defaultVideo, ...overrides };
};
