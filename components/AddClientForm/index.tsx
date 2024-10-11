import { Formik } from 'formik';
import { View, Text } from 'react-native';
import { Button } from '../Button';
import { Input } from '../Input';
import { AddClientOnSubmitSchema } from '@/scripts/helpers';
import { ExtendedErrorType } from '@/types';

export const AddClientForm = () => {
  // TODO: Отправлять данные (Жду бэк)
  return (
    <Formik
      initialValues={{ surname: '', firstname: '', patronymic: '', phone: '', email: '' }}
      validationSchema={AddClientOnSubmitSchema}
      onSubmit={(data, errors) => !!errors && console.log('submit data: ', data)}
    >
      {({ handleChange, handleSubmit, values, errors }) => {
        const ExtendedErrors: ExtendedErrorType = errors;

        return (
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
              error={errors.phone}
              extendedError={ExtendedErrors.atLeastOneRequired}
            />
            <Input
              variant="email"
              placeholder="Электронная почта"
              value={values.email}
              onChangeText={handleChange('email')}
              error={errors.email}
              extendedError={ExtendedErrors.atLeastOneRequired}
            />
            {ExtendedErrors.atLeastOneRequired && (
              <Text className="text-[#FF1644] text-center">
                {ExtendedErrors.atLeastOneRequired}
              </Text>
            )}
            <Button
              variant="default"
              text="Создать"
              buttonClassNames="w-full bg-[#0091EA] flex justify-center items-center py-[14.5px] rounded-[3px]"
              textClassNames="text-[#FFFFFF] text-[16px]"
              onPress={handleSubmit}
            />
          </View>
        );
      }}
    </Formik>
  );
};
