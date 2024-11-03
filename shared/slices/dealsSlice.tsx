import { createSlice } from '@reduxjs/toolkit';

const dealsSlice = createSlice({
  name: 'deals',
  initialState: {
    deals: [],
    searchUrl: '',
    offerId: '',
    demandId: '',
  },
  reducers: {
    handleSaveDeals(state, { payload }) {
      state.deals = payload.deals;
    },
    handleSaveQuery(state, { payload }) {
      if (!state.searchUrl.includes('?offerId') && payload.searchUrl.includes('?offerId')) {
        state.offerId = payload.searchUrl.split('=')[1];
      }

      if (!state.searchUrl.includes('?demandId') && payload.searchUrl.includes('?demandId')) {
        state.demandId = payload.searchUrl.split('=')[1];
      }
    },
    handleClearQuery(state) {
      state.searchUrl = '';
      state.offerId = '';
      state.demandId = '';
    },
  },
});

export const { handleSaveDeals, handleSaveQuery, handleClearQuery } = dealsSlice.actions;
export default dealsSlice.reducer;
