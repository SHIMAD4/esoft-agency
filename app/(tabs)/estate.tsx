import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, Icons, Input, Button, CardList } from '@/components';
import { router } from 'expo-router';
import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { API } from '@/shared/api';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { handleSaveEstates } from '@/shared/slices/estatesSlice';
import { Client } from '@/shared/types';

export default function EstatePage() {
  const dispatch = useAppDispatch();
  const { estates } = useAppSelector((state) => state.estateSlice);
  const [searchData, setSearchData] = useState<Client[]>([]);

  const handleAddClientClick = () => {
    router.navigate('../estate/addPage');
  };

  const handleFilterClick = () => {
    router.navigate('../estate/filterPage');
  };

  const handleSearch = (value: string) => {
    if (value.length === 0) return;

    API.estateBlock.searchEstate(value).then(({ data }) => setSearchData(data));
  };

  useEffect(() => {
    API.estateBlock
      .getAllEstates()
      .then(({ data }) => dispatch(handleSaveEstates({ estates: data })));
  }, []);

  return (
    <>
      <SafeAreaView className="mx-6 mt-6">
        <Header
          title="Недвижимость"
          icon={<Icons.ArrowIcon rotateToLeft={true} size={16} />}
          link="/(tabs)"
        />
        <Input
          variant="search"
          placeholder="Поиск недвижимости"
          onChangeText={handleSearch}
          style={{ marginBottom: 24 }}
        />
        <View className="flex flex-row justify-between items-center" style={{ marginBottom: 16 }}>
          <Button variant="add" onPress={handleAddClientClick} />
          <Button variant="filter" onPress={handleFilterClick} />
        </View>
      </SafeAreaView>
      <View className="flex-1 mx-6">
        <CardList data={searchData.length === 0 ? estates : searchData} />
      </View>
    </>
  );
}
