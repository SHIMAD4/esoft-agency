import { FC } from 'react';
import { User } from '@/types';
import { UserCard } from '../UserCard';
import { View } from 'react-native';

type UserCardProps = {
  users: User[];
};

export const UserCardList: FC<UserCardProps> = ({ users }) => {
  return (
    <View className="flex gap-2">
      {users.map((user, index) => (
        <UserCard
          user={{
            ...user,
            fullName: user.fullName || `User#${index + 1}`,
          }}
          key={user.id}
        />
      ))}
    </View>
  );
};
