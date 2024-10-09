import { View } from 'react-native';
import { Input } from '../../Input';
import { Button } from '../../Button';
import { UserCardList } from '../../UserCardList';
import { FC } from 'react';

export const ClientSlide: FC = () => {
  // TODO: Добавить логику добавления пользователя (Жду бэк)
  const onPress = () => {
    console.log('Pressed add');
  };

  return (
    <View className="flex-1 mx-6">
      <Input variant="search" placeholder="Поиск клиента" style={{ marginBottom: 24 }} />
      <Button variant="add" onPress={onPress} style={{ marginBottom: 16 }} />
      {/* TODO: Нужно брать пользователей из БД (Жду бэк) */}
      <UserCardList
        users={[
          { id: 1, fullName: 'User#1', telephone: '+ 7 (965) 433 - 55 - 55' },
          {
            id: 2,
            fullName: 'Мелихова Ева-София',
            telephone: '+ 7 (965) 433 - 55 - 55',
            email: 'sshuulje@vk.com',
          },
        ]}
      />
    </View>
  );
};
