import { PaginatedResponse, Video } from "../../types/videos";
import { patchVideoById, videoById, videos } from "./routes";

export const getVideos = async (
  page: number = 1,
  perPage: number = 5
): Promise<PaginatedResponse<Video>> => {
  try {
    const response = await videos(page, perPage);
    return response;
  } catch (err) {
    console.warn("getVideos", err);
    throw err;
  }
};

export const getVideoById = async (id: string) => {
  try {
    const { data } = await videoById(id);
    return data;
  } catch (err) {
    console.warn("getVideoById", err);
    throw err;
  }
};

export const updateVideoById = async (id: string, data: Partial<Video>) => {
  try {
    const { data: updatedVideo } = await patchVideoById(id, data);
    return updatedVideo;
  } catch (err) {
    console.warn("updateVideoById", err);
    throw err;
  }
};
