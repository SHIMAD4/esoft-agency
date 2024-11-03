import { FC, useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Button } from '../Button';
import { API } from '@/shared/api';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { handleSaveClients } from '@/shared/slices/clientSlice';
import { handleSaveRealtors } from '@/shared/slices/realtorSlice';
import { handleSaveEstates } from '@/shared/slices/estatesSlice';
import { EntityType } from '@/scripts/constants';
import { handleSaveOffers, handleSaveOffersWithoutDeals } from '@/shared/slices/offerSlice';
import { handleSaveDemands, handleSaveDemandsWithoutDeals } from '@/shared/slices/demandSlice';
import clsx from 'clsx';
import { handleSaveDeals } from '@/shared/slices/dealsSlice';

type BottomSheetProps = {
  title: string;
  description: string;
  titleToOpen?: string;
  titleToClose: string;
  titleToDelete: string;
  userFullName: string;
  entityToDeleteLabel: string;
  entityToDeleteID: string;
  handleClickToOpen: boolean;
  setIsSheetOpen: (state: boolean) => void;
};

type RBSheetRef = {
  open: () => void;
  close: () => void;
};

export const BottomSheet: FC<BottomSheetProps> = ({
  titleToOpen,
  titleToClose,
  titleToDelete,
  title,
  description,
  userFullName,
  handleClickToOpen,
  setIsSheetOpen,
  entityToDeleteLabel,
  entityToDeleteID,
}) => {
  const refRBSheet = useRef<RBSheetRef>(null);
  const dispatch = useAppDispatch();
  const [error, setError] = useState(false);
  const [titleToCloseFormatted, setTitleToCloseFormatted] = useState(titleToClose);
  const [descriptionFormatted, setDescriptionFormatted] = useState(description);
  const textToShow = `${title}\n ${userFullName}\n ${descriptionFormatted}`;

  useEffect(() => {
    if (handleClickToOpen) {
      refRBSheet.current?.open();
    }
  }, [handleClickToOpen]);

  const handleToClose = () => {
    setTimeout(() => {
      setError(false);
      setTitleToCloseFormatted(titleToClose);
      setDescriptionFormatted(description);
    }, 150);

    refRBSheet.current?.close();
    setIsSheetOpen(false);
  };

  const handleDeleteUser = async (id: string) => {
    let errorFlag = false;

    await API.appBlock
      .deleteUserById(id)
      .then((data) => console.log(data))
      .catch((error) => {
        if (error.status === 409) {
          errorFlag = true;
          setError(true);
          setTitleToCloseFormatted('Закрыть');
          setDescriptionFormatted('невозможно. Связан с потребностью или предложением.');
        }
      });

    if (!errorFlag) {
      setTimeout(() => {
        refRBSheet.current?.close();

        API.clientBlock
          .getAllUsers()
          .then(({ data }) => dispatch(handleSaveClients({ clients: data })));

        API.realtorBlock
          .getAllUsers()
          .then(({ data }) => dispatch(handleSaveRealtors({ realtors: data })))
          .catch((error) => console.log(error));
      }, 150);
    }
  };

  const handleDeleteEstate = async (id: string) => {
    let errorFlag = false;

    await API.estateBlock
      .deleteEstateById(id)
      .then((data) => console.log(data))
      .catch((error) => {
        if (error.status === 409) {
          errorFlag = true;
          setError(true);
          setTitleToCloseFormatted('Закрыть');
          setDescriptionFormatted('невозможно. Связан с потребностью или предложением.');
        }
      });

    if (!errorFlag) {
      setTimeout(() => {
        refRBSheet.current?.close();

        API.estateBlock
          .getAllEstates()
          .then(({ data }) => dispatch(handleSaveEstates({ estates: data })));
      }, 150);
    }
  };

  const handleDeleteDeal = (id: string) => {
    API.dealBlock.deleteDealById(id).then((data) => console.log(data));

    setTimeout(() => {
      refRBSheet.current?.close();

      API.dealBlock
        .getAllDeals()
        .then(({ data }) => dispatch(handleSaveDeals({ deals: data })))
        .catch((error) => console.log(error));

      API.offerBlock
        .getAllOffersWithoutDeals()
        .then(({ data }) => dispatch(handleSaveOffersWithoutDeals({ offersWithoutDeals: data })));

      API.demandBlock
        .getAllDemandsWithoutDeals()
        .then(({ data }) => dispatch(handleSaveDemandsWithoutDeals({ demandsWithoutDeals: data })));
    }, 150);
  };

  const handleDeleteOffer = async (id: string) => {
    let errorFlag = false;

    await API.offerBlock
      .deleteOfferById(id)
      .then((data) => console.log(data))
      .catch((error) => {
        if (error.status === 409) {
          errorFlag = true;
          setError(true);
          setTitleToCloseFormatted('Закрыть');
          setDescriptionFormatted('невозможно. Оно участвует в сделке.');
        }
      });

    if (!errorFlag) {
      setTimeout(() => {
        refRBSheet.current?.close();

        API.offerBlock
          .getAllOffers()
          .then((data) => dispatch(handleSaveOffers({ offers: data })))
          .catch((error) => console.log(error));
      }, 150);
    }
  };

  const handleDeleteDemand = async (id: string) => {
    let errorFlag = false;

    await API.demandBlock
      .deleteDemandById(id)
      .then((data) => console.log(data))
      .catch((error) => {
        if (error.status === 409) {
          errorFlag = true;
          setError(true);
          setTitleToCloseFormatted('Закрыть');
          setDescriptionFormatted('невозможно. Оно участвует в сделке.');
        }
      });

    if (!errorFlag) {
      setTimeout(() => {
        refRBSheet.current?.close();

        API.demandBlock
          .getAllDemands()
          .then((data) => dispatch(handleSaveDemands({ demands: data })));
      }, 150);
    }
  };

  const handleDelete = (id: string) => {
    if (entityToDeleteLabel === EntityType.CLIENT || entityToDeleteLabel === EntityType.REALTOR) {
      handleDeleteUser(id);
    }

    if (entityToDeleteLabel === EntityType.ESTATE) handleDeleteEstate(id);
    if (entityToDeleteLabel === EntityType.OFFER) handleDeleteOffer(id);
    if (entityToDeleteLabel === EntityType.DEMAND) handleDeleteDemand(id);
    if (entityToDeleteLabel === EntityType.DEAL) handleDeleteDeal(id);
  };

  return (
    <View className="flex-1">
      {titleToOpen && (
        <Button
          variant="default"
          onPress={() => refRBSheet.current?.open()}
          text={titleToOpen}
          textClassNames="text-[16px] text-[#01A0FF]"
        />
      )}
      <RBSheet
        onClose={() => setIsSheetOpen(false)}
        customStyles={{
          wrapper: {
            padding: 24,
          },
          container: {
            backgroundColor: 'transparent',
          },
        }}
        ref={refRBSheet}
      >
        <View
          className={clsx(
            'w-full bg-white flex justify-center items-center p-[24px] rounded-[3px] mb-3',
            error ? 'mb-2' : '',
          )}
        >
          <View
            className={clsx(
              'flex justify-center items-center mb-[45px]',
              error ? 'h-[150px] mb-0' : '',
            )}
          >
            <Text className="text-[14px] text-center">{textToShow}</Text>
          </View>
          {!error ? (
            <Button
              variant="default"
              onPress={() => handleDelete(entityToDeleteID)}
              text={titleToDelete}
              buttonClassNames="flex justify-center items-center w-full bg-[#FF1644] rounded-[3px]"
              textClassNames="text-[16px] text-[#FFFFFF] py-[8.5px]"
            />
          ) : null}
        </View>
        <Button
          variant="default"
          onPress={handleToClose}
          text={titleToCloseFormatted}
          buttonClassNames="flex justify-center items-center w-full bg-[#03BFA5] rounded-[3px]"
          textClassNames="text-[16px] text-[#FFFFFF] py-[8.5px]"
        />
      </RBSheet>
    </View>
  );
};
