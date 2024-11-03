import { createSlice } from '@reduxjs/toolkit';

const dealsSlice = createSlice({
  name: 'deals',
  initialState: {
    deals: [],
  },
  reducers: {
    handleSaveDeals(state, { payload }) {
      state.deals = payload.deals;
    },
  },
});

export const { handleSaveDeals } = dealsSlice.actions;
export default dealsSlice.reducer;
