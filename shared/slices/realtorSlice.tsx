import { createSlice } from '@reduxjs/toolkit';

const realtorSlice = createSlice({
  name: 'realtors',
  initialState: {
    realtors: [],
  },
  reducers: {
    handleSaveRealtors(state, { payload }) {
      state.realtors = payload.realtors;
    },
  },
});

export const { handleSaveRealtors } = realtorSlice.actions;
export default realtorSlice.reducer;
