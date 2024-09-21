import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  useStore as useReduxStore,
} from "react-redux";

import * as app from "./";

export const store = configureStore({
  reducer: app.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const actions = app.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const useDispatch = () => useReduxDispatch<AppDispatch>();

export const useStore: () => typeof store = useReduxStore;

export type StoreType = typeof store;

export type StoreParams = {
  store?: StoreType;
  actions?: typeof app.actions;
};

export default store;
