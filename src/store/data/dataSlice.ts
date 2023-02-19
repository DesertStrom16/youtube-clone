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
  searchPaginatePrepare: boolean;
};

const initialState: DataState = {
  videos: testData,
  loading: false,
  query: "",
  searchPaginateData: [],
  searchPaginateLoading: false,
  searchPaginatePrepare: false,
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
    setPrepareSearchPaginate: (state, action: PayloadAction<boolean>) => {
      state.searchPaginatePrepare = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      searchApi.endpoints.getSearch.matchFulfilled,
      (state, action) => {
        state.query = action.meta.arg.originalArgs;
        state.searchPaginateData = [];
        state.searchPaginatePrepare = false;
      }
    );
  },
});

export const {
  setVideos,
  setLoading,
  setSearchPaginateLoading,
  setSearchPaginateData,
  setPrepareSearchPaginate,
} = dataSlice.actions;

export default dataSlice.reducer;
