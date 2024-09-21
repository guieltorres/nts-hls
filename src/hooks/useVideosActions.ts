import { updateVideoById } from "../services/videos";
import { actions, useDispatch, useSelector } from "../state/store";
import { Video } from "../types/videos";

export const useVideoActions = () => {
  const dispatch = useDispatch();
  const { likedVideos } = useSelector((state) => state.videos);

  const likeVideo = async (video: Video) => {
    try {
      const isLiked = !likedVideos[video.id];
      const updatedVideo = await updateVideoById(video.id, {
        likes: isLiked ? video.likes + 1 : Math.max(video.likes - 1, 0),
      });
      dispatch(actions.videos.toggleLikeVideo(video.id));
    } catch (err: any) {
      console.warn("likeVideo", err.message);
    }
  };

  const viewVideo = async (video: Video) => {
    try {
      const updatedVideo = await updateVideoById(video.id, {
        views: video.views + 1,
      });
      dispatch(actions.videos.incrementViewVideo(video.id));
    } catch (err: any) {
      console.warn("viewVideo", err.message);
    }
  };

  return { likeVideo, viewVideo, likedVideos };
};
