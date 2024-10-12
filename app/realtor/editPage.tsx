import { SafeAreaView } from 'react-native-safe-area-context';
import { EditRealtorForm, Header, Icons } from '@/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function EditPage() {
  return (
    <>
      <SafeAreaView className="mx-6 mt-6 mb-9">
        <Header
          title="Редактирование"
          icon={<Icons.ArrowIcon rotateToLeft={true} size={16} />}
          link="/(tabs)/users"
        />
      </SafeAreaView>
      <KeyboardAwareScrollView>
        {/* TODO: Выводить данные выбранного пользователя */}
        <EditRealtorForm />
      </KeyboardAwareScrollView>
    </>
  );
}
