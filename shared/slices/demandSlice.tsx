import { createSlice } from '@reduxjs/toolkit';

const demandSlice = createSlice({
  name: 'demands',
  initialState: {
    demands: [],
  },
  reducers: {
    handleSaveDemands(state, { payload }) {
      state.demands = payload.demands;
    },
  },
});

export const { handleSaveDemands } = demandSlice.actions;
export default demandSlice.reducer;
