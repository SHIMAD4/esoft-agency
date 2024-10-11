import { Formik } from 'formik';
import { View, Text } from 'react-native';
import { Button } from '../Button';
import { Input } from '../Input';
import { AddClientOnSubmitSchema, setDisabledState } from '@/scripts/helpers';
import { ExtendedErrorType } from '@/types';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export const AddClientForm = () => {
  // TODO: Отправлять данные (Жду бэк)
  return (
    <Formik
      initialValues={{ surname: '', firstname: '', patronymic: '', phone: '', email: '' }}
      validationSchema={AddClientOnSubmitSchema}
      onSubmit={(data, errors) => !!errors && console.log('submit data: ', data)}
    >
      {({ handleChange, handleSubmit, values, errors }) => {
        const extendedErrors: ExtendedErrorType = errors;
        const [disabled, setDisabled] = useState(true);

        useEffect(() => {
          setDisabledState(
            setDisabled,
            values.phone,
            values.email,
            errors.phone,
            errors.email,
            extendedErrors.atLeastOneRequiredError,
          );
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
              text="Создать"
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
