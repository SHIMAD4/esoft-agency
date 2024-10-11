import { Formik } from 'formik';
import { View } from 'react-native';
import { Button } from '../Button';
import { Input } from '../Input';

export const EditClientForm = () => {
  // TODO: Добавить логику редактирования пользователя (Жду бэк)
  return (
    <Formik
      initialValues={{ surname: '', firstname: '', patronymic: '', phone: '', email: '' }}
      onSubmit={(data) => console.log(data)}
    >
      {({ handleChange, handleSubmit, values }) => (
        <View className="mx-6 gap-y-4">
          <Input
            variant="text"
            placeholder="Фамилия"
            value={values.surname}
            onChangeText={handleChange('surname')}
          />
          <Input
            variant="text"
            placeholder="Имя"
            value={values.firstname}
            onChangeText={handleChange('firstname')}
          />
          <Input
            variant="text"
            placeholder="Отчество"
            value={values.patronymic}
            onChangeText={handleChange('patronymic')}
          />
          <Input
            variant="phone"
            placeholder="Номер"
            value={values.phone}
            onChangeText={handleChange('phone')}
          />
          <Input
            variant="email"
            placeholder="Электронная почта"
            value={values.email}
            onChangeText={handleChange('email')}
          />
          <Button
            variant="default"
            type="submit"
            text="Сохранить"
            buttonClassNames="w-full bg-[#0091EA] flex justify-center items-center py-[14.5px] rounded-[3px]"
            textClassNames="text-[#FFFFFF] text-[16px]"
            onPress={handleSubmit}
          />
        </View>
      )}
    </Formik>
  );
};
