import { Formik } from 'formik';
import { View, Text } from 'react-native';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { setDisabledState } from '@/scripts/helpers';
import { ExtendedErrorType } from '@/shared/types';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { API } from '@/shared/api';
import { router } from 'expo-router';
import { handleSaveClients } from '@/shared/slices/clientSlice';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { AddClientOnSubmitSchema } from '@/scripts/submitingSchemes';

export const AddClientForm = () => {
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{ lastName: '', firstName: '', middleName: '', phone: '', email: '' }}
      validationSchema={AddClientOnSubmitSchema}
      onSubmit={(data, errors) => {
        if (!!errors) {
          API.clientBlock.addClient(data).then((data) => console.log(data));

          setTimeout(() => {
            router.navigate('/users/');

            API.clientBlock
              .getAllUsers()
              .then(({ data }) => dispatch(handleSaveClients({ clients: data })));
          }, 150);
        }
      }}
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
              value={values.lastName}
              onChangeText={handleChange('lastName')}
            />
            <Input
              variant="text"
              placeholder="Имя"
              value={values.firstName}
              onChangeText={handleChange('firstName')}
            />
            <Input
              variant="text"
              placeholder="Отчество"
              value={values.middleName}
              onChangeText={handleChange('middleName')}
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
