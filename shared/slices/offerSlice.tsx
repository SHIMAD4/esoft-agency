import { createSlice } from '@reduxjs/toolkit';

const offerSlice = createSlice({
  name: 'offers',
  initialState: {
    offers: [],
  },
  reducers: {
    handleSaveOffers(state, { payload }) {
      state.offers = payload.offers;
    },
  },
});

export const { handleSaveOffers } = offerSlice.actions;
export default offerSlice.reducer;
