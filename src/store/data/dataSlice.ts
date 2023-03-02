import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Video } from "../../types/video";
// import { searchApi } from "../../services/search";
import { testData } from "../../utils/dummyData";

type DataState = {
  videos: Video[];
  loading: boolean;
  searchPaginateLoading: boolean;
  searchPaginateError: boolean;
};

const initialState: DataState = {
  videos: testData,
  loading: false,
  searchPaginateLoading: false,
  searchPaginateError: false,
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
    setSearchPaginateLoading: (state, action: PayloadAction<boolean>) => {
      state.searchPaginateLoading = action.payload;
    },
    setSearchPaginateError: (state, action: PayloadAction<boolean>) => {
      state.searchPaginateError = action.payload;
    },
  },
});

export const { setVideos, setLoading, setSearchPaginateLoading, setSearchPaginateError } =
  dataSlice.actions;

export default dataSlice.reducer;
