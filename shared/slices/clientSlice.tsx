import { createSlice } from '@reduxjs/toolkit';

const clientSlice = createSlice({
  name: 'clients',
  initialState: {
    clients: [],
  },
  reducers: {
    handleSaveClients(state, { payload }) {
      state.clients = payload.clients;
    },
  },
});

export const { handleSaveClients } = clientSlice.actions;
export default clientSlice.reducer;
