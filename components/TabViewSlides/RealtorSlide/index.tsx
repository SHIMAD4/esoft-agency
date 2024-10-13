import { View, Text } from 'react-native';
import { Input } from '../../Input';
import { Button } from '../../Button';
import { CardList } from '../../CardList';
import { FC, SetStateAction, useState } from 'react';
import { router } from 'expo-router';
import { Realtor } from '@/types';

type RealtorSlideProps = {
  users: Realtor[];
};

export const RealtorSlide: FC<RealtorSlideProps> = ({ users }) => {
  const [searchUsers, setSearchUsers] = useState(users);

  const searchUser = (query: string) => {
    if (!query) {
      setSearchUsers(users);
      return;
    }

    query = query.toLowerCase();

    const finalResult: SetStateAction<Realtor[]> = [];
    users.forEach((user) => {
      if (
        user.fullName.toLowerCase().indexOf(query) !== -1 ||
        (user.percent && user.percent.toString().includes(query))
      ) {
        finalResult.push(user);
      }
    });

    setSearchUsers(finalResult);
  };

  const handleAddClientClick = () => {
    router.navigate('../realtor/addPage');
  };

  return (
    <View className="flex-1 mx-6">
      {/* TODO: Нужно сделать нечетный поиск Левенштейна */}
      <Input
        variant="search"
        placeholder="Поиск риэлтора"
        style={{ marginBottom: 24 }}
        onChange={searchUser}
      />
      <Button variant="add" onPress={handleAddClientClick} style={{ marginBottom: 16 }} />
      {searchUsers.length !== 0 ? (
        <CardList entity="realtor" users={searchUsers} />
      ) : (
        <Text className="text-center">Ничего не найдено</Text>
      )}
    </View>
  );
};
