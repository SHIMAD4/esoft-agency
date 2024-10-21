import { Formik } from 'formik';
import { View } from 'react-native';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { useEffect, useState } from 'react';
import { AddRealtorOnSubmitSchema, setDisabledState } from '@/scripts/helpers';
import clsx from 'clsx';
import { Realtor } from '@/shared/types';
import { API } from '@/shared/api';
import { router, useGlobalSearchParams } from 'expo-router';
import { handleSaveRealtors } from '@/shared/slices/realtorSlice';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';

export const EditRealtorForm = () => {
  const dispatch = useAppDispatch();
  const { id } = useGlobalSearchParams();
  const [user, setUser] = useState<Realtor>({
    type: '',
    fullName: '',
    dealShare: '',
    firstName: '',
    lastName: '',
    middleName: '',
    user: {
      id: '',
      role: '',
    },
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
        dealShare: user.dealShare.toString() || '',
      }}
      enableReinitialize={true}
      onSubmit={(data, errors) => {
        if (!!errors) {
          API.realtorBlock.editRealtor(id as string, data).then((data) => console.log(data));

          setTimeout(() => {
            router.navigate('/users/');

            API.realtorBlock
              .getAllUsers()
              .then(({ data }) => dispatch(handleSaveRealtors({ realtors: data })));
          }, 150);
        }
      }}
      validationSchema={AddRealtorOnSubmitSchema}
    >
      {({ handleChange, handleSubmit, values, errors }) => {
        const [disabled, setDisabled] = useState(true);

        useEffect(() => {
          setDisabledState(setDisabled, {
            fields: {
              lastName: values.lastName,
              firstName: values.firstName,
              middleName: values.middleName,
            },
            errors: {
              lastName: errors.lastName,
              firstName: errors.firstName,
              middleName: errors.middleName,
            },
          });
        }, [
          values.lastName,
          values.firstName,
          values.middleName,
          errors.lastName,
          errors.firstName,
          errors.middleName,
        ]);

        return (
          <View className="mx-6 gap-y-4">
            <Input
              variant="text"
              placeholder="Фамилия"
              value={values.firstName}
              onChangeText={handleChange('firstName')}
              error={errors.firstName}
            />
            <Input
              variant="text"
              placeholder="Имя"
              value={values.middleName}
              onChangeText={handleChange('middleName')}
              error={errors.middleName}
            />
            <Input
              variant="text"
              placeholder="Отчество"
              value={values.lastName}
              onChangeText={handleChange('lastName')}
              error={errors.lastName}
            />
            <Input
              variant="number"
              placeholder="Процентная ставка"
              value={values.dealShare}
              onChangeText={handleChange('dealShare')}
            />
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
