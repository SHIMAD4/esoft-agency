import { View } from 'react-native';
import { Input } from '../../Input';
import { Button } from '../../Button';
import { CardList } from '../../CardList';
import { FC } from 'react';
import { router } from 'expo-router';
import { Client } from '@/shared/types';

type ClientSlideProps = {
  users: Client[];
};

export const ClientSlide: FC<ClientSlideProps> = ({ users }) => {
  const handleAddClientClick = () => {
    router.navigate('../client/addPage');
  };

  return (
    <View className="flex mx-6 h-[500px] pb-[100px]">
      {/* TODO: Нужно сделать поиск через бэк (Жду бэк) */}
      <Input variant="search" placeholder="Поиск клиента" style={{ marginBottom: 24 }} />
      <Button variant="add" onPress={handleAddClientClick} style={{ marginBottom: 16 }} />
      <CardList data={users} />
    </View>
  );
};
