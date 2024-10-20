import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Icons } from '@/components';
import { HomeCard } from '@/components/HomeCard';
import { useEffect } from 'react';
import { API } from '@/shared/api';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { handleSaveClients } from '@/shared/slices/clientSlice';
import { handleSaveRealtors } from '@/shared/slices/realtorSlice';

export default function HomePage() {
  const Logo = require('../../assets/images/logo.png');
  const dispatch = useAppDispatch();

  useEffect(() => {
    API.clientBlock
      .getAllUsers()
      .then(({ data }) => dispatch(handleSaveClients({ clients: data })));

    API.realtorBlock
      .getAllUsers()
      .then(({ data }) => dispatch(handleSaveRealtors({ realtors: data })));
  }, []);

  return (
    <SafeAreaView className="flex-1 mx-6">
      <View className="w-full h-[56px] flex justify-center items-center mb-9 mt-6">
        <Image source={Logo} className="w-[100px] h-[40px]" />
      </View>
      <Text className="text-2xl text-center font-bold mb-9">
        {'Добро пожаловать,\nв агенство недвижимости'}
      </Text>
      <View className="flex flex-row justify-between">
        <HomeCard title="Пользователи" path="/(tabs)/users" icon={<Icons.PeopleIcon size={26} />} />
        {/*<HomeCard*/}
        {/*  title="Недвижимость"*/}
        {/*  path="/(tabs)/estate"*/}
        {/*  icon={<Icons.EstateIcon size={26} />}*/}
        {/*/>*/}
      </View>
    </SafeAreaView>
  );
}
