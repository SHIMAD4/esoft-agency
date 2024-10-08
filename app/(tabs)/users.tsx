import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components';

export default function UsersPage() {
  const ArrowToLeftIcon = require('../../assets/images/icons/arrowIcons/ArrowToLeftIcon.svg');

  return (
    <SafeAreaView className="flex-1 mx-6 mt-6">
      <Header title="Пользователи" icon={ArrowToLeftIcon} link="/(tabs)" />
    </SafeAreaView>
  );
}
