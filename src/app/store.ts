import { configureStore } from "@reduxjs/toolkit";
import { searchApi } from "../services/search";
import { homeApi } from "../services/home";
import { watchApi } from "../services/watch";
import { channelApi } from "../services/channel";
import storage from "../features/storage";

export const store = configureStore({
  reducer: {
    [searchApi.reducerPath]: searchApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [watchApi.reducerPath]: watchApi.reducer,
    [channelApi.reducerPath]: channelApi.reducer,
    storage: storage
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(searchApi.middleware).concat(homeApi.middleware).concat(watchApi.middleware).concat(channelApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
