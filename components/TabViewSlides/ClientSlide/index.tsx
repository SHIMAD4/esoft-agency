import { View } from 'react-native';
import { Input } from '../../Input';
import { Button } from '../../Button';
import { CardList } from '../../CardList';
import { FC, useState } from 'react';
import { router } from 'expo-router';
import { Client } from '@/shared/types';
import { API } from '@/shared/api';
import { useAppSelector } from '@/shared/hooks/useAppSelector';

export const ClientSlide: FC = () => {
  const [searchData, setSearchData] = useState<Client[]>([]);
  const { clients } = useAppSelector((state) => state.clientSlice);

  const handleAddClientClick = () => {
    router.navigate('../client/addPage');
  };

  const handleSearch = (value: string) => {
    if (value.length === 0) return;

    API.clientBlock.searchClient(value).then(({ data }) => setSearchData(data));
  };

  return (
    <View className="flex mx-6 h-[500px] pb-[100px]">
      <Input
        variant="search"
        placeholder="Поиск клиента"
        onChangeText={handleSearch}
        style={{ marginBottom: 24 }}
      />
      <Button variant="add" onPress={handleAddClientClick} style={{ marginBottom: 16 }} />
      <CardList data={searchData.length === 0 ? clients : searchData} />
    </View>
  );
};
