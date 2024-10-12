import { SafeAreaView } from 'react-native-safe-area-context';
import { EditClientForm, Header } from '@/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ArrowIcon } from '@/components/Icons';

export default function EditPage() {
  return (
    <>
      <SafeAreaView className="mx-6 mt-6 mb-9">
        <Header
          title="Редактирование"
          icon={<ArrowIcon rotateToLeft={true} />}
          link="/(tabs)/users"
        />
      </SafeAreaView>
      <KeyboardAwareScrollView>
        {/* TODO: Выводить данные выбранного пользователя */}
        <EditClientForm />
      </KeyboardAwareScrollView>
    </>
  );
}
