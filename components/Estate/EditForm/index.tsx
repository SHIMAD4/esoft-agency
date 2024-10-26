import { Formik } from 'formik';
import { Text, View } from 'react-native';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { Estate, ExtendedErrorType } from '@/shared/types';
import { useEffect, useState } from 'react';
import { AddEstateOnSubmitSchema, setDisabledState } from '@/scripts/helpers';
import clsx from 'clsx';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { router, useGlobalSearchParams } from 'expo-router';
import { API } from '@/shared/api';
import { handleSaveEstates } from '@/shared/slices/estatesSlice';

export const EditEstateForm = () => {
  const dispatch = useAppDispatch();
  const { id } = useGlobalSearchParams();
  const [estate, setEstate] = useState<Estate>({
    type: '',
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
  });

  useEffect(() => {
    API.appBlock.getEstateById(id as string).then(({ data }) => setEstate(data));
  }, [id]);

  return (
    <Formik
      initialValues={{
        type: estate.type || '',
        addressCity: estate.addressCity || '',
        addressStreet: estate.addressStreet || '',
        addressHouse: estate.addressHouse || '',
        addressNumber: estate.addressNumber || '',
        dataType: estate.data.type || '',
        latitude: estate.latitude,
        longitude: estate.longitude,
        floor: estate.data.floor,
        totalFloors: estate.data.totalFloors,
        totalRooms: estate.data.totalRooms,
        totalArea: estate.data.totalArea,
      }}
      enableReinitialize={true}
      validationSchema={AddEstateOnSubmitSchema}
      onSubmit={(data, errors) => {
        if (!!errors) {
          API.estateBlock.editEstate(id as string, data).then((data) => console.log(data));

          setTimeout(() => {
            router.navigate('/estate/');

            API.estateBlock
              .getAllEstates()
              .then(({ data }) => dispatch(handleSaveEstates({ estates: data })));
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
              onChangeText={handleChange('type')}
              data={[
                { id: 1, label: 'Квартира', value: 'APARTMENT' },
                { id: 2, label: 'Дом', value: 'HOUSE' },
                { id: 3, label: 'Земля', value: 'LAND' },
              ]}
            />
            {values.dataType && (
              <>
                <Text className="text-[18px] font-bold text-center mb-4 mt-9">Адрес</Text>
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
                  variant="number"
                  label="Дом"
                  placeholder="Введите номер дома"
                  value={values.addressHouse}
                  onChangeText={handleChange('addressHouse')}
                  containerClassNames="mb-4"
                />
                <Input
                  variant="number"
                  label="Квартира"
                  placeholder="Введите номер квартиры"
                  value={values.addressNumber}
                  onChangeText={handleChange('addressNumber')}
                  containerClassNames="mb-4"
                />
              </>
            )}
            {values.dataType && (
              <>
                <Text className="text-[18px] font-bold text-center mb-4 mt-9">Координаты</Text>
                <Input
                  variant="number"
                  label="Широта"
                  placeholder="Введите широту"
                  value={values.latitude.toString()}
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
                  value={values.longitude.toString()}
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
            {values.dataType === 'APARTMENT' && (
              <>
                <Text className="text-[18px] font-bold text-center mb-4 mt-9">Квартира</Text>
                <Input
                  variant="number"
                  label="Этаж"
                  placeholder="Введите этаж"
                  value={values.floor.toString()}
                  onChangeText={handleChange('floor')}
                  containerClassNames="mb-4"
                />
                <Input
                  variant="number"
                  label="Количество комнат"
                  placeholder="Введите количество комнат"
                  value={values.totalRooms.toString()}
                  onChangeText={handleChange('totalRooms')}
                  containerClassNames="mb-4"
                />
                <Input
                  variant="number"
                  label="Площадь"
                  placeholder="Введите площадь"
                  value={values.totalArea.toString()}
                  onChangeText={handleChange('totalArea')}
                  containerClassNames="mb-4"
                />
              </>
            )}
            {values.dataType === 'HOUSE' && (
              <>
                <Text className="text-[18px] font-bold text-center mb-4 mt-9">Дом</Text>
                <Input
                  variant="number"
                  label="Этажность дома"
                  placeholder="Введите кол-во этажей"
                  value={values.totalFloors.toString()}
                  onChangeText={handleChange('totalFloors')}
                  containerClassNames="mb-4"
                />
                <Input
                  variant="number"
                  label="Количество комнат"
                  placeholder="Введите количество комнат"
                  value={values.totalRooms.toString()}
                  onChangeText={handleChange('totalRooms')}
                  containerClassNames="mb-4"
                />
                <Input
                  variant="number"
                  label="Площадь"
                  placeholder="Введите площадь"
                  value={values.totalArea.toString()}
                  onChangeText={handleChange('totalArea')}
                  containerClassNames="mb-4"
                />
              </>
            )}
            {values.dataType === 'LAND' && (
              <>
                <Text className="text-[18px] font-bold text-center mb-4 mt-9">Земля</Text>
                <Input
                  variant="text"
                  label="Площадь"
                  placeholder="Введите площадь"
                  value={values.totalArea.toString()}
                  onChangeText={handleChange('totalArea')}
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
