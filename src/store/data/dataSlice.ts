import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Video from "../../models/video";
import { testData } from "../../utils/dummyData";

type DataState = {
  videos: Video[];
  loading: boolean;
};

const initialState: DataState = {
  videos: testData,
  loading: false,
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
});

export const { setVideos, setLoading } = dataSlice.actions;

export default dataSlice.reducer;
