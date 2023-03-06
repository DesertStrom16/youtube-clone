import { configureStore } from "@reduxjs/toolkit";
import { searchApi } from "../services/search";
import dataSlice from "../store/data/dataSlice";
import { homeApi } from "../services/home";
import { watchApi } from "../services/watch";

export const store = configureStore({
  reducer: {
    data: dataSlice,
    [searchApi.reducerPath]: searchApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [watchApi.reducerPath]: watchApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(searchApi.middleware).concat(homeApi.middleware).concat(watchApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
