import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header } from '@/components';
import { AddClientForm } from '@/components';

export default function AddClientPage() {
  const ArrowToLeftIcon = require('../assets/images/icons/arrowIcons/ArrowToLeftIcon.svg');

  return (
    <>
      <SafeAreaView className="mx-6 mt-6 mb-9">
        <Header title="Добавить клиента" icon={ArrowToLeftIcon} link="/(tabs)/users" />
      </SafeAreaView>
      <KeyboardAwareScrollView>
        <AddClientForm />
      </KeyboardAwareScrollView>
    </>
  );
}
