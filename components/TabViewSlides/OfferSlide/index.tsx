import { View } from 'react-native';
import { Button } from '../../Button';
import { CardList } from '../../CardList';
import { FC } from 'react';
import { router } from 'expo-router';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Offer } from '@/shared/types';

type OfferSlideProps = {
  data?: Offer[];
};

export const OfferSlide: FC<OfferSlideProps> = ({ data }) => {
  const { offers } = useAppSelector((state) => state.offerSlice);

  const handleAddClientClick = () => {
    router.navigate('../deal/offer/addPage');
  };

  return (
    <View className="flex mx-6 h-[595px] pb-[100px]">
      <Button
        variant="add"
        onPress={handleAddClientClick}
        style={{ marginTop: 24, marginBottom: 16 }}
      />
      <CardList data={data && data.length !== 0 ? data : offers} />
    </View>
  );
};
