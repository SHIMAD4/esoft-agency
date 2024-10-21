import { Formik } from 'formik';
import { View } from 'react-native';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { AddRealtorOnSubmitSchema, setDisabledState } from '@/scripts/helpers';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { API } from '@/shared/api';
import { router } from 'expo-router';
import { handleSaveRealtors } from '@/shared/slices/realtorSlice';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';

export const AddRealtorForm = () => {
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{ lastName: '', firstName: '', middleName: '', dealShare: '' }}
      onSubmit={(data, errors) => {
        if (!!errors) {
          API.realtorBlock.addRealtor(data).then((data) => console.log(data));

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
              error={errors.dealShare}
            />
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
