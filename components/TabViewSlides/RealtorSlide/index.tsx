import { View } from 'react-native';
import { Input } from '../../Input';
import { Button } from '../../Button';
import { CardList } from '../../CardList';
import { FC } from 'react';
import { router } from 'expo-router';
import { Realtor } from '@/types';

type RealtorSlideProps = {
  users: Realtor[];
};

export const RealtorSlide: FC<RealtorSlideProps> = ({ users }) => {
  const handleAddClientClick = () => {
    router.navigate('../realtor/addPage');
  };

  return (
    <View className="flex-1 mx-6">
      {/* TODO: Нужно сделать поиск через бэк (Жду бэк) */}
      <Input variant="search" placeholder="Поиск риэлтора" style={{ marginBottom: 24 }} />
      <Button variant="add" onPress={handleAddClientClick} style={{ marginBottom: 16 }} />
      <CardList entity="realtor" users={users} />
    </View>
  );
};
