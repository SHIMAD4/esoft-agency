import { Formik } from 'formik';
import { View } from 'react-native';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { setDisabledState } from '@/scripts/helpers';
import { Demand, ExtendedErrorType, Offer } from '@/shared/types';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { API } from '@/shared/api';
import { router } from 'expo-router';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { AddDealOnSubmitSchema } from '@/scripts/submitingSchemes';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { handleSaveDeals } from '@/shared/slices/dealsSlice';
import { handleSaveOffersWithoutDeals } from '@/shared/slices/offerSlice';
import { handleSaveDemandsWithoutDeals } from '@/shared/slices/demandSlice';

export const AddDealForm = () => {
  const dispatch = useAppDispatch();
  const { offersWithoutDeals } = useAppSelector((state) => state.offerSlice);
  const { demandsWithoutDeals } = useAppSelector((state) => state.demandSlice);

  const offersToSelect = offersWithoutDeals.map((offer: Offer) => {
    return {
      id: offer.id,
      label: `${offer.estate.addressStreet}`,
      value: offer.id,
    };
  });
  const demandsToSelect = demandsWithoutDeals.map((realtor: Demand) => {
    return {
      id: realtor.id,
      label: `${realtor.name}`,
      value: realtor.id,
    };
  });

  return (
    <Formik
      initialValues={{ demandId: '', offerId: '' }}
      validationSchema={AddDealOnSubmitSchema}
      onSubmit={(data, errors) => {
        if (!!errors) {
          API.dealBlock.addDeal(data).then((data) => console.log(data));

          setTimeout(() => {
            router.navigate('/deal/');

            API.dealBlock
              .getAllDeals()
              .then(({ data }) => dispatch(handleSaveDeals({ deals: data })));

            API.offerBlock
              .getAllOffersWithoutDeals()
              .then(({ data }) =>
                dispatch(handleSaveOffersWithoutDeals({ offersWithoutDeals: data })),
              );

            API.demandBlock
              .getAllDemandsWithoutDeals()
              .then(({ data }) =>
                dispatch(handleSaveDemandsWithoutDeals({ demandsWithoutDeals: data })),
              );
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
              demandId: values.demandId,
              offerId: values.offerId,
            },
            errors: {
              demandId: errors.demandId,
              offerId: errors.offerId,
            },
            allFieldsRequired: true,
          });
        }, [
          values.demandId,
          values.offerId,
          errors.demandId,
          errors.offerId,
          extendedErrors.allFieldsRequired,
        ]);

        return (
          <View className="mx-6 gap-y-8">
            <Input
              variant="select"
              label="Потребность"
              placeholder="Выберите потребность"
              value={values.offerId}
              error={errors.offerId}
              onChangeText={handleChange('offerId')}
              data={offersToSelect}
            />
            <Input
              variant="select"
              label="Предложение"
              placeholder="Выберите предложение"
              value={values.demandId}
              error={errors.demandId}
              onChangeText={handleChange('demandId')}
              data={demandsToSelect}
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
