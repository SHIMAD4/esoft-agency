import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import { FC, ReactNode } from 'react';

type HeaderTypes = {
  title: string;
  icon: ReactNode;
  link: string;
};

export const Header: FC<HeaderTypes> = ({ title, icon, link }) => (
  <View className="w-full flex flex-row justify-between items-center">
    <Link
      href={{ pathname: link }}
      className="border-[1px] border-[#CFD8DB] w-12 h-12 p-5 rounded-[3px]"
    >
      {icon}
    </Link>
    <Text className="text-[#37464F] text-2xl font-[700]">{title}</Text>
  </View>
);
