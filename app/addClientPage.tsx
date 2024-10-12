import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header, AddClientForm } from '@/components';
import { ArrowIcon } from '@/components/Icons';

export default function AddClientPage() {
  return (
    <>
      <SafeAreaView className="mx-6 mt-6 mb-9">
        <Header
          title="Добавить клиента"
          icon={<ArrowIcon rotateToLeft={true} />}
          link="/(tabs)/users"
        />
      </SafeAreaView>
      <KeyboardAwareScrollView>
        <AddClientForm />
      </KeyboardAwareScrollView>
    </>
  );
}
