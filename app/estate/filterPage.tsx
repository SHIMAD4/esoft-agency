import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header, Icons, AddFilterForm } from '@/components';

export default function FilterPage() {
  return (
    <>
      <SafeAreaView className="mx-6 mt-6 mb-9">
        <Header
          title="Фильтры"
          icon={<Icons.CrossIcon size={16} />}
          link="/(tabs)/estate"
          classNames="flex-row-reverse"
        />
      </SafeAreaView>
      <KeyboardAwareScrollView>
        <AddFilterForm />
      </KeyboardAwareScrollView>
    </>
  );
}
