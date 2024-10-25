import { configureStore } from '@reduxjs/toolkit';
import ClientReducer from '@/shared/slices/clientSlice';
import RealtorReducer from '@/shared/slices/realtorSlice';
import EstatesReducer from '@/shared/slices/estatesSlice';

const store = configureStore({
  reducer: {
    clientSlice: ClientReducer,
    realtorSlice: RealtorReducer,
    estateSlice: EstatesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
