import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import Controller from '../../models/controller';

type DataState = {
  controllers: Controller[];
  loading: boolean;
};

const testData: Controller = {
  marketUrl: 'http://url.com/',
  currentStatus: 'running',
  intendedStatus: 'none',
  name: 'P250 Valence',
  tolerance: 0.000123,
  uid: '123456789',
};

const initialState: DataState = {
  controllers: [testData],
  loading: false,
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setControllers: (state, action: PayloadAction<Controller[]>) => {
      state.controllers = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {setControllers, setLoading} = dataSlice.actions;

export default dataSlice.reducer;
