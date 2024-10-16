import { View } from 'react-native';
import { Input } from '../../Input';
import { Button } from '../../Button';
import { CardList } from '../../CardList';
import { FC } from 'react';
import { router } from 'expo-router';
import { User } from '@/types';

type ClientSlideProps = {
  users: User[];
};

export const ClientSlide: FC<ClientSlideProps> = ({ users }) => {
  const handleAddClientClick = () => {
    router.navigate('../client/addPage');
  };

  return (
    <View className="flex-1 mx-6">
      {/* TODO: Нужно сделать поиск через бэк (Жду бэк) */}
      <Input variant="search" placeholder="Поиск клиента" style={{ marginBottom: 24 }} />
      <Button variant="add" onPress={handleAddClientClick} style={{ marginBottom: 16 }} />
      <CardList entity="user" users={users} />
    </View>
  );
};
