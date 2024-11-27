import { SafeAreaView } from 'react-native-safe-area-context';
import { EventsSlide, Header, Icons } from '@/components';
import { useEffect } from 'react';
import { API } from '@/shared/api';
import { handleSaveUpcomingEvents } from '@/shared/slices/eventsSlice';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';

export default function EventsPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Events
    API.eventBlock
      .getAllUpcomingEvents()
      .then(({ data }) => dispatch(handleSaveUpcomingEvents({ upcomingEvents: data })));
  }, []);

  return (
    <>
      <SafeAreaView className="mx-6 mt-6 mb-9">
        <Header
          title="События"
          icon={<Icons.ArrowIcon rotateToLeft={true} size={16} />}
          link="/(tabs)"
        />
      </SafeAreaView>
      <EventsSlide />
    </>
  );
}
