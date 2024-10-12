import { View } from 'react-native';
import { Input } from '../../Input';
import { Button } from '../../Button';
import { CardList } from '../../CardList';
import { FC } from 'react';
import { router } from 'expo-router';

export const RealtorSlide: FC = () => {
  const handleAddClientClick = () => {
    router.navigate('../realtor/addPage');
  };

  return (
    <View className="flex-1 mx-6">
      <Input variant="search" placeholder="Поиск риэлтора" style={{ marginBottom: 24 }} />
      <Button variant="add" onPress={handleAddClientClick} style={{ marginBottom: 16 }} />
      {/* TODO: Нужно брать пользователей из БД (Жду бэк) */}
      <CardList
        entity="realtor"
        users={[
          { id: 1, fullName: 'Максимов Андрей Юрьевич', percent: 30 },
          {
            id: 2,
            fullName: 'Каматалина Юлия Сергеевна',
            percent: 20,
          },
        ]}
      />
    </View>
  );
};
