import { SafeAreaView } from 'react-native-safe-area-context';
import { EventsSlide, Header, Icons } from '@/components';

export default function EventsPage() {
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
