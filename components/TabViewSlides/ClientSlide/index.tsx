import { View } from 'react-native';
import { Input } from '../../Input';
import { Button } from '../../Button';

export const ClientSlide = () => {
  // TODO: Добавить поведение добавления пользователя
  const onPress = () => {
    console.log('Pressed add');
  };

  return (
    <View className="flex-1 mx-6">
      <Input variant="search" placeholder="Поиск клиента" />
      <Button variant="add" onPress={onPress} />
    </View>
  );
};
