import { createSlice } from '@reduxjs/toolkit';

const demandSlice = createSlice({
  name: 'demands',
  initialState: {
    demands: [],
    demandsWithoutDeals: [],
  },
  reducers: {
    handleSaveDemands(state, { payload }) {
      state.demands = payload.demands;
    },
    handleSaveDemandsWithoutDeals(state, { payload }) {
      state.demandsWithoutDeals = payload.demandsWithoutDeals;
    },
  },
});

export const { handleSaveDemands, handleSaveDemandsWithoutDeals } = demandSlice.actions;
export default demandSlice.reducer;
