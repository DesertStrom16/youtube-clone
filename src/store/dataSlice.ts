import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StringOrNull = string | null;

type DataState = {
  activeVideoId: StringOrNull;
  openPosition?: number | undefined;
};

const initialState: DataState = {
  activeVideoId: null,
  openPosition: undefined,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setActiveVideo: (
      state,
      action: PayloadAction<{
        activeVideoId: DataState["activeVideoId"];
        openPosition: DataState["openPosition"];
      }>
    ) => {
      state.activeVideoId = action.payload.activeVideoId;
      state.openPosition = action.payload.openPosition || undefined;
    },
  },
});

export const { setActiveVideo } = dataSlice.actions;

export default dataSlice.reducer;
