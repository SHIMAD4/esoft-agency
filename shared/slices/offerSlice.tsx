import { createSlice } from '@reduxjs/toolkit';

const offerSlice = createSlice({
  name: 'offers',
  initialState: {
    offers: [],
    offersWithoutDeals: [],
  },
  reducers: {
    handleSaveOffers(state, { payload }) {
      state.offers = payload.offers;
    },
    handleSaveOffersWithoutDeals(state, { payload }) {
      state.offersWithoutDeals = payload.offersWithoutDeals;
    },
  },
});

export const { handleSaveOffers, handleSaveOffersWithoutDeals } = offerSlice.actions;
export default offerSlice.reducer;
