import { configureStore } from '@reduxjs/toolkit';
import ClientReducer from '@/shared/slices/clientSlice';
import RealtorReducer from '@/shared/slices/realtorSlice';
import EstatesReducer from '@/shared/slices/estatesSlice';
import DealsReducer from '@/shared/slices/dealsSlice';
import OfferReducer from '@/shared/slices/offerSlice';
import DemandReducer from '@/shared/slices/demandSlice';
import EventsReducer from '@/shared/slices/eventsSlice';

const store = configureStore({
  reducer: {
    clientSlice: ClientReducer,
    realtorSlice: RealtorReducer,
    estateSlice: EstatesReducer,
    dealsSlice: DealsReducer,
    offerSlice: OfferReducer,
    demandSlice: DemandReducer,
    eventsSlice: EventsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
