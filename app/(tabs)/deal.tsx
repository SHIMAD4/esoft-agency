import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap } from 'react-native-tab-view';
import { useState } from 'react';
import { DealSlide, DemandSlide, OfferSlide, Header, CustomTabView, Icons } from '@/components';

export default function DealPage() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Сделка' },
    { key: 'second', title: 'Предложение' },
    { key: 'third', title: 'Потребность' },
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
          first: () => <DealSlide />,
          second: () => <OfferSlide />,
          third: () => <DemandSlide />,
        })}
        setFunc={setIndex}
      />
    </>
  );
}
