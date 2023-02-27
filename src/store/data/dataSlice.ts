import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Video from "../../models/video";
import { searchApi } from "../../services/search";
import { testData } from "../../utils/dummyData";

type DataState = {
  videos: Video[];
  loading: boolean;
  query: string;
  searchPaginateData: Video[][];
  searchPaginateLoading: boolean;
};

const initialState: DataState = {
  videos: testData,
  loading: false,
  query: "",
  searchPaginateData: [],
  searchPaginateLoading: false,
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
    setSearchPaginateData: (state, action: PayloadAction<Video[]>) => {
      state.searchPaginateData = [...state.searchPaginateData, action.payload];
      state.searchPaginateLoading = false;
    },
  },
});

export const {
  setVideos,
  setLoading,
  setSearchPaginateLoading,
  setSearchPaginateData,
} = dataSlice.actions;

export default dataSlice.reducer;
