import { View, Text } from 'react-native';
import { FC } from 'react';
import { User, Realtor } from '@/types';

type CardProps = {
  user: User | Realtor;
  onPress: () => void;
  entity: 'user' | 'realtor';
};

type UserCardProps = {
  user: User;
  onPress: () => void;
};

type RealtorCardProps = {
  user: Realtor;
  onPress: () => void;
};

export const Card: FC<CardProps> = ({ user, onPress, entity }) => {
  switch (entity) {
    case 'user':
      return <UserCard user={user as User} onPress={onPress} />;
    case 'realtor':
      return <RealtorCard user={user as Realtor} onPress={onPress} />;
  }
};

const UserCard: FC<UserCardProps> = ({ user, onPress }) => {
  const { fullName, telephone, email } = user;

  return (
    <View className="w-full bg-[#f5f4f8] p-4 mb-2 rounded-[3px]" onTouchStart={onPress}>
      <Text className="text-[16px] font-semibold mb-4">{fullName}</Text>
      <Text className="text-[#546E7A] text-[12px] font-[400]">{telephone}</Text>
      {email && <Text className="text-[#546E7A] text-[12px] font-[400] mt-[8px]">{email}</Text>}
    </View>
  );
};

const RealtorCard: FC<RealtorCardProps> = ({ user, onPress }) => {
  const { fullName, percent } = user;

  return (
    <View className="w-full bg-[#f5f4f8] p-4 mb-2 rounded-[3px]" onTouchStart={onPress}>
      <Text className="text-[16px] font-semibold mb-4">{fullName}</Text>
      <Text className="text-[#546E7A] text-[12px] font-[400]">Комиссия: {percent}%</Text>
    </View>
  );
};
