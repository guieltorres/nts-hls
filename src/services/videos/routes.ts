import { netShowApi } from "../../constants/netShowApi";
import { PaginatedResponse, Video } from "../../types/videos";

export const videos = async (
  page: number = 1,
  perPage: number = 3
): Promise<PaginatedResponse<Video>> => {
  const response = await netShowApi().get(`/videos`, {
    params: {
      _page: page,
      _per_page: perPage,
    },
  });
  return response.data;
};

export const videoById = async (id: string): Promise<{ data: Video }> => {
  return netShowApi().get(`/videos/${id}`);
};

export const patchVideoById = async (
  id: string,
  data: Partial<Video>
): Promise<{ data: Video }> => {
  return netShowApi().patch(`/videos/${id}`, data);
};
