import { View, Text, TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { PeopleIcon } from '@/components/Icons';

export default function HomePage() {
  const Logo = require('../../assets/images/logo.png');

  return (
    <SafeAreaView className="flex-1 mx-6">
      <View className="w-full h-[56px] flex justify-center items-center mb-9 mt-6">
        <Image source={Logo} className="w-[100px] h-[40px]" />
      </View>
      <Text className="text-2xl text-center font-bold mb-9">
        {'Добро пожаловать,\nв агенство недвижимости'}
      </Text>
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => router.navigate('/(tabs)/users')}
      >
        <View className="w-[160px] h-[100px] flex flex-col justify-center gap-2 py-6 px-4 bg-[#01A0FF] rounded-[3px]">
          <PeopleIcon width={26} height={26} className="" />
          <Text className="text-[#ffffff]">Пользователи</Text>
        </View>
      </TouchableHighlight>
    </SafeAreaView>
  );
}
