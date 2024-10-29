import { configureStore } from '@reduxjs/toolkit';
import ClientReducer from '@/shared/slices/clientSlice';
import RealtorReducer from '@/shared/slices/realtorSlice';
import EstatesReducer from '@/shared/slices/estatesSlice';
import OfferReducer from '@/shared/slices/offerSlice';
import DemandReducer from '@/shared/slices/demandSlice';

const store = configureStore({
  reducer: {
    clientSlice: ClientReducer,
    realtorSlice: RealtorReducer,
    estateSlice: EstatesReducer,
    offerSlice: OfferReducer,
    demandSlice: DemandReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
