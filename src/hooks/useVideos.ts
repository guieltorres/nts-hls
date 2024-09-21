import { useEffect, useState } from "react";
import { getVideos } from "../services/videos";
import { actions, useDispatch } from "../state/store";
import { Video, PaginatedResponse } from "../types/videos";

export const useVideos = (initialPage: number = 1, perPage: number = 3) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(initialPage);
  const [videos, setVideos] = useState<Video[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response: PaginatedResponse<Video> = await getVideos(
          page,
          perPage
        );
        dispatch(actions.videos.update([...videos, ...response.data]));
        setVideos((prevVideos) => [...prevVideos, ...response.data]);
        setHasMore(response.next !== null);
        setLoading(false);
      } catch (err: any) {
        console.warn("useVideos", err.message);
        setLoading(false);
      }
    };

    fetchVideos();
  }, [page]);

  const loadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return { loading, loadMore, hasMore };
};
