import { Formik } from 'formik';
import { View, Text } from 'react-native';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { setDisabledState } from '@/scripts/helpers';
import { Estate, ExtendedErrorType } from '@/shared/types';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { API } from '@/shared/api';
import { EstateType } from '@/scripts/constants';
import { router } from 'expo-router';
import { handleSaveEstates } from '@/shared/slices/estatesSlice';
import { AddEstateOnSubmitSchema } from '@/scripts/submitingSchemes';

export const AddEstateForm = () => {
  const dispatch = useAppDispatch();
  const initialValues: Estate = {
    type: 'Estate',
    id: '',
    latitude: 0,
    longitude: 0,
    addressCity: '',
    addressHouse: '',
    addressNumber: '',
    addressStreet: '',
    districts: [],
    data: {
      floor: 0,
      totalFloors: 0,
      totalArea: 0,
      totalRooms: 0,
      type: '',
    },
  };

  return (
    <Formik
      initialValues={{
        type: initialValues.type || '',
        addressCity: initialValues.addressCity || '',
        addressStreet: initialValues.addressStreet || '',
        addressHouse: initialValues.addressHouse || '',
        addressNumber: initialValues.addressNumber || '',
        dataType: initialValues.data.type || '',
        latitude: initialValues.latitude,
        longitude: initialValues.longitude,
        floor: initialValues.data.floor,
        totalFloors: initialValues.data.totalFloors,
        totalRooms: initialValues.data.totalRooms,
        totalArea: initialValues.data.totalArea,
      }}
      validationSchema={AddEstateOnSubmitSchema}
      onSubmit={(data, errors) => {
        if (!!errors) {
          API.estateBlock.addEstate(data).then((data) => console.log('Данные на отсылку:', data));

          setTimeout(() => {
            router.navigate('/estate/');

            API.estateBlock
              .getAllEstates()
              .then(({ data }) => dispatch(handleSaveEstates({ estates: data })));
          }, 500);
        }
      }}
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
              value={values.dataType}
              onChangeText={handleChange('dataType')}
              data={[
                { id: 1, label: 'Квартира', value: EstateType.APARTMENT },
                { id: 2, label: 'Дом', value: EstateType.HOUSE },
                { id: 3, label: 'Земля', value: EstateType.LAND },
              ]}
            />
            {values.dataType && (
              <>
                <Text className="text-[18px] font-bold text-center mt-9">Адрес</Text>
                <Input
                  variant="text"
                  label="Город"
                  placeholder="Введите город"
                  value={values.addressCity}
                  onChangeText={handleChange('addressCity')}
                  containerClassNames="mb-4"
                />
                <Input
                  variant="text"
                  label="Улица"
                  placeholder="Введите улицу"
                  value={values.addressStreet}
                  onChangeText={handleChange('addressStreet')}
                  containerClassNames="mb-4"
                />
                <Input
                  variant="text"
                  label="Дом"
                  placeholder="Введите номер дома"
                  value={values.addressHouse}
                  onChangeText={handleChange('addressHouse')}
                  containerClassNames="mb-4"
                />
                <Input
                  variant="text"
                  label="Квартира"
                  placeholder="Введите номер квартиры"
                  value={values.addressNumber}
                  onChangeText={handleChange('addressNumber')}
                  containerClassNames="mb-4"
                />
                <Text className="text-[18px] font-bold text-center mb-4 mt-9">Координаты</Text>
                <Input
                  variant="number"
                  label="Широта"
                  placeholder="Введите широту"
                  value={values.latitude !== 0 ? values.latitude.toString() : ''}
                  onChangeText={handleChange('latitude')}
                  error={errors.latitude}
                  extendedError={extendedErrors.latitude}
                  containerClassNames="mb-4"
                />
                <Input
                  variant="number"
                  label="Долгота"
                  placeholder="Введите долготу"
                  value={values.longitude !== 0 ? values.longitude.toString() : ''}
                  onChangeText={handleChange('longitude')}
                  error={errors.longitude}
                  extendedError={extendedErrors.longitude}
                  containerClassNames="mb-4"
                />
                {extendedErrors.allFieldsRequired && (
                  <Text className="text-[#FF1644] text-center">
                    {extendedErrors.allFieldsRequired}
                  </Text>
                )}
              </>
            )}
            {values.dataType === EstateType.APARTMENT && (
              <>
                <Text className="text-[18px] font-bold text-center mb-4 mt-9">Квартира</Text>
                <Input
                  variant="number"
                  label="Этаж"
                  placeholder="Введите этаж"
                  value={values.floor !== 0 ? values.floor.toString() : ''}
                  onChangeText={handleChange('floor')}
                  containerClassNames="mb-4"
                />
                <Input
                  variant="number"
                  label="Количество комнат"
                  placeholder="Введите количество комнат"
                  value={values.totalRooms !== 0 ? values.totalRooms.toString() : ''}
                  onChangeText={handleChange('totalRooms')}
                  containerClassNames="mb-4"
                />
                <Input
                  variant="number"
                  label="Площадь"
                  placeholder="Введите площадь"
                  value={values.totalArea !== 0 ? values.totalArea.toString() : ''}
                  onChangeText={handleChange('totalArea')}
                  containerClassNames="mb-4"
                />
              </>
            )}
            {values.dataType === EstateType.HOUSE && (
              <>
                <Text className="text-[18px] font-bold text-center mb-4 mt-9">Дом</Text>
                <Input
                  variant="number"
                  label="Этажность дома"
                  placeholder="Введите кол-во этажей"
                  value={values.totalFloors !== 0 ? values.totalFloors.toString() : ''}
                  onChangeText={handleChange('totalFloors')}
                  containerClassNames="mb-4"
                />
                <Input
                  variant="number"
                  label="Количество комнат"
                  placeholder="Введите количество комнат"
                  value={values.totalRooms !== 0 ? values.totalRooms.toString() : ''}
                  onChangeText={handleChange('totalRooms')}
                  containerClassNames="mb-4"
                />
                <Input
                  variant="number"
                  label="Площадь"
                  placeholder="Введите площадь"
                  value={values.totalArea !== 0 ? values.totalArea.toString() : ''}
                  onChangeText={handleChange('totalArea')}
                  containerClassNames="mb-4"
                />
              </>
            )}
            {values.dataType === EstateType.LAND && (
              <>
                <Text className="text-[18px] font-bold text-center mb-4 mt-9">Земля</Text>
                <Input
                  variant="text"
                  label="Площадь"
                  placeholder="Введите площадь"
                  value={values.totalArea !== 0 ? values.totalArea.toString() : ''}
                  onChangeText={handleChange('totalArea')}
                  containerClassNames="mb-4"
                />
              </>
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
