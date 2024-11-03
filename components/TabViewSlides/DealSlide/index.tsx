import { View } from 'react-native';
import { Button } from '../../Button';
import { CardList } from '../../CardList';
import { FC } from 'react';
import { router } from 'expo-router';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Deal } from '@/shared/types';

type DealSlideProps = {
  data?: Deal[];
};

export const DealSlide: FC<DealSlideProps> = ({ data }) => {
  const { deals } = useAppSelector((state) => state.dealsSlice);

  const handleAddDealClick = () => {
    router.navigate('../deal/addPage');
  };

  return (
    <View className="flex mx-6 h-[590px] pb-[100px]">
      <Button
        variant="add"
        onPress={handleAddDealClick}
        style={{ marginTop: 24, marginBottom: 16 }}
      />
      <CardList data={data && data.length !== 0 ? data : deals} />
    </View>
  );
};
