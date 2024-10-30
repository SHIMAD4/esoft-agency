import { View } from 'react-native';
import { Button } from '../../Button';
import { CardList } from '../../CardList';
import { FC } from 'react';
import { router } from 'expo-router';
import { useAppSelector } from '@/shared/hooks/useAppSelector';

export const DemandSlide: FC = () => {
  const { demands } = useAppSelector((state) => state.demandSlice);

  const handleAddClientClick = () => {
    router.navigate('../deal/demand/addPage');
  };

  return (
    <View className="flex mx-6 h-[590px] pb-[100px]">
      <Button
        variant="add"
        onPress={handleAddClientClick}
        style={{ marginTop: 24, marginBottom: 16 }}
      />
      <CardList data={demands} />
    </View>
  );
};
