import { Input } from '../../Input';
import { View } from 'react-native';

export const ClientSlide = () => {
  return (
    <View className="flex-1 mx-6">
      <Input variant="search" placeholder="Поиск клиента" />
    </View>
  );
};
