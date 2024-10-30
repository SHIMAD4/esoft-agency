import { Formik } from 'formik';
import { Text, View } from 'react-native';
import { Button } from '../../../Button';
import { Input } from '../../../Input';
import { setDisabledState } from '@/scripts/helpers';
import { Realtor, Client, ExtendedErrorType } from '@/shared/types';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { API } from '@/shared/api';
import { router } from 'expo-router';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { AddDemandOnSubmitSchema } from '@/scripts/submitingSchemes';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { handleSaveDemands } from '@/shared/slices/demandSlice';
import { EstateType } from '@/scripts/constants';

export const AddDemandForm = () => {
  const dispatch = useAppDispatch();
  const { clients } = useAppSelector((state) => state.clientSlice);
  const { realtors } = useAppSelector((state) => state.realtorSlice);

  const clientsToSelect = clients.map((client: Client) => {
    return {
      id: client.id,
      label: `${client.firstName} ${client.middleName}`,
      value: client.id,
    };
  });

  const realtorToSelect = realtors.map((realtor: Realtor) => {
    return {
      id: realtor.id,
      label: `${realtor.firstName} ${realtor.middleName}`,
      value: realtor.id,
    };
  });

  return (
    <Formik
      initialValues={{
        client: '',
        realtor: '',
        estateType: '',
        minPrice: '',
        maxPrice: '',
        minFloor: '',
        maxFloor: '',
        minFloors: '',
        maxFloors: '',
        minRooms: '',
        maxRooms: '',
        minArea: '',
        maxArea: '',
      }}
      validationSchema={AddDemandOnSubmitSchema}
      onSubmit={(data, errors) => {
        if (!!errors) {
          API.demandBlock.addDemand(data).then((data) => console.log(data));

          setTimeout(() => {
            router.navigate('/deal/');

            API.demandBlock
              .getAllDemands()
              .then((data) => dispatch(handleSaveDemands({ demands: data })));
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
              client: values.client,
              realtor: values.realtor,
            },
            errors: {
              client: errors.client,
              realtor: errors.realtor,
            },
            allFieldsRequired: true,
          });
        }, [
          values.client,
          values.realtor,
          errors.client,
          errors.realtor,
          extendedErrors.allFieldsRequired,
        ]);

        return (
          <View className="mx-6 gap-y-8 mb-8">
            <Input
              variant="select"
              label="Тип объекта"
              placeholder="Выберите объект"
              value={values.estateType}
              error={errors.estateType}
              onChangeText={handleChange('estateType')}
              data={[
                { id: 1, label: 'Квартира', value: EstateType.APARTMENT },
                { id: 2, label: 'Дом', value: EstateType.HOUSE },
                { id: 3, label: 'Земля', value: EstateType.LAND },
              ]}
            />
            <Text className="text-[18px] font-bold text-center mt-9">Основные данные</Text>
            <Input
              variant="select"
              label="Клиент"
              placeholder="Выберите клиента"
              value={values.client}
              error={errors.client}
              onChangeText={handleChange('client')}
              data={clientsToSelect}
            />
            <Input
              variant="select"
              label="Риэлтор"
              placeholder="Выберите риэлтора"
              value={values.realtor}
              error={errors.realtor}
              onChangeText={handleChange('realtor')}
              data={realtorToSelect}
            />
            <Input
              variant="number"
              label="Минимальная цена"
              labelClassNames="mb-[-25px] mt-[32px]"
              placeholder="Введите минимальную цену"
              value={values.minPrice}
              onChangeText={handleChange('minPrice')}
              error={errors.minPrice}
            />
            <Input
              variant="number"
              label="Максимальная цена"
              labelClassNames="mb-[-25px] mt-[32px]"
              placeholder="Введите максимальную цену"
              value={values.maxPrice}
              onChangeText={handleChange('maxPrice')}
              error={errors.maxPrice}
            />
            {values.estateType === EstateType.APARTMENT && (
              <>
                <Text className="text-[18px] font-bold text-center mt-9">Квартира</Text>
                <Input
                  variant="number"
                  label="Минимальный этаж"
                  labelClassNames="mt-[32px]"
                  placeholder="Введите минимальный этаж"
                  value={values.minFloor}
                  onChangeText={handleChange('minFloor')}
                  error={errors.minFloor}
                />
                <Input
                  variant="number"
                  label="Максимальный этаж"
                  labelClassNames="mt-[32px]"
                  placeholder="Введите максимальный этаж"
                  value={values.maxFloor}
                  onChangeText={handleChange('maxFloor')}
                  error={errors.maxFloor}
                />
                <Input
                  variant="number"
                  label="Мин. количество комнат"
                  labelClassNames="mt-[32px]"
                  placeholder="Введите мин. количество комнат"
                  value={values.minRooms}
                  onChangeText={handleChange('minRooms')}
                  error={errors.minRooms}
                />
                <Input
                  variant="number"
                  label="Максим. количество комнат"
                  labelClassNames="mt-[32px]"
                  placeholder="Введите максим. количество комнат"
                  value={values.maxRooms}
                  onChangeText={handleChange('maxRooms')}
                  error={errors.maxRooms}
                />
                <Input
                  variant="number"
                  label="Минимальная площадь"
                  labelClassNames="mt-[32px]"
                  placeholder="Введите минимальная площадь"
                  value={values.minArea}
                  onChangeText={handleChange('minArea')}
                  error={errors.minArea}
                />
                <Input
                  variant="number"
                  label="Максимальная площадь"
                  labelClassNames="mt-[32px]"
                  placeholder="Введите максимальная площадь"
                  value={values.maxArea}
                  onChangeText={handleChange('maxArea')}
                  error={errors.maxArea}
                />
              </>
            )}
            {values.estateType === EstateType.HOUSE && (
              <>
                <Text className="text-[18px] font-bold text-center mt-9">Дом</Text>
                <Input
                  variant="number"
                  label="Минимальная этажность дома"
                  labelClassNames="mt-[32px]"
                  placeholder="Введите мин кол-во этажей"
                  value={values.minFloors}
                  onChangeText={handleChange('minFloors')}
                  error={errors.minFloors}
                />
                <Input
                  variant="number"
                  label="Максимальная этажность дома"
                  labelClassNames="mt-[32px]"
                  placeholder="Введите максим кол-во этаж"
                  value={values.maxFloors}
                  onChangeText={handleChange('maxFloors')}
                  error={errors.maxFloors}
                />
                <Input
                  variant="number"
                  label="Мин. количество комнат"
                  labelClassNames="mt-[32px]"
                  placeholder="Введите мин. количество комнат"
                  value={values.minRooms}
                  onChangeText={handleChange('minRooms')}
                  error={errors.minRooms}
                />
                <Input
                  variant="number"
                  label="Максим. количество комнат"
                  labelClassNames="mt-[32px]"
                  placeholder="Введите максим. количество комнат"
                  value={values.maxRooms}
                  onChangeText={handleChange('maxRooms')}
                  error={errors.maxRooms}
                />
                <Input
                  variant="number"
                  label="Минимальная площадь"
                  labelClassNames="mt-[32px]"
                  placeholder="Введите минимальная площадь"
                  value={values.minArea}
                  onChangeText={handleChange('minArea')}
                  error={errors.minArea}
                />
                <Input
                  variant="number"
                  label="Максимальная площадь"
                  labelClassNames="mt-[32px]"
                  placeholder="Введите максимальная площадь"
                  value={values.maxArea}
                  onChangeText={handleChange('maxArea')}
                  error={errors.maxArea}
                />
              </>
            )}
            {values.estateType === EstateType.LAND && (
              <>
                <Text className="text-[18px] font-bold text-center mt-9">Земля</Text>
                <Input
                  variant="number"
                  label="Минимальная площадь"
                  labelClassNames="mt-[32px]"
                  placeholder="Введите минимальная площадь"
                  value={values.minArea}
                  onChangeText={handleChange('minArea')}
                  error={errors.minArea}
                />
                <Input
                  variant="number"
                  label="Максимальная площадь"
                  labelClassNames="mt-[32px]"
                  placeholder="Введите максимальная площадь"
                  value={values.maxArea}
                  onChangeText={handleChange('maxArea')}
                  error={errors.maxArea}
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
