import { View, Text } from 'react-native';
import { Button } from '../../Button';
import { CardList } from '../../CardList';
import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import clsx from 'clsx';
import { EntityType } from '@/scripts/constants';
import { handleClearQuery, handleSaveDeals } from '@/shared/slices/dealsSlice';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { API } from '@/shared/api';
import { handleSaveDemands } from '@/shared/slices/demandSlice';
import { handleSaveOffers } from '@/shared/slices/offerSlice';

const FilterButton: FC<{
  text: string;
  isActive: boolean;
  onPress: () => void;
}> = ({ text, isActive, onPress }) => (
  <Button
    variant="default"
    text={text}
    buttonClassNames={clsx(
      'border-[1px] border-[#FF9100] rounded-[3px]',
      isActive ? 'bg-[#FF9100]' : 'bg-transparent',
    )}
    textClassNames={clsx(
      'text-center text-[16px] px-[30.5px] py-[8px]',
      isActive ? 'text-[#FFFFFF]' : 'text-[#FF9100]',
    )}
    onPress={onPress}
    style={{ marginVertical: 16 }}
  />
);

export const SearchDealSlide: FC<{ goToDealSlide: () => void }> = ({ goToDealSlide }) => {
  const dispatch = useAppDispatch();
  const { offerId, demandId } = useAppSelector((state) => state.dealsSlice);
  const [isOfferSelected, setIsOfferSelected] = useState(false);
  const [isDemandSelected, setIsDemandSelected] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showCreateButtonText, setShowCreateButtonText] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedData, setSelectedData] = useState([]);

  const handleFilterSelection = (filterType: EntityType) => {
    setIsOfferSelected(filterType === EntityType.OFFER);
    setIsDemandSelected(filterType === EntityType.DEMAND);
    setShowNextButton(true);
    setShowBackButton(true);

    if (filterType === EntityType.OFFER) {
      API.offerBlock.getAllOffersWithoutDeals().then(({ data }) => {
        dispatch(handleSaveOffers({ offers: data }));
        setSelectedData(data);
      });
    }

    if (filterType === EntityType.DEMAND) {
      API.demandBlock.getAllDemandsWithoutDeals().then(({ data }) => {
        dispatch(handleSaveDemands({ demands: data }));
        setSelectedData(data);
      });
    }
  };

  const handleNext = () => {
    setShowNextButton(false);
    setSelectedFilter(isOfferSelected ? EntityType.OFFER : EntityType.DEMAND);

    if (offerId && demandId) {
      handleCreateDeal();
    } else {
      if (demandId) {
        API.offerBlock.getOffersByDemandId(demandId).then(({ data }) => {
          dispatch(handleSaveOffers({ offers: data }));
          setSelectedData(data);
        });
      }

      if (offerId) {
        API.demandBlock.getDemandsByOfferId(offerId).then(({ data }) => {
          dispatch(handleSaveDemands({ demands: data }));
          setSelectedData(data);
        });
      }
    }
  };

  const handleCancel = () => {
    setShowBackButton(false);
    setShowNextButton(false);
    setIsOfferSelected(false);
    setIsDemandSelected(false);
    setShowCreateButtonText(false);
    setSelectedFilter('');

    dispatch(handleClearQuery());

    API.offerBlock.getAllOffers().then((data) => dispatch(handleSaveOffers({ offers: data })));
    API.demandBlock.getAllDemands().then((data) => dispatch(handleSaveDemands({ demands: data })));
  };

  const handleCreateDeal = () => {
    setShowNextButton(false);
    setShowCreateButtonText(true);

    const data = {
      demandId,
      offerId,
    };

    setTimeout(() => {
      API.dealBlock.addDeal(data).then((data) => console.log(data));
    }, 50);

    setTimeout(() => {
      handleCancel();
      goToDealSlide();

      API.dealBlock.getAllDeals().then(({ data }) => dispatch(handleSaveDeals({ deals: data })));
    }, 150);
  };

  const renderFilterPrompt = () => {
    if (selectedFilter === EntityType.OFFER) {
      return 'Выберите подходящее предложение \n для поиска потребности';
    }

    if (selectedFilter === EntityType.DEMAND) {
      return 'Выберите подходящую потребность \n для поиска предложений';
    }

    if (showCreateButtonText) {
      return 'Подходящие потребности';
    }

    return 'Выберите по какому параметру \n проводить поиск';
  };

  useEffect(() => {
    if (offerId.length !== 0 && demandId.length !== 0) {
      setShowNextButton(true);
      setShowCreateButtonText(true);
    }

    if (offerId && !demandId) {
      setShowNextButton(true);
    }

    if (!offerId && demandId) {
      setShowNextButton(true);
    }
  }, [offerId, demandId]);

  return (
    <View className="flex mx-6 h-[590px] pb-[100px]">
      <Text className="text-[16px] text-center font-bold mt-9 mb-4">{renderFilterPrompt()}</Text>

      {!selectedFilter && (
        <View className="flex flex-row justify-between">
          <FilterButton
            text="Потребность"
            isActive={isDemandSelected}
            onPress={() => {
              handleFilterSelection(EntityType.DEMAND);
            }}
          />
          <FilterButton
            text="Предложение"
            isActive={isOfferSelected}
            onPress={() => {
              handleFilterSelection(EntityType.OFFER);
            }}
          />
        </View>
      )}

      <View className={clsx(selectedFilter && 'h-full pb-[120px]')}>
        {selectedFilter ? (
          <CardList data={selectedData} clickableCards={true} swipable={false} />
        ) : null}
      </View>

      <View className={clsx(selectedFilter && 'w-full mt-[-130px]')}>
        {showNextButton ? (
          <Button
            variant="default"
            text={!showCreateButtonText ? 'Далее' : 'Создать'}
            buttonClassNames="bg-[#0091EA] rounded-[3px]"
            textClassNames="text-center text-[#FFFFFF] text-[16px] py-[8.5px]"
            onPress={handleNext}
            style={{ marginTop: 24 }}
          />
        ) : (
          <Button
            variant="default"
            text="placeholder"
            buttonClassNames="bg-[transparent]"
            textClassNames="text-center text-[transparent] text-[16px] py-[8.5px]"
            onPress={handleNext}
            style={{ marginTop: 24 }}
          />
        )}
        {showBackButton ? (
          <Button
            variant="default"
            text="Назад"
            buttonClassNames="border-[1px] border-[#0091EA] rounded-[3px]"
            textClassNames="text-center text-[#0091EA] text-[16px] py-[8.5px]"
            onPress={handleCancel}
            style={{ marginTop: selectedFilter ? 12 : showNextButton ? 12 : 0 }}
          />
        ) : null}
      </View>
    </View>
  );
};
