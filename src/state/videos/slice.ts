import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Video, VideoSlice } from "../../types/videos";

export const initialState: VideoSlice = {
  data: [],
  likedVideos: {},
  watchedVideos: {},
};

// Helper function to update video data
const updateVideoData = (
  data: Video[],
  videoId: string,
  updateFn: (video: Video) => Video
): Video[] => {
  return data.map((video) => (video.id === videoId ? updateFn(video) : video));
};

const slice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    update(state, action: PayloadAction<Video[]>) {
      state.data = action.payload;
    },
    // não funciona apropriadamente pois o video não possui uma flag de like por usuário
    toggleLikeVideo(state, action: PayloadAction<string>) {
      const videoId = action.payload;
      const isLiked = !state.likedVideos[videoId];
      state.likedVideos[videoId] = isLiked;

      state.data = updateVideoData(state.data, videoId, (video) => {
        const currentLikes = video.likes || 0;
        const newLikes = isLiked
          ? currentLikes + 1
          : Math.max(currentLikes - 1, 0);
        return {
          ...video,
          likes: newLikes,
        };
      });
    },
    incrementViewVideo(state, action: PayloadAction<string>) {
      const videoId = action.payload;
      state.watchedVideos[videoId] = (state.watchedVideos[videoId] || 0) + 1;

      state.data = updateVideoData(state.data, videoId, (video) => ({
        ...video,
        views: (video.views || 0) + 1,
      }));
    },
  },
});

export const actions = slice.actions;

export const reducer = slice.reducer;
