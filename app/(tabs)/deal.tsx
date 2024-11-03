import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap } from 'react-native-tab-view';
import { useState } from 'react';
import {
  DealSlide,
  DemandSlide,
  OfferSlide,
  Header,
  CustomTabView,
  Icons,
  SearchDealSlide,
} from '@/components';
import { handleClearQuery, handleSaveDeals } from '@/shared/slices/dealsSlice';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { API } from '@/shared/api';
import { handleSaveDemands } from '@/shared/slices/demandSlice';
import { handleSaveOffers } from '@/shared/slices/offerSlice';

export default function DealPage() {
  const dispatch = useAppDispatch();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Сделка' },
    { key: 'second', title: 'Поиск' },
    { key: 'third', title: 'Предложение' },
    { key: 'fourth', title: 'Потребность' },
  ]);

  const goToDealSlide = () => setIndex(0);

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
          first: () => {
            dispatch(handleClearQuery());
            API.dealBlock
              .getAllDeals()
              .then(({ data }) => dispatch(handleSaveDeals({ deals: data })));
            return <DealSlide />;
          },
          second: () => <SearchDealSlide goToDealSlide={goToDealSlide} />,
          third: () => {
            dispatch(handleClearQuery());
            API.offerBlock
              .getAllOffers()
              .then((data) => dispatch(handleSaveOffers({ offers: data })));
            return <OfferSlide />;
          },
          fourth: () => {
            dispatch(handleClearQuery());
            API.demandBlock
              .getAllDemands()
              .then((data) => dispatch(handleSaveDemands({ demands: data })));
            return <DemandSlide />;
          },
        })}
        setFunc={setIndex}
      />
    </>
  );
}
