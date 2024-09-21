import { Action, combineReducers } from "@reduxjs/toolkit";
import { VideoSlice } from "../types/videos";

import * as videos from "./videos/slice";

export type State = {
  videos: VideoSlice;
};

export const combinedReducers = combineReducers({
  videos: videos.reducer,
});

export const reducer = (state: any, action: Action) => {
  return combinedReducers(state, action);
};

export const actions = Object.freeze({
  videos: videos.actions,
});
