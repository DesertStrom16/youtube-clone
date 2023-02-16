import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Video from "../../models/video";
import { searchApi } from "../../services/search";
import { testData } from "../../utils/dummyData";

type DataState = {
  videos: Video[];
  loading: boolean;
  query: string;
};

const initialState: DataState = {
  videos: testData,
  loading: false,
  query: '',
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setVideos: (state, action: PayloadAction<Video[]>) => {
      state.videos = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(searchApi.endpoints.getSearch.matchFulfilled, (state, action) => {
        state.query = action.meta.arg.originalArgs
      })
  },
});

export const { setVideos, setLoading } = dataSlice.actions;

export default dataSlice.reducer;
