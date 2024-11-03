import { View } from 'react-native';
import { Input } from '../../Input';
import { Button } from '../../Button';
import { CardList } from '../../CardList';
import { FC, useState } from 'react';
import { router } from 'expo-router';
import { Realtor } from '@/shared/types';
import { API } from '@/shared/api';
import { useAppSelector } from '@/shared/hooks/useAppSelector';

export const RealtorSlide: FC = () => {
  const [searchData, setSearchData] = useState<Realtor[]>([]);
  const { realtors } = useAppSelector((state) => state.realtorSlice);

  const handleAddRealtorClick = () => {
    router.navigate('../realtor/addPage');
  };

  const handleSearch = (value: string) => {
    if (value.length === 0) return;

    API.realtorBlock.searchRealtor(value).then(({ data }) => setSearchData(data));
  };

  return (
    <View className="flex mx-6 h-[500px] pb-[100px]">
      <Input
        variant="search"
        placeholder="Поиск риэлтора"
        onChangeText={handleSearch}
        style={{ marginBottom: 24 }}
      />
      <Button variant="add" onPress={handleAddRealtorClick} style={{ marginBottom: 16 }} />
      <CardList data={searchData.length === 0 ? realtors : searchData} />
    </View>
  );
};
