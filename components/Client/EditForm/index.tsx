import { Formik } from 'formik';
import { Image, Text, View } from 'react-native';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { Client, ExtendedErrorType } from '@/shared/types';
import { useEffect, useState } from 'react';
import { setDisabledState } from '@/scripts/helpers';
import { router, useGlobalSearchParams } from 'expo-router';
import clsx from 'clsx';
import { API } from '@/shared/api';
import { handleSaveClients } from '@/shared/slices/clientSlice';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { AddClientOnSubmitSchema } from '@/scripts/submitingSchemes';
import { Icons } from '@/components';

export const EditClientForm = () => {
  const dispatch = useAppDispatch();
  const { id } = useGlobalSearchParams();
  const [user, setUser] = useState<Client>({
    type: '',
    id: '',
    lastName: '',
    firstName: '',
    middleName: '',
    phone: '',
    email: '',
    avatar: '',
  });

  useEffect(() => {
    API.appBlock.getUserById(id as string).then(({ data }) => setUser(data));
  }, [id]);

  return (
    <Formik
      initialValues={{
        lastName: user.lastName || '',
        firstName: user.firstName || '',
        middleName: user.middleName || '',
        phone: user.phone || '',
        email: user.email || '',
        avatar: user.avatar || '',
      }}
      enableReinitialize={true}
      onSubmit={(data, errors) => {
        if (!!errors) {
          API.clientBlock.editClient(id as string, data).then((data) => console.log(data));

          setTimeout(() => {
            router.navigate('/users/');

            API.clientBlock
              .getAllUsers()
              .then(({ data }) => dispatch(handleSaveClients({ clients: data })));
          }, 150);
        }
      }}
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
            <View className="flex justify-center items-center w-full mb-2">
              {values.avatar ? (
                <Image
                  source={{ uri: user.avatar }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
              ) : user.avatar ? (
                <Image
                  source={{ uri: user.avatar }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
              ) : (
                <Icons.DefaultAvatar size={100} />
              )}
              <Text className="mt-2 text-[#0091EA]">Выбрать фотографию</Text>
            </View>
            <Input
              variant="text"
              placeholder="Фамилия"
              value={values.firstName}
              onChangeText={handleChange('firstName')}
            />
            <Input
              variant="text"
              placeholder="Имя"
              value={values.middleName}
              onChangeText={handleChange('middleName')}
            />
            <Input
              variant="text"
              placeholder="Отчество"
              value={values.lastName}
              onChangeText={handleChange('lastName')}
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
