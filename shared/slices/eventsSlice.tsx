import { createSlice } from '@reduxjs/toolkit';
import { GroupedEvents } from '@/shared/types/Api';
import { EventType } from '@/shared/types';

type EventsState = {
  groupedEvents: GroupedEvents;
  upcomingEvents: EventType[];
};

const initialState: EventsState = {
  groupedEvents: {},
  upcomingEvents: [],
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    handleSaveEvents(state, { payload }) {
      state.groupedEvents = payload.groupedEvents;
    },
    handleSaveUpcomingEvents(state, { payload }) {
      state.upcomingEvents = payload.upcomingEvents;
    },
  },
});

export const { handleSaveEvents, handleSaveUpcomingEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
