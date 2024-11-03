import { View } from 'react-native';
import { Button } from '../../Button';
import { CardList } from '../../CardList';
import { FC } from 'react';
import { router } from 'expo-router';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Demand } from '@/shared/types';

type DemandSlideProps = {
  data?: Demand[];
};

export const DemandSlide: FC<DemandSlideProps> = ({ data }) => {
  const { demands } = useAppSelector((state) => state.demandSlice);

  const handleAddDemandClick = () => {
    router.navigate('../deal/demand/addPage');
  };

  return (
    <View className="flex mx-6 h-[590px] pb-[100px]">
      <Button
        variant="add"
        onPress={handleAddDemandClick}
        style={{ marginTop: 24, marginBottom: 16 }}
      />
      <CardList data={data && data.length !== 0 ? data : demands} />
    </View>
  );
};
