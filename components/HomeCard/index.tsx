import { Text, TouchableHighlight, View } from 'react-native';
import { router } from 'expo-router';
import { FC, ReactNode } from 'react';

type HomeCard = {
  title: string;
  path: string;
  icon: ReactNode;
};

export const HomeCard: FC<HomeCard> = ({ title, path, icon }) => {
  return (
    <TouchableHighlight
      className="w-[160px] h-[100px]"
      underlayColor="transparent"
      onPress={() => router.navigate(path)}
    >
      <View className="flex flex-col justify-center gap-2 py-6 px-4 bg-[#01A0FF] rounded-[3px]">
        {icon}
        <Text className="text-[#ffffff]">{title}</Text>
      </View>
    </TouchableHighlight>
  );
};
