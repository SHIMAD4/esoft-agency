import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { CardList, Icons } from '@/components';
import { HomeCard } from '@/components/HomeCard';
import { useAppSelector } from '@/shared/hooks/useAppSelector';

export default function HomePage() {
  const Logo = require('../../assets/images/logo.jpg');
  const { upcomingEvents } = useAppSelector((state) => state.eventsSlice);

  return (
    <SafeAreaView className="flex-1 mx-6">
      <View className="w-full h-[56px] flex justify-center items-center mb-9 mt-6">
        <Image source={Logo} className="w-[100px] h-[40px]" />
      </View>
      <Text className="text-2xl text-center font-bold mb-9">
        {'Добро пожаловать,\nв агенство недвижимости'}
      </Text>
      <View className="flex flex-wrap mb-8">
        <View className="w-full flex flex-row justify-between mb-[18px] px-3.5">
          <HomeCard
            title="Пользователи"
            path="/(tabs)/users"
            icon={<Icons.PeopleIcon size={26} />}
          />
          <HomeCard
            title="Недвижимость"
            path="/(tabs)/estate"
            icon={<Icons.EstateIcon size={26} />}
          />
        </View>
        <View className="w-full flex flex-row justify-between mb-[18px] px-3.5">
          <HomeCard title="Сделки" path="/(tabs)/deal" icon={<Icons.DealIcon size={26} />} />
          <HomeCard title="События" path="/(tabs)/events" icon={<Icons.EventIcon size={26} />} />
        </View>
      </View>
      <View className="h-[210px]">
        <Text className="text-[18px] font-bold px-1.5 mb-4">События</Text>
        {upcomingEvents.length !== 0 ? (
          <CardList data={upcomingEvents} />
        ) : (
          <Text className="text-[14px] px-1.5 mt-4">На сегодня нет запланированных событий</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
