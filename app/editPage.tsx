import { SafeAreaView } from 'react-native-safe-area-context';
import { EditClientForm, Header } from '@/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function EditPage() {
  const ArrowToLeftIcon = require('../assets/images/icons/arrowIcons/ArrowToLeftIcon.svg');

  return (
    <>
      <SafeAreaView className="mx-6 mt-6 mb-9">
        <Header title="Редактирование" icon={ArrowToLeftIcon} link="/(tabs)/users" />
      </SafeAreaView>
      <KeyboardAwareScrollView>
        {/* TODO: Выводить данные выбранного пользователя */}
        <EditClientForm />
      </KeyboardAwareScrollView>
    </>
  );
}
