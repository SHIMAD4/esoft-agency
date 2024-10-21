import { Formik } from 'formik';
import { Text, View } from 'react-native';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { ExtendedErrorType } from '@/shared/types';
import { useEffect, useState } from 'react';
import { AddEstateOnSubmitSchema, setDisabledState } from '@/scripts/helpers';
import clsx from 'clsx';

export const EditEstateForm = () => {
  // TODO: Выводить данные выбранной недвижимости
  // TODO: Отправлять изменения (Жду бэк)
  return (
    <Formik
      initialValues={{
        type: '',
        city: '',
        street: '',
        house: '',
        apartment: '',
        latitude: '',
        longitude: '',
        floor: '',
        rooms: '',
        square: '',
      }}
      validationSchema={AddEstateOnSubmitSchema}
      onSubmit={(data, errors) => !!errors && console.log('submit data: ', data)}
    >
      {({ handleChange, handleSubmit, values, errors }) => {
        const extendedErrors: ExtendedErrorType = errors;
        const [disabled, setDisabled] = useState(true);

        useEffect(() => {
          setDisabledState(setDisabled, {
            fields: {
              latitude: values.latitude.toString(),
              longitude: values.longitude.toString(),
            },
            errors: {
              latitude: errors.latitude,
              longitude: errors.longitude,
            },
            allFieldsRequired: true,
          });
        }, [
          values.latitude,
          values.longitude,
          errors.latitude,
          errors.longitude,
          extendedErrors.allFieldsRequired,
        ]);

        return (
          <View className="mx-6 gap-y-4 mb-8">
            <Input
              variant="select"
              label="Тип недвижимости"
              placeholder="Выберите тип"
              value={values.type}
              onChangeText={handleChange('type')}
              data={[
                {
                  id: 1,
                  label: 'Обычная недвижимость',
                  value: 'regular',
                },
                { id: 2, label: 'Квартира', value: 'apartment' },
                { id: 3, label: 'Дом', value: 'house' },
                { id: 4, label: 'Земля', value: 'place' },
              ]}
            />
            {values.type && (
              <>
                <Text className="text-[18px] font-bold text-center mb-4 mt-9">Адрес</Text>
                <Input
                  variant="text"
                  label="Город"
                  placeholder="Введите город"
                  value={values.city}
                  onChangeText={handleChange('city')}
                  containerClassNames="mb-4"
                />
                <Input
                  variant="text"
                  label="Улица"
                  placeholder="Введите улицу"
                  value={values.street}
                  onChangeText={handleChange('street')}
                  containerClassNames="mb-4"
                />
                <Input
                  variant="number"
                  label="Дом"
                  placeholder="Введите номер дома"
                  value={values.house}
                  onChangeText={handleChange('house')}
                  containerClassNames="mb-4"
                />
                <Input
                  variant="number"
                  label="Квартира"
                  placeholder="Введите номер квартиры"
                  value={values.apartment}
                  onChangeText={handleChange('apartment')}
                  containerClassNames="mb-4"
                />
              </>
            )}
            {values.type && (
              <>
                <Text className="text-[18px] font-bold text-center mb-4 mt-9">Координаты</Text>
                <Input
                  variant="number"
                  label="Широта"
                  placeholder="Введите широту"
                  value={values.latitude}
                  onChangeText={handleChange('latitude')}
                  error={errors.latitude}
                  extendedError={extendedErrors.latitude}
                  containerClassNames="mb-4"
                  limitation={[-90, 90]}
                />
                <Input
                  variant="number"
                  label="Долгота"
                  placeholder="Введите долготу"
                  value={values.longitude}
                  onChangeText={handleChange('longitude')}
                  error={errors.longitude}
                  extendedError={extendedErrors.longitude}
                  containerClassNames="mb-4"
                  limitation={[-180, 180]}
                />
                {extendedErrors.allFieldsRequired && (
                  <Text className="text-[#FF1644] text-center">
                    {extendedErrors.allFieldsRequired}
                  </Text>
                )}
              </>
            )}
            {values.type === 'apartment' && (
              <>
                <Text className="text-[18px] font-bold text-center mb-4 mt-9">Квартира</Text>
                <Input
                  variant="number"
                  label="Этаж"
                  placeholder="Введите этаж"
                  value={values.floor}
                  onChangeText={handleChange('floor')}
                  containerClassNames="mb-4"
                />
                <Input
                  variant="number"
                  label="Количество комнат"
                  placeholder="Введите количество комнат"
                  value={values.rooms}
                  onChangeText={handleChange('rooms')}
                  containerClassNames="mb-4"
                />
                <Input
                  variant="number"
                  label="Площадь"
                  placeholder="Введите площадь"
                  value={values.square}
                  onChangeText={handleChange('square')}
                  containerClassNames="mb-4"
                />
              </>
            )}
            {values.type === 'house' && (
              <>
                <Text className="text-[18px] font-bold text-center mb-4 mt-9">Дом</Text>
                <Input
                  variant="number"
                  label="Этажность дома"
                  placeholder="Введите кол-во этажей"
                  value={values.floor}
                  onChangeText={handleChange('floor')}
                  containerClassNames="mb-4"
                />
                <Input
                  variant="number"
                  label="Количество комнат"
                  placeholder="Введите количество комнат"
                  value={values.rooms}
                  onChangeText={handleChange('rooms')}
                  containerClassNames="mb-4"
                />
                <Input
                  variant="number"
                  label="Площадь"
                  placeholder="Введите площадь"
                  value={values.square}
                  onChangeText={handleChange('square')}
                  containerClassNames="mb-4"
                />
              </>
            )}
            {values.type === 'place' && (
              <>
                <Text className="text-[18px] font-bold text-center mb-4 mt-9">Земля</Text>
                <Input
                  variant="text"
                  label="Площадь"
                  placeholder="Введите площадь"
                  value={values.square}
                  onChangeText={handleChange('square')}
                  containerClassNames="mb-4"
                />
              </>
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
