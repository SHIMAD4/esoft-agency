import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { FC } from 'react';

type HeaderTypes = {
  title: string;
  icon: string;
  link: string;
};

export const Header: FC<HeaderTypes> = ({ title, icon, link }) => (
  <View className="w-full flex flex-row justify-between items-center">
    <Link
      href={{ pathname: link }}
      className="border-[1px] border-[#CFD8DB] w-12 h-12 p-4 rounded-[3px]"
    >
      <Image source={icon} className="w-4 h-4" />
    </Link>
    <Text className="text-[#37464F] text-2xl font-[700]">{title}</Text>
  </View>
);
