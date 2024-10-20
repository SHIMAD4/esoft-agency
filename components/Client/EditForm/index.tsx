import { Formik } from 'formik';
import { Text, View } from 'react-native';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { ExtendedErrorType } from '@/shared/types';
import { useEffect, useState } from 'react';
import { AddClientOnSubmitSchema, setDisabledState } from '@/scripts/helpers';
import { useGlobalSearchParams } from 'expo-router';
import clsx from 'clsx';
import { API } from '@/shared/api';

export const EditClientForm = () => {
  const { id } = useGlobalSearchParams();

  // TODO: Показывать поля которые уже есть (Жду бэк)
  // TODO: Отправлять изменения (Жду бэк)
  useEffect(() => {
    API.appBlock.getUserById(id as string).then((res) => console.log(res));
  }, [id]);

  return (
    <Formik
      initialValues={{ surname: '', firstname: '', patronymic: '', phone: '', email: '' }}
      onSubmit={(data) => console.log('edit data: ', data)}
      validationSchema={AddClientOnSubmitSchema}
    >
      {({ handleChange, handleSubmit, values, errors }) => {
        const extendedErrors: ExtendedErrorType = errors;
        const [disabled, setDisabled] = useState(true);

        useEffect(() => {
          setDisabledState(setDisabled, {
            fields: {
              phone: values.phone,
              email: values.email,
            },
            errors: {
              phone: errors.phone,
              email: errors.email,
            },
            atLeastOneRequiredError: extendedErrors.atLeastOneRequiredError,
          });
        }, [
          values.phone,
          values.email,
          errors.phone,
          errors.email,
          extendedErrors.atLeastOneRequiredError,
        ]);

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
              extendedError={extendedErrors.atLeastOneRequiredError}
            />
            <Input
              variant="email"
              placeholder="Электронная почта"
              value={values.email}
              onChangeText={handleChange('email')}
              error={errors.email}
              extendedError={extendedErrors.atLeastOneRequiredError}
            />
            {extendedErrors.atLeastOneRequiredError && (
              <Text className="text-[#FF1644] text-center">
                {extendedErrors.atLeastOneRequiredError}
              </Text>
            )}
            <Button
              variant="default"
              text="Сохранить"
              buttonClassNames={clsx(
                'w-full bg-[#0091EA] flex justify-center items-center py-[14.5px] rounded-[3px]',
                disabled && 'bg-[#01A0FF]',
              )}
              textClassNames={clsx('text-[#FFFFFF] text-[16px]', disabled && 'text-[#70C9FF]')}
              onPress={handleSubmit}
              disabled={disabled}
            />
          </View>
        );
      }}
    </Formik>
  );
};
