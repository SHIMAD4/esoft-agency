import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, Icons, Input, Button, CardList } from '@/components';
import { router } from 'expo-router';
import { View } from 'react-native';
import { useEffect } from 'react';
import { API } from '@/shared/api';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { handleSaveEstates } from '@/shared/slices/estatesSlice';

export default function EstatePage() {
  const dispatch = useAppDispatch();
  const { estates } = useAppSelector((state) => state.estateSlice);

  const handleAddClientClick = () => {
    router.navigate('../estate/addPage');
  };

  const handleFilterClick = () => {
    router.navigate('../estate/filterPage');
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
        <Input variant="search" placeholder="Поиск недвижимости" style={{ marginBottom: 24 }} />
        <View className="flex flex-row justify-between items-center" style={{ marginBottom: 16 }}>
          <Button variant="add" onPress={handleAddClientClick} />
          <Button variant="filter" onPress={handleFilterClick} />
        </View>
      </SafeAreaView>
      <View className="flex-1 mx-6">
        <CardList data={estates} />
      </View>
    </>
  );
}
