import { Formik } from 'formik';
import { View } from 'react-native';
import { Button } from '../../../Button';
import { Input } from '../../../Input';
import { Client, Estate, ExtendedErrorType, Offer, Realtor } from '@/shared/types';
import { useEffect, useState } from 'react';
import { setDisabledState } from '@/scripts/helpers';
import { router, useGlobalSearchParams } from 'expo-router';
import clsx from 'clsx';
import { API } from '@/shared/api';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { AddOfferOnSubmitSchema } from '@/scripts/submitingSchemes';
import { handleSaveOffers } from '@/shared/slices/offerSlice';
import { useAppSelector } from '@/shared/hooks/useAppSelector';

export const EditOfferForm = () => {
  const dispatch = useAppDispatch();
  const { id } = useGlobalSearchParams();
  const { clients } = useAppSelector((state) => state.clientSlice);
  const { realtors } = useAppSelector((state) => state.realtorSlice);
  const { estates } = useAppSelector((state) => state.estateSlice);

  const [offer, setOffer] = useState<Offer>({
    id: '',
    client: {
      type: '',
      firstName: '',
      lastName: '',
      middleName: '',
      email: '',
      phone: '',
      id: '',
    },
    realtor: {
      type: '',
      firstName: '',
      lastName: '',
      middleName: '',
      fullName: '',
      dealShare: '',
      id: '',
    },
    estate: {
      type: '',
      id: '',
      districts: [
        {
          id: 0,
          name: '',
        },
      ],
      latitude: 0,
      longitude: 0,
      addressCity: '',
      addressHouse: '',
      addressNumber: '',
      addressStreet: '',
      data: {
        floor: 0,
        totalFloors: 0,
        totalArea: 0,
        totalRooms: 0,
        type: '',
      },
    },
    price: 0,
  });

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

  const estateToSelect = estates.map((estate: Estate) => {
    return {
      id: estate.id,
      label: estate.addressStreet,
      value: estate.id,
    };
  });

  useEffect(() => {
    API.appBlock.getOfferById(id as string).then(({ data }) => setOffer(data));
  }, [id]);

  return (
    <Formik
      initialValues={{
        client: offer.client.id || '',
        realtor: offer.realtor.id || '',
        realState: offer.estate.id || '',
        price: `${offer.price}` || '',
      }}
      enableReinitialize={true}
      onSubmit={(data, errors) => {
        if (!!errors) {
          API.offerBlock.editOffer(id as string, data).then((data) => console.log(data));

          setTimeout(() => {
            router.navigate('/deal/');

            API.offerBlock
              .getAllOffers()
              .then((data) => dispatch(handleSaveOffers({ offers: data })));
          }, 150);
        }
      }}
      validationSchema={AddOfferOnSubmitSchema}
    >
      {({ handleChange, handleSubmit, values, errors }) => {
        const extendedErrors: ExtendedErrorType = errors;
        const [disabled, setDisabled] = useState(true);

        useEffect(() => {
          setDisabledState(setDisabled, {
            fields: {
              client: values.client,
              realtor: values.realtor,
              realState: values.realState,
              price: values.price,
            },
            errors: {
              client: errors.client,
              realtor: errors.realtor,
              realState: errors.realState,
              price: errors.price,
            },
            allFieldsRequired: true,
          });
        }, [
          values.client,
          values.realtor,
          values.realState,
          values.price,
          errors.client,
          errors.realtor,
          errors.realState,
          errors.price,
          extendedErrors.allFieldsRequired,
        ]);

        return (
          <View className="mx-6 gap-y-8">
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
              variant="select"
              label="Объект недвижимости"
              placeholder="Выберите объект недвижимости"
              value={values.realState}
              error={errors.realState}
              onChangeText={handleChange('realState')}
              data={estateToSelect}
            />
            <Input
              variant="number"
              label="Цена"
              labelClassNames="mb-[-25px] mt-[32px]"
              placeholder="Введите цену"
              value={values.price}
              onChangeText={handleChange('price')}
              error={errors.price}
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
