import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header, AddDemandForm, Icons } from '@/components';

export default function AddPage() {
  return (
    <>
      <SafeAreaView className="mx-6 mt-6 mb-9">
        <Header
          title="Добавить"
          icon={<Icons.ArrowIcon rotateToLeft={true} size={16} />}
          link="/(tabs)/deal"
        />
      </SafeAreaView>
      <KeyboardAwareScrollView>
        <AddDemandForm />
      </KeyboardAwareScrollView>
    </>
  );
}
