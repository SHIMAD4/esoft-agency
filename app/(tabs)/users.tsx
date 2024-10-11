import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { SceneMap } from 'react-native-tab-view';
import { useState } from 'react';
import { ClientSlide, Header, CustomTabView } from '@/components';

export default function UsersPage() {
  const ArrowToLeftIcon = require('../../assets/images/icons/arrowIcons/ArrowToLeftIcon.svg');

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Клиент' },
    { key: 'second', title: 'Риэлтор' },
  ]);

  return (
    <>
      <SafeAreaView className="mx-6 mt-6 mb-9">
        <Header title="Пользователи" icon={ArrowToLeftIcon} link="/(tabs)" />
      </SafeAreaView>
      <CustomTabView
        navigationState={{ index, routes }}
        scene={SceneMap({
          first: () => <ClientSlide />,
          second: () => <View style={{ flex: 1 }} />,
        })}
        setFunc={setIndex}
      />
    </>
  );
}
