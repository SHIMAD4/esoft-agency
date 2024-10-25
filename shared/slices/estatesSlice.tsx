import { createSlice } from '@reduxjs/toolkit';

const estateSlice = createSlice({
  name: 'estates',
  initialState: {
    estates: [],
  },
  reducers: {
    handleSaveEstates(state, { payload }) {
      state.estates = payload.estates;
    },
  },
});

export const { handleSaveEstates } = estateSlice.actions;
export default estateSlice.reducer;
