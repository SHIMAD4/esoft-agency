import { Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { FC, ReactNode } from 'react';
import clsx from 'clsx';

type HeaderTypes = {
  title: string;
  icon: ReactNode;
  link: string;
  classNames?: string;
};

export const Header: FC<HeaderTypes> = ({ title, icon, link, classNames }) => {
  const handlePress = () => {
    router.navigate(link);
  };

  return (
    <View className={clsx('w-full flex flex-row justify-between items-center', classNames)}>
      <TouchableOpacity
        onPress={handlePress}
        className="flex justify-center items-center border-[1px] border-[#CFD8DB] w-12 h-12 rounded-[3px]"
      >
        {icon}
      </TouchableOpacity>
      <Text className="text-[#37464F] text-2xl font-[700]">{title}</Text>
    </View>
  );
};
