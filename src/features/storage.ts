import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  subscriptions: string[];
};

const initialState: initialStateType = { subscriptions: [] };

const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    initialChannelSubs(state, action: PayloadAction<string[]>) {
      state.subscriptions = action.payload;
    },
    addNewSub(state, action: PayloadAction<string>) {
      state.subscriptions = [...state.subscriptions, action.payload];
    },
    removeSub(state, action: PayloadAction<string>) {
      state.subscriptions = state.subscriptions.filter(
        (item) => item !== action.payload
      );
    },
  },
});

export const { initialChannelSubs, addNewSub, removeSub } = storageSlice.actions;
export default storageSlice.reducer;
