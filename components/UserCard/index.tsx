import { View, Text } from 'react-native';
import { FC } from 'react';
import { User } from '@/types';

type UserCardProps = {
  user: User;
  key: number;
};

export const UserCard: FC<UserCardProps> = ({ user, key }) => {
  const { fullName, telephone, email } = user;

  return (
    <View className="w-full bg-[#f5f4f8] p-4" key={key}>
      <Text className="text-[16px] font-semibold mb-4">{fullName}</Text>
      <Text className="text-[#546E7A] text-[12px] font-[400]">{telephone}</Text>
      {email && <Text className="text-[#546E7A] text-[12px] font-[400] mt-[8px]">{email}</Text>}
    </View>
  );
};
