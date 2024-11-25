import { ClientSlide, CustomTabView, Header, Icons, RealtorSlide } from '@/components';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap } from 'react-native-tab-view';

export default function UsersPage() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Клиент' },
    { key: 'second', title: 'Риэлтор' },
  ]);

  return (
    <>
      <SafeAreaView className="mx-6 mt-6 mb-9">
        <Header
          title="Пользователи"
          icon={<Icons.ArrowIcon rotateToLeft={true} size={16} />}
          link="/(tabs)"
        />
      </SafeAreaView>
      <CustomTabView
        navigationState={{ index, routes }}
        scene={SceneMap({
          first: () => <ClientSlide />,
          second: () => <RealtorSlide />,
        })}
        setFunc={setIndex}
      />
    </>
  );
}
