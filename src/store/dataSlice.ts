import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DataState = {
  activeVideoId: string | undefined;
  openPosition?: number | undefined;
  isRedirect?: boolean | undefined;
};

const initialState: DataState = {
  activeVideoId: undefined,
  openPosition: undefined,
  isRedirect: false,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setActiveVideo: (
      state,
      action: PayloadAction<{
        activeVideoId: DataState["activeVideoId"];
        openPosition?: DataState["openPosition"];
        isRedirect?: DataState["isRedirect"];
      }>
    ) => {
      state.activeVideoId = action.payload.activeVideoId;
      state.openPosition = action.payload.openPosition || undefined;
      state.isRedirect = action.payload.isRedirect || undefined;
    },
  },
});

export const { setActiveVideo } = dataSlice.actions;

export default dataSlice.reducer;
