import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Link } from 'expo-router';

export default function HomePage() {
  const Logo = require('../../assets/images/logo.png');
  const UsersIcon = require('../../assets/images/icons/peopleIcon.svg');

  return (
    <SafeAreaView className="flex-1 mx-[24px]">
      <View className="w-full h-[56px] flex justify-center items-center mb-9 mt-6">
        <Image source={Logo} className="w-[100px] h-[40px]" />
      </View>
      <Text className="text-2xl text-center font-bold mb-9">
        {'Добро пожаловать,\nв агенство недвижимости'}
      </Text>
      <Link href={{ pathname: '/(tabs)\\users' }}>
        <View className="w-[160px] h-[100px] flex flex-col justify-center gap-2 py-6 px-4 bg-[#01A0FF] rounded-[3px]">
          <Image source={UsersIcon} className="w-6 h-6" />
          <Text className="text-[#ffffff]">Пользователи</Text>
        </View>
      </Link>
    </SafeAreaView>
  );
}
