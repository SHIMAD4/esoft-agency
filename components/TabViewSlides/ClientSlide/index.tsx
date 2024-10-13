import { Text, View } from 'react-native';
import { Input } from '../../Input';
import { Button } from '../../Button';
import { CardList } from '../../CardList';
import { FC, SetStateAction, useState } from 'react';
import { router } from 'expo-router';
import { User } from '@/types';

type ClientSlideProps = {
  users: User[];
};

export const ClientSlide: FC<ClientSlideProps> = ({ users }) => {
  const [searchUsers, setSearchUsers] = useState(users);

  const searchUser = (query: string) => {
    if (!query) {
      setSearchUsers(users);
      return;
    }

    query = query.toLowerCase();

    const result: SetStateAction<User[]> = [];
    users.forEach((user) => {
      if (
        user.fullName.toLowerCase().indexOf(query) !== -1 ||
        (user.email && user.email.includes(query))
      ) {
        result.push(user);
      }
    });

    setSearchUsers(result);
  };

  const handleAddClientClick = () => {
    router.navigate('../client/addPage');
  };

  return (
    <View className="flex-1 mx-6">
      {/* TODO: Нужно сделать нечетный поиск Левенштейна */}
      <Input
        variant="search"
        placeholder="Поиск клиента"
        style={{ marginBottom: 24 }}
        onChange={searchUser}
      />
      <Button variant="add" onPress={handleAddClientClick} style={{ marginBottom: 16 }} />
      {searchUsers.length !== 0 ? (
        <CardList entity="user" users={searchUsers} />
      ) : (
        <Text className="text-center">Ничего не найдено</Text>
      )}
    </View>
  );
};
