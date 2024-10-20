import { configureStore } from '@reduxjs/toolkit';
import ClientReducer from '@/shared/slices/clientSlice';
import RealtorReducer from '@/shared/slices/realtorSlice';

const store = configureStore({
  reducer: {
    clientSlice: ClientReducer,
    realtorSlice: RealtorReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
