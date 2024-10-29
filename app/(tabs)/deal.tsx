import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap } from 'react-native-tab-view';
import { useState } from 'react';
import { DemandSlide, OfferSlide, Header, CustomTabView, Icons } from '@/components';

export default function DealPage() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Предложение' },
    { key: 'second', title: 'Потребность' },
  ]);

  return (
    <>
      <SafeAreaView className="mx-6 mt-6 mb-9">
        <Header
          title="Сделки"
          icon={<Icons.ArrowIcon rotateToLeft={true} size={16} />}
          link="/(tabs)"
        />
      </SafeAreaView>
      <CustomTabView
        navigationState={{ index, routes }}
        scene={SceneMap({
          first: () => <OfferSlide />,
          second: () => <DemandSlide />,
        })}
        setFunc={setIndex}
      />
    </>
  );
}
