import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Header, Input } from '@/components';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function EditPage() {
  const ArrowToLeftIcon = require('../assets/images/icons/arrowIcons/ArrowToLeftIcon.svg');

  return (
    <>
      <SafeAreaView className="mx-6 mt-6 mb-9">
        <Header title="Редактирование" icon={ArrowToLeftIcon} link="/(tabs)/users" />
      </SafeAreaView>
      <KeyboardAwareScrollView>
        <View className="mx-6 gap-y-4">
          {/* TODO: Исправить под Formic */}
          {/* TODO: Выводить данные выбранного пользователя */}
          <Input variant="text" placeholder="Фамилия" />
          <Input variant="text" placeholder="Имя" />
          <Input variant="text" placeholder="Отчество" />
          <Input variant="phone" placeholder="Номер" />
          <Input variant="email" placeholder="Электронная почта" />
          <Button
            variant="default"
            type="submit"
            text="Сохранить"
            buttonClassNames="w-full bg-[#0091EA] flex justify-center items-center py-[14.5px] rounded-[3px]"
            textClassNames="text-[#FFFFFF] text-[16px]"
            onPress={() => console.log('Submit')}
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
