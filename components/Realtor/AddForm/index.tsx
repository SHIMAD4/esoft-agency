import { Formik } from 'formik';
import { View } from 'react-native';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { AddRealtorOnSubmitSchema, setDisabledState } from '@/scripts/helpers';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export const AddRealtorForm = () => {
  // TODO: Отправлять данные (Жду бэк)
  return (
    <Formik
      initialValues={{ surname: '', firstname: '', patronymic: '', percent: '' }}
      onSubmit={(data, errors) => !!errors && console.log('submit data: ', data)}
      validationSchema={AddRealtorOnSubmitSchema}
    >
      {({ handleChange, handleSubmit, values, errors }) => {
        const [disabled, setDisabled] = useState(true);

        useEffect(() => {
          setDisabledState(setDisabled, {
            fields: {
              surname: values.surname,
              firstname: values.firstname,
              patronymic: values.patronymic,
            },
            errors: {
              surname: errors.surname,
              firstname: errors.firstname,
              patronymic: errors.patronymic,
            },
          });
        }, [
          values.surname,
          values.firstname,
          values.patronymic,
          errors.surname,
          errors.firstname,
          errors.patronymic,
        ]);

        return (
          <View className="mx-6 gap-y-4">
            <Input
              variant="text"
              placeholder="Фамилия"
              value={values.surname}
              onChangeText={handleChange('surname')}
              error={errors.surname}
            />
            <Input
              variant="text"
              placeholder="Имя"
              value={values.firstname}
              onChangeText={handleChange('firstname')}
              error={errors.firstname}
            />
            <Input
              variant="text"
              placeholder="Отчество"
              value={values.patronymic}
              onChangeText={handleChange('patronymic')}
              error={errors.patronymic}
            />
            <Input
              variant="number"
              placeholder="Процентная ставка"
              value={values.percent}
              onChangeText={handleChange('percent')}
              min={0}
              max={100}
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
